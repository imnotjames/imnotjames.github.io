---
layout: post
title: Writing JavaScript Behavioral Unit Tests
tags:
- Tutorial
- JavaScript
- Unit testing
---
When going through some old projects I realized that I hadn't particularly kept
up with my [game of life][gameoflifejs_github] implementation in JavaScript.
In particular I never truly verified it worked.  Sure, it _looks_ like it worked
but how would I know for sure that it did?  Behavioral unit tests to the rescue.

* Any live cell with fewer than two live neighbors dies, as if caused by under-population.
* Any live cell with two or three live neighbors lives on to the next generation.
* Any live cell with more than three live neighbors dies, as if by overcrowding.
* Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

This is a good representation of the behavior that should be exhibited by
[Conway's Game of Life][gameoflife_wiki] in plain, understandable English.
However, we are engineers!  We have to come up with some overly abstract and
strict way to represent these behaviors.  We need a specification.

## Behavioral Specifications

A behavioral specification is a document, not dissimilar from pseudo code, which
describes the expected behavior of a software unit.  While not entirely
necessary for writing tests these documents can flesh out what tests are needed
and reveal issues that may not be obvious otherwise.  As crazy as it may sound
it also creates a way for someone that is less technical to not only understand
what your tests do, but also verify that they match every behavior that is
expected of the system.

While there is no right or wrong way to write a behavior specification, the
[structure proposed by Dan North][dans_behavioral_spec_proposal] is clear,
concise, and uniform.

```
Story: Game of Life

As a cellular automaton simulation
I want to follow the rules of Conway's Game of Life
So that we are able to simulate simple life

Scenario 1: Game of Life should kill lonely cells
Given that a cell is alive
 And that cell has no live neighbors
When a simulation step has executed
Then that cell should die

Scenario 2: Game of Life should kill cells with only one neighbor
Given that a cell is alive
 And that cell has exactly one live neighbor
When a simulation step has executed
Then that cell should die

Scenario 3: Game of Life should leave cells with two neighbors alone
Given that a cell is alive
 And that cell has two live neighbors
When a simulation step has executed
Then that cell should continue to live

Scenario 4: Game of Life should leave cells with three neighbors alone
Given that a cell is alive
 And that cell has three live neighbors
When a simulation step has executed
Then that cell should continue to live

Scenario 5: Game of Life should kill overpopulated cells
Given that a cell is alive
 And that cell has more than three live neighbors
When a simulation step has executed
Then that cell should die

Scenario 6: Game of Life should reproduce into cells with exactly three live neighbors
Given that a cell is dead
 And that cell has exactly three live neighbors
When a simulation step has executed
Then that cell should be given life
```

## Writing The Tests

Writing unit tests in Jasmine is dead simple.  The hard part is   Just a minor translation.  We start by creating the directory `specs`
and adding the file for our story in it, `gameoflife.js`.  We can start by
adding in a basic description of our story, as well as set up which will be used
by all of our tests.

To create a group of specs which will be our story, Jasmine provides `describe`,
which accepts a description string and a callback.  Because the callback is
a normal JavaScript function we can define variables inside it which is exposed
to all of the specs.  The set up is achieved by using the `beforeEach` function
provided by Jasmine with the describe callback.

```javascript
'use strict';

describe('Game of Life', function() {
    // As a cellular automaton
    // I want to follow the rules of Conway's Game of Life
    // So that we are able to simulate simple life

    var game;

    beforeEach(function() {
        game = new GameOfLife(5, 5);
    });

    // No scenarios have been defined yet, but this is where they would go!
});
```

For the most part the scenario test should be as basic as possible.  They have
already been defined in our Behavioral specification document, and can be
translated to our Jasmine tests.  The scenarios match up with specs using the
Jasmine provided function `it`.

To verify behavior expectations are key to the tests, and the `expect` function
can be used.  Expectations in jasmine take the actual value as a parameter and
use method chaining to create matches.  There are many
[matchers included by default][jasmine_included_matchers] in Jasmine, but those
used most often are `toBe` and `toEqual`.  While similar there is a definite
difference: `toBe` tests if an actual matches a given expected result with `===`
and `toEqual` tests if an actual matches a given expected result with `==`.

For example, scenario 1 and 2 could be represented with the following specs:

```javascript
// Scenario 1
it('should kill lonely cells', function() {
    // Given that a cell is alive
    game.spawnCell(1, 1);

    // And that cell has no live neighbors
    game.commit();

    // When a simulation step has executed
    game.step();

    // Then that cell should die
    expect(game.getInhabitants().length).toEqual(0);
});

// Scenario 2
it('should kill cells with only one neighbor', function() {
    // Given that a cell is alive
    game.spawnCell(1, 1);

    // And that cell has exactly one live neighbor
    game.spawnCell(1, 2);
    game.commit();

    // When a simulation step has executed
    game.step();

    // Then that cell should die
    expect(game.getInhabitants().length).toEqual(0);
});
```

Notice that the `game` variable has already been initiated in the `beforeEach`
function in the spec definition, so we can use it in our scenario.  We use
`expect` - passing in `game.getInhabitants().length` - and use Jasmine's
[matching API][jasmine_included_matchers] to verify that it is equal to `0`.
While not absolutely necessary, they also include the original document as
comments, to explain what the test is trying to do in case the tests are ever
questioned.

While this is a fraction of the scenarios, they all can be written in similar
fashion.  For the complete version of these specs written in Jasmine,
[check them out on GitHub.][gameoflifejs_specs]

## NPM and Grunt in 5 minutes

While using NPM and grunt are not needed for using Jasmine it does simplify the
experience.  It takes a small amount of work getting it up and running but
could be an article in itself.  However, in just a couple minutes you can go
from arduously initiating tests manually to having grunt fly through them.  It
also bypasses the need of having a web browser open to run the tests by using
[phantomJS][phantomjs] - a definite win.  If you haven't already you should
[install node][install_node] now.

If don't have a `package.json` file you can generate one with
[`npm init`][npm_init_docs].  Opening up the `package.json` file you should add
to the end of your `devDependencies` directive both `"grunt": "^0.4.5"` and
`"grunt-contrib-jasmine": "^0.7.0"`.  If you need to know anything else about
the `package.json` file, you can always consult the
[npm documentation on the subject][npm_package_json_docs].  Once you're
satisfied with your `package.json` running `npm install` should fetch Jasmine,
grunt, and the grunt Jasmine task.

However, you still need a `Gruntfile.js` to run the tests.  The `Gruntfile`
initializes the various tasks including our test runner.  The following is an
example `Gruntfile` which assumes your Jasmine specs are in `/specs/`.

```javascript
'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jasmine : {
            src : 'src/**/*.js',
            options : {
                specs : 'specs/**/*.js'
            }
        }
    });

    grunt.task.registerTask('test', [ 'jasmine' ]);
    grunt.loadNpmTasks('grunt-contrib-jasmine');
};
```

This is a very basic example which only runs the Jasmine tests.  Grunt can do a
wide variety of tasks.  More information on setting up tasks in a
`Gruntfile` can be found in the [Grunt Documentation][grunt_docs].

## Integrating with Travis CI

Continuous integration is an important part of keeping up to date with the
status of your software build.  Not only does it never forget to run your unit
tests, it runs them on many different environments at the same time.
Travis CI has an in [in-depth reference][travis_nodejs_integration]  on their
integration with node.js for a multitude of complex set ups. For anyone else
who just wants to get the Jasmine tests up and running with Travis CI, it's one
of the more basic things to do.

By default Travis calls `npm test`, which refers to a predefined script. Add to
the `package.json` a `scripts` section and within that scripts section you must
define how you want your tests to be run.  Because grunt was configured with a
task called test in the `Gruntfile` above, adding `grunt test` should be
sufficient.  For extra measure, and to aid in resolving any failures it is
a good rule of thumb to enable as much verbosity as possible.

```json
  "scripts": {
    "test": "grunt test --verbose"
  }
```

However, changes to the package definition alone won't get a project ready to
be ran.  To tell Travis what language this is and how the environment must be
set up a `.travis.yml` file is required.

```yaml
language: node_js
node_js:
  - "0.11"
  - "0.10"
  - "0.8"
before_install:
  - "npm update -g npm"
  - "npm install -g grunt-cli"
```
The amount of customization that can be done with the configuration file can be
a little overwhelming, but most everything that anyone could ever want to know
about Travis is in their  [documentation][travis_docs].  However, with those two
changes in place all it takes is a commit, a push, and you can sign into Travis
and get it to start running continuous integration like all of those fancy
pants engineers.

## The Point of it All

At the end of the day software that is written is worthless if it doesn't behave
as it's supposed to.  Even if broken software is better than no software, part
of being a professional is holding yourself to a higher standard than
"adequate".  With everything set up not only can you verify after every change
that you've not broken the behavior of your systems, you also get feedback on
all commits automatically through Travis or other Continuous Integration
systems.  Nobody is always perfect, so testing is a valuable safety net for
when humanity hits and mistakes are made.

Most of all, breaking the build should be lauded as a learning experience, not
shunned as a failure.


[gameoflifejs_github]: /gameoflife.js
[gameoflifejs_specs]: https://github.com/imnotjames/gameoflife.js/blob/master/specs/gameoflife.js
[jasmine]: http://jasmine.github.io/
[jasmine_included_matchers]: http://jasmine.github.io/2.0/introduction.html#section-Included_Matchers
[grunt_docs]: http://gruntjs.com/getting-started
[npm_init_docs]: https://www.npmjs.org/doc/cli/npm-init.html
[npm_package_json_docs]: https://www.npmjs.org/doc/files/package.json.html
[wiki_behavioral_spec]: http://en.wikipedia.org/wiki/Behavior-driven_development#Behavioural_specifications
[dans_behavioral_spec_proposal]: http://dannorth.net/whats-in-a-story/
[install_node]: http://nodejs.org/download/
[travis_nodejs_integration]: http://docs.travis-ci.com/user/languages/javascript-with-nodejs/
[travis_docs]: http://docs.travis-ci.com/
[phantomjs]: http://phantomjs.org/
[gameoflife_wiki]: http://wikipedia.org/wiki/Conway%27s_Game_of_Life
