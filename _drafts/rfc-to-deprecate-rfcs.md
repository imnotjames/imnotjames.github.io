---
date: 2014-08-26 00:00:00 -0500
layout: post
title: 'PHP RFC: Deprecating the RFC Process'
tags:
  - PHP
  - RFC
  - Satire
excerpt: >
  The RFC process was put in place to foster collaboration between contributors
  and to encourage polite discourse and discussion of proposed changes to PHP in
  such a way that a benevolent dictator would not be necessary.  That process has
  failed on many levels and this RFC aims to fix that.
---

## PHP RFC: Deprecating the RFC Process
* Version: 0.1000000000000000055511151
* Date: 2014-08-13  
* Author: James Ward, james@notjam.es
* Status: Draft
* First Published at: {{ site.url }}{{ page.url }}

---

### Introduction
The RFC process was put in place to foster collaboration between contributors
and to encourage polite discourse and discussion of proposed changes to PHP in
such a way that a benevolent dictator would not be necessary.  That process has
failed on many levels and this RFC aims to fix that.

The process put in place in 2008 was only erected to add road blocks by those
who enjoy wading through red tape.  Not only does it make it harder for the real
contributors to make changes to the language, it is designed to actively
infuriate anyone who isn't a mindless drone.  It stops code cowboys from
wrangling the buggalo that roam free and cultivating the language into a
blossoming homestead.

[Derick Rethans agrees with the sentiment:][derick_haet_rfc]
> [@SaraMG][tw_saramg]: And I've already said that close to
> when this RFC stuff showed up... Process apparently is more important than
> getting shit done.
>
> Too many rules, regulations and road blocks. No more fun.

Even with these abundance of rules, there are several cases of users
circumventing them, finding loopholes, or generally pushing for exceptions
to be made for their cause because it's _important_.

Some contributors believe that the the RFC system shouldn't - and even doesn't -
apply to them.
These can include them deciding that changes are probably bugs instead of
compatibility breaking changes, people writing RFCs with extreme bias and
conveniently glossing over pitfalls of the features.

Some users even encourage others to vote one way or another for no reason
other than that their belief is that an RFC does not belong.

[Quoting Zeev on his thoughts of the 64bit integer RFC][zeev_64bit_goof]:
> In case there's any chance people lost track in the noise:
>
> Please, please - vote No on https://wiki.php.net/rfc/size\_t\_and\_int64\_next#vote
>
> [ ... ]
>
> I urge everyone with a right to vote (and only those, as per
> https://wiki.php.net/rfc/voting) to vote no, and even those who voted
> yes to revert their votes to no.


### Proposal

The resolution is an obvious one: Remove the RFC process as soon as possible.

However, removing it all at once would confuse users - there are
[blog posts][rfc_mysteries_blog] written about it and it's entirely unlucky to
throw out a documented rule set when there's still a baby debating the
temperature of the bathwater for optimum cleaning.  Instead, the old system
shall be deprecated and can be superseded by an entirely meritocratic
establishment.

Anarchy and meritocracy, hand in hand.  An organic project structure, based on
perceived meritocracy, who can complain the loudest, and who has the fastest
`git push` in the west.  Not only does this mean that pesky cowboys don't have
to worry about silly notions of backwards compatibility, they also can ignore
release processes which were created in an RFC.  That
way we only get the best of the best people who can make a perceptual dominance
over the rest.

Quoting [Phil Sturgeon][phil_out_of_context_stuff_it]
> "You know enough C and you understand how to implement the feature,
> but I've not seen your name around here so get stuffed."

Any form of following a process should be shunned and organic collaboration
will follow.  All users should just do what they think is right for the project.

### Backward Incompatible Changes
There are no syntax changes or PHP engine changes that are backwards
incompatible.

However, this will affect backwards compatibility towards processes as people
who still wish to use the RFC process will no longer be able to.  This can be
resolved by creating a new error code level `E_BIKESHEDDING` and emitting it
when any attempts to follow the deprecated process occurs.  This must be emitted
when attempting to create an RFC, and if a mailing list email seems to have an
form of structure, as any perceived process could hint to other users that the
process is to be used.

### Proposed PHP Version(s)
PHP next.next.next

### RFC Impact

#### To SAPIs
This may end up with SAPIs being removed at a whim but they will probably be
added back on a whim.  To that extent I believe all SAPIs will be unaffected.

#### To Existing Extensions
As there is no longer an RFC system in place extension backwards compatibility
should be dropped immediately as engine level changes do not require an RFC
anyway.

#### To Opcache
We should probably delay the next release of PHP by two months to work on
OpCache and make it non-RFC compliant.

### New Constants
`E_BIKESHEDDING`: Error message emitted on pages that attempt to follow RFC

### Open Issues
None.  This idea is perfect.

### Unaffected PHP Functionality
The PHP Community thankfully will still find ways to communicate - just not via
the RFC Process.  A Facebook group should be set up to encourage open
communication which the RFC process failed with.  For meat-space collaboration,
PHP branded bullhorns to assist with people yelling.

### Future Scope
If in the future this RFC is ever printed it must be printed on 7.825 by 9.825
sheets of a blue coloration - no lighter than `#B5B3FF` and no darker than
`#124DFF`.

### Proposed Voting Choices
There are two voting options available.  The first vote is to implement the
deprecation and push forward with anarchy.  The alternative is to continue on
with the drole of a process that works.

Because this vote does not directly affect the syntax or backwards compatibility
of the language a 50% + 1 vote is required.

My vote is on everyone squabbling over the future scope section.

### Patches and Tests
No patch has been created yet to the wiki or voting systems to emit the
deprecation warning.


### References
[Sara Golemon's and Derick Rethans conversation regarding internals and the RFC process][saramg_internals_complaints]
[Phil speaking about whatever][phil_out_of_context_stuff_it]

### Rejected Features
None yet.


[saramg_internals_complaints]: https://twitter.com/SaraMG/status/499578631014731776
[rfc_mysteries_blog]: https://blogs.oracle.com/opal/entry/the_mysterious_php_rfc_process
[phil_out_of_context_stuff_it]: http://marc.info/?l=php-internals&m=137896205101813&w=2
[zeev_64bit_goof]: http://news.php.net/php.internals/74268
[derick_haet_rfc]: https://twitter.com/derickr/statuses/499586842279542784
[tw_saramg]: https://twitter.com/SaraMG
