---
date: 2014-06-18 19:51:11 -0500
layout: post
title: The Problem with Long Running PHP scripts
tags:
  - PHP
  - Daemon
  - Long Running Scripts
  - Bugs
---

Writing a daemon in PHP can be a very attractive prospect.  You already have
your website written, so you have all of this great code already.  You just need
it to run and keep track of some data or handle some data as it comes in by
polling a database.  All you do is.. make some infinite loop and..

```php
<?php

$databse = MyGreatLibrary::getInstance();

while (true) {
	$data = $database->fetchNewData();

	if (!empty($data)) {
		try {
			MyGreatProcessor::proces($data);

			$data->ack();
		} catch (Exception $e) {
			$data->fail();

			error_log("Error with processor: " . $e->getTraceAsString());
		}
	}

	sleep(15); // Wait for new data
}

```

Oh yes.  Beautiful, we're in business!  What could possibly go wrong?

Well, there are quite a few things, and even with those lucrative reasons to
do it there are a couple not to.  The biggest being PHP's primary intent.  It's
a language primarily designed to handle one request and then die, resetting
itself to a pristine condition, like some sort of ElePHPhoenix.

When you take that glorious death of the process away from it, the interpreter
hits code paths that haven't been as well tested as others, and a few issues
can crop up from it.


## Memory Leaks and Garbage Collection Problems

The largest problem with long running scripts has much to do with PHP's
[garbage collection][php-doc-gc].  In recent versions it's become a more advanced
system (version 5.3 and later) but it still can have quirks which may not be at
first the most obvious, especially to those who are used to managing memory on
their own.

This is something exacerbated because PHP itself never frees up memory back to
the operating system to dole out to other processes.  It will only allow it to
be reallocated by other PHP data.  This means that once it does allocate memory
to a PHP process, it continues to hold onto it until the process is ended.

In many cases unset can be invoked and the garbage collection routines will
eventually get to them.  This is done by the internal implementation of
data structures in PHP keeping a [reference counter][php-doc-refcount],
incremented at every occurrence of use of the reference, and decremented when
unset.  There are a few cases in which unset does not fully decrement the
reference counter.  One of which is if there is, surprise, a reference to the
data in some other area.  This could be if another object or variable points
to it, which at first thought may be straightforward may not always be easy to
detect.

```php
<?php

function parse_data($data, &$output) {
	$output['parsed'] = substr('foo', 'bar', $data->data);
	$output['original'] = $data;
}

$variable = new stdClass();
$variable->data = file_get_contents('large_file.txt');

$data = array();

parse_data($variable, $arr);

unset($variable);
// The references still exist to the zval that $variable pointed at

```

The other, more devious instance of data remaining in memory is cyclical
references, in that one object refers to another object which refers back to
the original object.  Even when you unset both of the references to the
objects, they still have a reference in that they refer to each other.

```php
<?php

$super = new SuperGreat();

$super->selfReference = $super;

unset($super);
// $super's data continues to stay in memory unless
// the garbage collector is enabled

```

This can be resolved by enabling the more advanced garbage collection available
in PHP 5.3 and later.  This can be done either with the function `gc_enable()`
or the php.ini setting `zend.gc_enable=1`.

Even then, you're still at the whim of the garbage collector, which will only
collect the unused references when the root buffer fills up.  Thus, calling
`gc_collect_cycles()` may be required in situations where memory is at a
premium.

These issues with memory leaks do not always pertain to just your code,
either.  Many third party PHP libraries can be at fault as well.  If they don't
follow the same strict rules regarding reference counting and hinting to the
garbage collector that data is available to be collected memory leaks can occur.
This does not get into extensions, which are often never meant to be running for
long periods of time and do have the ability to mismanage memory.  A good
example of this is PHP's SPL library.

```php
<?php

class Collection extends ArrayObject {
	protected $iterator;

	public function getIterator() {
		// Well, this is a heavy object to make, let's memoize it
		if (!isset($this->iterator)) {
			$this->iterator = new ArrayIterator($this);
		}

		return $this->iterator;
	}
}

$collection = new Collection([ 'foo', 'bar' ]);

foreach ($collection as $item) {
	echo $item;
}

unset($collection);
gc_collect_cycles();
// Memory from collection is never freed
```

There was a [bug opened][bug53803], but no resolution aside from manually
destroying the cycles has come of it.  The reason that it happens is because,
as described in the bug, the garbage collector relies on
[get_properties'][php-doc-get_properties] `HashTable` to know which references
are held by a given object.

In a traditional request PHP cleans up all variables during shut down of the
engine in preparation for the next request.  As a long running script
intends to never shut down and allow that process to happen memory leaks
escalate from being a minor blip to taking down entire servers.


## Resource Descriptor limit

When opening a file, a connection to a database using some APIs, or working with
various extensions, you get back a resource instead of an object.  These
resources allow PHP to correctly communicate with the open stream you've
instantiated.

Resource Descriptors, however are not a renewable resource in PHP as of the 5.5
release.  The counter is limited to 2^32 - 1.  What should happen is that
the open stream [should][posix-open] choose the lowest file descriptor not
currently open.  PHP, however, does not.  Once a resource is opened it can't
be reused.  Closing it does not send it back to the available pool of
descriptors.  The [related bug][bug47396] has been open for nearly 4 years now,
so while it is possible that it's being worked on, it is even more possible
that it will not be fixed for some time.

However, seeing as there are then roughly 8.6 billion available
descriptors this is unlikely to be much of an issue in most real world
situations.  Just one of the many little problems that exist with running a
PHP script for a long period of time.


## Other minor concerns

With long running scripts one of the more lucrative features of PHP doesn't
come into play, either - how it handles updates.  If PHP never shuts down
the code is never unloaded, and new code is never loaded back in.  This means
that a user would have to manually shut down the worker in some way, usually by
killing the process.  One way to work around this would be to keep track of
when the script was started and compare it against the modified time of the
file, then exiting when it is safe to do so.  Not a pretty way to handle
updates by far.

Many libraries rely on open connections to external services, and for a large
range of reasons that connection could be closed after a long enough time,
especially if the script is sitting in a "waiting" state for a while.
An example of such behavior could be the error message
`MySQL server has gone away`.  This requires boilerplate code to be in place,
verifying that the connection is fresh and available when processing data.


## What can I do about it?

In most cases the need for a long running script just isn't there.  For some
people, PHP isn't needed at all, and a language better suited for writing
daemons could be chosen.

There also are many techniques for handling the processing of data in the
background without using long running PHP scripts.  One such would be the use
of job queues and short lived PHP workers started by [Supervisord][supervisord],
such as [Beanstalkd][beanstalk], [Gearman][gearman], or [Celery][celery].  Many
job queues allow configuration to limit the number of jobs workers will handle
before restarting, thus negating the problems that can crop up.

It's possible to write long lived PHP daemons.  That doesn't mean it's the best
use of anyone's time, especially yours.




[posix-open]: http://pubs.opengroup.org/onlinepubs/9699919799/functions/open.html
[bug47396]: https://bugs.php.net/bug.php?id=47396
[bug53803]: https://bugs.php.net/bug.php?id=53803
[php-doc-gc]: http://www.php.net/manual/en/features.gc.php
[php-doc-get_properties]: https://wiki.php.net/internals/engine/objects#get_properties
[php-doc-refcount]: http://php.net/gc.refcounting-basics
[supervisord]: http://supervisord.org/
[celery]: http://www.celeryproject.org/
[beanstalk]: http://kr.github.io/beanstalkd/
[gearman]: http://gearman.org/
