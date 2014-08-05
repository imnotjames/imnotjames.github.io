---
date: 2013-11-06 00:21:11 -0500
layout: post
title: RFC&#58; Engine Exception; Erroneous Exceptional Errors
tags:
  - PHP
  - RFC
---

One of the flaws with PHP is the ways in which it handles engine errors.  However, might change in PHP 5.6.

Most of the errors in PHP will emit a small amount of text, call the error handler, and allow the engine to continue.
However, there are a few errors which are emitted that do not call the error handler, and instead terminate the application.
Specifically, these are `E_ERROR`, `E_CORE_ERROR`, `E_COMPILE_ERROR`, `E_PARSE`, `E_USER_ERROR`, and `E_RECOVERABLE_ERROR`.  Of these,
only `E_RECOVERABLE_ERROR` calls the error handler, but it still will abort the running script if not handled correctly.

Some of these errors are from seemingly innocuous conditions, such as calling methods on null values, creating incorrect SimpleXML, or
trying to load an invalid WSDL in SoapClient.  (If you're using the SoapClient, though, you have other problems.)  Not only can one
of the error conditions end a running script without allowing any cleanup, it also breaks several assumptions programmers can have.
For example, the `finally` construct and `__deconstruct` methods are always ran before PHP shuts down - unless of course a fatal error ends
it early.  There are some hacks to handle these behaviors slightly better using `register_shutdown_function`, but they are just that.

{% highlight php startinline %}

set_error_handler(function($errno, $errstr, $errfile, $errline) {
	if (E_RECOVERABLE_ERROR === $errno) {
		return true;
	}

	return false;
});

class A {
	public $datetime;

	public function __construct(DateTime $datetime) {
		$this->datetime = $datetime;
	}
}

// A timestamp instead of a datetime object.
$a = new A(1383329451);

// int(1383329451) - we've bypassed the hinting
var_dump($a->datetime);

{% endhighlight %}

Catching a recoverable fatal error may be even worse than handling an `E_ERROR`.  The code continues on once it is caught as if nothing happened.
Situations like type hinting errors caught will allow input of the wrong type to be allowed through.  Even if you set an empty error handler that
does not return anything, `E_RECOVERABLE_ERROR` will be silently ignored and PHP will blunder onward.

`EngineException` is the proposed solution to this problem, by Nikita Popov.  It is a move away from the errors of the past, towards catch-able
Exceptions where possible.  The RFC includes `E_ERROR` and `E_RECOVERABLE_ERROR` in the purge, though the attached patch as of this writing
mostly only delves into a small portion of the errors, but it does include wording for developers to avoid using fatal errors, and instead
use exceptions where possible.  The following code would now work, where as of PHP 5.5, it does not.  


{% highlight php startinline %}

$object = null;

$h = fopen('lockfile', 'r+');

if (flock($h, LOCK_EX)) {
	try {
		$object->run();
	} finally {
		flock($h, LOCK_UN);
	}
}

fclose($h);

{% endhighlight %}

This is a win for anyone who has written any long living PHP application, as well as for those who don't want to rely on error handlers to
make an attempt to hastily exit from what should not be a catastrophic engine shutdown.

While backwards compatibility woes threaten to halt this RFC faster than any `E_FATAL_ERROR`, it hopefully will push future development to not use fatal errors.
