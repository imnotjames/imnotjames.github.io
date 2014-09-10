---
date: 2014-07-27 11:21:11 -0500
layout: post
title: Parsing HTML or How I learned to stop worrying and love the DOM
tags:
  - PHP
  - Tutorial
  - HTML
  - DOM
---

At some point we all have to work with HTML. Not every web service has every
bit of data on their site available through a proper API.  It could be
inconsistent, it could be missing, they could not have an API at all.  It
could even be (_GASP_) a [SOAP API][s_is_for_simple]. When the right way
to get the job done is not present we have to go the wrong way.

Whatever the reason, working with HTML in pragmatic ways is never much fun.
It's fraught with pitfalls and caveats, but there are tools out there to do it
safely and correctly.

```html
<!DOCTYPE html>
<html>
	<body>
		<div id="foo">
			This is our example HTML used
			<string>throughout the article.</strong>
		</div>

		<div class="test" id="bar">
			<div>
				And it exhibits some of the basic
				problems you will find with HTML
				parsing.
			</div>
		</div>

		<div class="baz test">
			<p>
				It's much more basic than real-
				world examples.
			</p>
		</div>
	</body>
</html>
```

## Why not Regular Expressions?

As [Zalgo][zalgo] demonstrates, you are thinking about tapping into the dark art
of Regular Expressions but you may not like what you find.  HTML is a very
[complex beast][context_grammar] and regular expressions are there to match
[regular beasts][regular_grammar].  You will never be truly parsing the HTML,
only matching against it in naive ways.  The reason for this is based in the
bowels of Regular Expression's data structure, the finite state machine.
Because regular expressions are finite in their number of states it is
impossible to parse HTML with a regular expression. You would need an infinitely
deep (thus, infinitely long) regular expression - what you end up with is
non-regular, thus not a regular expression.

Say that the task is to retrieve a div with the class test in it.  

{% highlight php startinline %}
$regex = '/<div class="test">(.+?)</div>/sm';

if (preg_match_all($regex, $html_string, $matches, PREG_SET_ORDER)) {
	foreach ($matches as $match) {
		echo $match[1];
	}
}
{% endhighlight %}

The most naive solutions will end up with very simple expressions that don't
even get remotely close to handling the permutations.  It won't match multiple
classes or other attributes.  It won't even handle nested divs, and choked up
in a multitude of other valid HTML situations.  Hacking away at the regular
expression, we fight with it more and more to create what just matches the
`div` elements we want to extract.  It can be done, it just takes some time,
right?

What you do end up with, however...

{% highlight php startinline %}
$regex = '/<div[^>]*?(class="(.+?)"[^>]*)?>' .
			'((?:.*?(?:(?!<div)|(?R))*)*)' .
			'<\/div>/sm';

if (preg_match_all($regex, $html_string, $matches, PREG_SET_ORDER)) {
	foreach ($matches as $match) {
		if (in_array('test', explode(' ', $match[2]))) {
			echo trim ($match[3]);
		}
	}
}
{% endhighlight %}

... is incredibly complex rules that will never hit every edge case in HTML
and has devoured hours upon hours of your time. The only way you can possibly
parse HTML with regular expressions even remotely correctly is an infinitely
long regular expression or very non-standard recursive rules.  Even when doing
that, you come to many odd combinations of valid HTML that is tough to match
with PCRE, let alone even the most expressive dialects of regular expressions.

Do you really want to add to that regular expression to handle comments?
Single quoted attributes?  Attributes with no quotes?  Whatever other insanity
thought up by people pushing the relaxed nature of HTML to its limits?  I'll
give you a hint: You don't.  You can find a better tool.

## Why not SimpleXML?

SimpleXML is a real parser.  It wraps around libxml to parse XML in a standard
way.  There is an issue with that, however.  SimpleXML, as the name suggests,
is really only meant to handle XML, there are nuances with parsing HTML that
don't show up with XML. While the differences can be minimal, there are cases
in which valid HTML will not make for valid XML.  Thus, it really is not the
right tool for the job and you could spend more time than necessary attempting
to coerce your HTML to work with it.

Parsing issues aside, the SimpleXML library is inconsistent and generally ugly
as far as APIs are concerned.  While the running joke is that inconsistency
is the only consistency you will find with PHP, the inconsistencies in
SimpleXML stem from the way that it exposes the XML structure in magical ways.

You can still find a better tool.

## Introduction to DOM basics

Document Object Model uses the same libxml as SimpleXML but with a sane API.

DOM is a language agnostic convention for representing or modifying HTML,
XHTML, and XML. With a thoroughly documented interface by the W3C, DOM is the
defacto standard widely used by web browsers themselves to work with the pages.

DOM is _the_ way to work with HTML in PHP.  Not only does PHP support it
natively, it's pretty fast and will correctly parse HTML in ways that other
techniques could never.


## Creating DOM object

The basic building block of DOM is the DOMDocument.  An empty DOM document
can be created by instantiating it just like any other class, with
`new DOMDocument()`.  However, when working with pre-existing HTML there are
a multitude of static methods meant to import markup in various states.  For
instance, there's a specific method to load HTML from files, as well as a
method to load from a string.

{% highlight php startinline %}
$document = DOMDocument::loadHTMLFile('./data.html');

$document = DOMDocument::loadHTML(
	'<!DOCTYPE html><html><body></body></html>'
);
{% endhighlight %}

All of these are incredibly basic and simple to work with.  If, however, you
have the less simple SimpleXML there's even a way to get a DOM node from that
using `dom_import_simplexml($simpleXMLElement)` which returns a DOM Node
element.


## Writing DOM to HTML

There are times when you want to work with DOM nodes and convert it back to
an HTML string.  To do so 


## DOM iterating

Simple.  Iterate through children, attributes, anything iterable freakin' talk
about it.

## DOM editing

Modification or creation of new nodes and any gotchas?

Changing classes?

## XPath

Quick explanation of xpath

XPath 1.0 only!  Oof! What does this mean??

Examples

## Handling broken HTML

Even though HTML is close to a superset of XML, people still find new and
creative ways to make undecipherable and utterly broken HTML.  From including
block level tags inside of inline tags to just not writing valid markup, the
unspeakable atrocities committed by developers can't possibly be attributed
to malice, can they?

Whether or not some people just want to watch the world burn there are libraries
out there to handle even the most broken of HTML.  One such library in PHP is
[tidy][php_tidy].  Tidy is a library to automatically clean up sloppy markup
to try to make a valid HTML document with it.  It's not as if an engineer
couldn't spend their time writing some regular expressions to clean up
HTML but really why bother?  It's already done and it's incredibly simple.

{% highlight php startinline %}
$tidy = new tidy();

$cleanHTML = $tidy->repairString($brokenHTML);

$doc = DOMDocument::loadHTML($cleanHTML);
{% endhighlight %}

And that's it.  You can take some seriously broken HTML in it and just beat
it into submission.

## This entire thing sounds too hard..

Compared to the alternatives, DOM is the path of least resistance when
working with HTML.  There may be neglible performance issues but that is only
if you write incredibly performant parsing.  And you won't.

[s_is_for_simple]: http://wanderingbarque.com/nonintersecting/2006/11/15/the-s-stands-for-simple/
[zalgo]: http://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags
[php_tidy]: http://php.net/book.tidy
[php_simplexml]: http://php.net/book.simplexml
[w3c_xpath]: http://www.w3.org/TR/xpath/
[regular_grammar]: http://en.wikipedia.org/wiki/Regular_grammar
[context_grammar]: http://en.wikipedia.org/wiki/Context-free_grammar
