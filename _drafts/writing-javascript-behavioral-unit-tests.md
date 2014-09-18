---
layout: post
title: Writing Javascript Behavioral Unit Tests
tags:
- Tutorial
- Javascript
- Unit testing
---
When going through some old projects I realized that I hadn't particularly kept
up with my [game of life][gameoflifejs_github] implementation in javascript.
In particular I never truly verified it worked - sure, it looks like it worked
but how would I know for sure that it did?  Behavioral unit tests to the rescue.

* Any live cell with fewer than two live neighbours dies, as if caused by under-population.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overcrowding.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

However, we are engineers!  We have to come up with some abstract way
to represent these behaviors.

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

## NPM and Grunt in 30 seconds

There are many different behavior driven testing suites available, and one of
those is [Jasmine][jasmine].  It does take a small amount of work getting
it up and running but if you've got node and NPM installed already you're set.
If not you should probably [install NPM][install_npm] and
[install node][install_node] now.

If don't already have a `package.json` file you can generate one with
[`npm init`][npm_init_docs].  Opening up the `package.json` file you should add to the end of
your `devDependencies` directive both `grunt` and `grunt-contrib-jasmine`.

```json
{
    "name": "gameoflife.js",
...
    "devDependencies": {
        "grunt": "^0.4.5",
        "grunt-contrib-jasmine": "^0.7.0"
    }
}
```

If you need to know anything else about the `package.json` file, you can always
consult the [npm documentation on the subject][npm_package_json_docs].

After you've created a `package.json`, you still need a `Gruntfile.js` to
run the jasmine tests.  The `Gruntfile` initializes the various tasks
including our jasmine test running task.  The following is an example
`Gruntfile` which assumes your Jasmine specs are in `/specs/`.

```javascript
'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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

More information on setting up tasks in a `Gruntfile` can be found in the
[Grunt Documentation][grunt_docs].

The only thing that's left is to run `npm install` and you should have jasmine,
npm, and grunt set up and ready to go.

## Writing The Tests

Writing unit tests in Jasmine from our behavioral specification document is dead
simple.  Just a minor translation.  We start by creating the directory `specs`
and adding the file for our story in it, `gameoflife.js`.  We can start by
adding in a basic description of our story, as well as set up which will be used
by all of our tests.

To create a group of specs which will be our story, Jasmine provides `describe`,
which accepts a description string and a callback.  Because the callback is
a normal javascript function we can define variables inside it which is exposed
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

    // No scenarios have been defined yet.
});
```

For the most part the scenarios should be as basic as possible.  They have
already been defined in our Behavioral specifications document, and can be
translated to our Jasmine tests.  The scenarios match up with specs using the
javascript function `it` defined from the Jasmine library.

To verify behavior expectations are key, and the `expect` function can be used.
Expecations take the actual value as a parameter and use method chaining to
create matches.  There are many
[matchers included by default][jasmine_included_matchers] in Jasmine, but those
used most often are `toBe` and `toEqual`.  While similar there is a minor
difference: `toBe` tests if an actual matches a given expected result with `===`
and `toEqual` tests if an actual matches a given expected result with `==`.

For example, scenario 1 could be represented with the following spec.

```javascript
// Scenario 1
it('should kill lonely cells', function() {
    // Given that a cell is alive
    game.spawnCell(1, 1);

    // And that cell has fewer no live neighbors
    game.commit();

    // When a simulation step has executed
    game.step();

    // Then that cell should die
    expect(game.getInhabitants().length).toEqual(0);
});
```

## Integrating with Travis CI

...


[jasmine]: http://jasmine.github.io/
[jasmine_included_matchers]: http://jasmine.github.io/2.0/introduction.html#section-Included_Matchers
[grunt_docs]: http://gruntjs.com/getting-started
[npm_init_docs]: https://www.npmjs.org/doc/cli/npm-init.html
[npm_package_json_docs]: https://www.npmjs.org/doc/files/package.json.html
[gameoflifejs_github]: /gameoflife.js
[wiki_behavioral_spec]: http://en.wikipedia.org/wiki/Behavior-driven_development#Behavioural_specifications
[dans_behavioral_spec_proposal]: http://dannorth.net/whats-in-a-story/
