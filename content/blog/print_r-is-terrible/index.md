---
date: 2014-07-28 11:22:11 -0500
layout: post
title: print_r is terrible
tags:
  - PHP
  - Disclaimer
  - Whining
---

The short version: use `var_dump`, don't use `print_r`.

`print_r` is to print human readable representations of a variable's contents.
It is practically useless as a debugging tool.  It isn't even useful for
humans to consume it because no human wants to read arrays or even think about
the concept of arrays.

On first glance it kind of works.

```
php > print_r('foo bar');
foo bar

php > print_r([1, 2, 3]);
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
)
```

Those sure are some fantastic string representations of things.

But you quickly find out that many things are printed as being the same value.

```
php > print_r([false, '', null]);
Array
(
    [0] => 
    [1] => 
    [2] => 
)

php > print_r([0, 0.0, '0'])
Array
(
    [0] => 0
    [1] => 0
    [2] => 0
)

php > print_r([true, 1, '1']);
Array
(
    [0] => 1
    [1] => 1
    [2] => 1
)
```

When strings are involved, you also can get output that may look the same but
isn't because of whitespace or other various non-visible characters.

```
php > print_r(['foo ', 'foo', "foo" . chr(0)]);
Array
(
    [0] => foo 
    [1] => foo
    [2] => foo
)
```

..Or you get things caused by people who just want to watch the world burn.

```
php > print_r([["Array\n\t\t(\n\t\t\t[0] => Wello\n\n\t\t)\n"]]);
Array
(
    [0] => Array
        (
            [0] => Array
                (
                        [0] => Wello

                )

        )

)

php > $a = print_r([0], true);
php > print_r($a);
Array
(
    [0] => 0
)
```

`print_r` does not display data in any structured manner and sacrifices
differentiating between types for the sake of readability.  While you are
debugging you don't want readability.  You want to know what the variable
contains.  `var_dump` gets you that.

```
php > var_dump(['foo ', 'foo', "foo" . chr(0)]);
array(3) {
  [0] =>
  string(4) "foo "
  [1] =>
  string(3) "foo"
  [2] =>
  string(4) "foo\000"
}

php > var_dump([0, 0.0, '0']);
array(3) {
  [0] =>
  int(0)
  [1] =>
  double(0)
  [2] =>
  string(1) "0"
}
```

Just use [`var_dump`][php_var_dump].  (Or be sane and set up [xdebug][xdebug].)

[php_var_dump]: http://php.net/var_dump
[xdebug]: http://xdebug.org/
