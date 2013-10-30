---
layout: post
title: RFC&#58; Engine Exception; Erroneous Exceptional Errors
categories: PHP, test
tags:
  - PHP
---

One of the flaws with PHP happens to be the ways in which it handles engine errors.  However, this might change in PHP 5.6.

Most of the errors in PHP will emit a small amount of text, call the error handler, and allow the engine to continue on its merry way.
However, there are a few evil errors which are emitted, which do not call the error handler, and instead kill the entire application.
Specically, these are `E_ERROR`, `E_CORE_ERROR`, `E_COMPILE_ERROR`, `E_PARSE`, `E_USER_ERROR`, and `E_RECOVERABLE_ERROR`.  Of these,
only `E_RECOVERABLE_ERROR` calls the error handler, but it still will abort the running script if not handled correctly.

Some of these errors are from seemingly innocuous conditions, such as calling methods on null values, creating incorrect SimpleXML, or
trying to load an invalid WSDL in SoapClient.  (If you're using the SoapClient, though, you have other problems.)  Not only can one
of the error conditions just end a running script without allowing any cleanup, it also breaks several assumptions programmers can have.
For example, the `finally` construct and `__deconstruct` methods are always ran before PHP shuts down - unless of course a fatal error ends
it early.  There are some hacks to handle these behaviours slightly better using `register_shutdown_function`, but they are just that.

`EngineException` is the proposed solution to this problem, by Nikita Popov.  It is a move away from the errors of the past, towards catchable
Exceptions where possible.  The RFC includes `E_ERROR` and `E_RECOVERABLE_ERROR` in the purge, though the attached patch as of this writing
mostly only delves into a small portion of the errors, but it does include wording for developers to avoid using fatal errors, and instead
use exceptions where possible.  The following code would now work, where as of PHP 5.5, it does not.  

```php

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

```
This is a win for anyone who has written any long living PHP application, as well as for those who don't want to rely on error handlers to
make an attempt to hastily exit from what should not be a catastrophic engine shutdown.

While backwards compatibility woes threaten to halt this RFC faster than any `E_FATAL_ERROR`, it hopefully will push future development to not use fatal errors.
