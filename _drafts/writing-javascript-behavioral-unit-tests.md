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
In particular I never truly verified it worked - sure, it looked like it worked
but how would I know for sure that it did?  Behavioral unit tests to the rescue.

* Any live cell with fewer than two live neighbours dies, as if caused by under-population.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overcrowding.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

However, we are engineers!  We have to come up with some abstract way
to represent these behaviors.

## Behavioral Specifications

```
Story: Game of Life

In order to simulate life
As a cellular automaton
I want to follow the rules of Conway's Game of Life

Scenario 1: Game of Life should initiate with the correct cells before running
Given that a Game of Life is created
When it is given a list of live cells
Then those cells should be the only live cells

Scenario 2: Game of Life should kill lonely cells
Given that a cell is alive
And that cell has fewer than two live neighbors
When a simulation step has executed
Then that cell should die

Scenario 3: Game of Life should leave goldilocks cells alone
Given that a cell is alive
And that cell has two or three live neighbors
When a simulation step has executed
Then that cell should continue to live

Scenario 4: Game of Life should kill overpopulated cells
Given that a cell is alive
And that cell has more than three live neighbors
When a simulation step has executed
Then that cell should continue to live

Scenario 5: Game of Life should reproduce into cells with exactly three live neighbors
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

More information on setting up
tasks in a `Gruntfile` can be found in the [Grunt Documentation][grunt_docs].

Only thing that's left is to run `npm install` and you should have jasmine
set and ready to go.

## The Testing

Writing unit tests in Jasmine from our BDD document is dead simple.  Just a
minor translation.  We start by creating the directory `specs` and adding
the file for our story in it, `gameoflife.js`.  We can start by adding in a
basic description of our story.

```javascript
'use strict';

// In order to simulate life
// As a cellular automaton
// I want to follow the rules of Conway's Game of Life
describe('Game of Life', function() {
	// No scenarios yet!
});
```
For the most part the scenarios should be as basic as possible.  They have
already been defined in our Behavioral specifications document, so for the
most part it can be a translation effort.

[jasmine]: http://jasmine.github.io/
[grunt_docs]: http://gruntjs.com/getting-started
[npm_init_docs]: https://www.npmjs.org/doc/cli/npm-init.html
[npm_package_json_docs]: https://www.npmjs.org/doc/files/package.json.html
[gameoflifejs_github]: /gameoflife.js
