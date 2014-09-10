'use strict';

var GameOfLifeView = function(canvas) {
	var context = canvas.getContext('2d');

	var width = canvas.width;
	var height = canvas.height;

	canvas.style['image-rendering'] = 'optimizeSpeed';
	canvas.style['image-rendering'] = 'crisp-edges';
	canvas.style['image-rendering'] = '-moz-crisp-edges';
	canvas.style['image-rendering'] = '-webkit-optimize-contrast';
	canvas.style['image-rendering'] = 'optimize-contrast';
	canvas.style['image-rendering'] = 'pixelated';
	canvas.style['msInterpolationMode'] = 'nearest-neighbor';

	context['imageSmoothingEnabled'] = false;
	context['mozImageSmoothingEnabled'] = false;
	context['oImageSmoothingEnabled'] = false;
	context['webkitImageSmoothingEnabled'] = false;
	context['msImageSmoothingEnabled'] = false;

	this.render = function(gameOfLife) {
		context.clearRect (0, 0, width, height);

		context.fillStyle = 'rgb(30, 30, 30)';
		context.strokeStyle = 'rgb(30, 30, 30)';

		var nodes = gameOfLife.getInhabitants();

		for (var i in nodes) {
			context.beginPath();

			context.rect(
				Math.floor((nodes[i].x / gameOfLife.getWidth()) * width),
				Math.floor((nodes[i].y / gameOfLife.getHeight()) * height),
				Math.floor((1 / gameOfLife.getWidth()) * width),
				Math.floor((1 / gameOfLife.getHeight()) * height)
			);

			context.fill();
			context.stroke();
		}
	};
};

var GameOfLifeController = function(gameOfLife, view) {

	var hooks = [];

	this.addHook = function(hook) {
		hooks.push(hook);
	};

	this.drawLines = function(lines, xOffset, yOffset) {
		if (typeof lines === 'string') {
			lines = [lines];
		}

		if (typeof xOffset === 'undefined') {
			xOffset = Math.floor((gameOfLife.getWidth() / 2) - (lines[0].length / 2));
		}

		if (typeof yOffset === 'undefined') {
			yOffset = Math.floor((gameOfLife.getHeight() / 2) - (lines.length / 2));
		}

		var x = xOffset;
		var y = yOffset;

		for (var i in lines) {
			var line = lines[i].split("");

			for (var j in line) {
				if (line[j] == ' ') {
					gameOfLife.killCell(x, y);
				} else {
					gameOfLife.spawnCell(x, y);
				}

				x++;
			}

			x = xOffset;

			y++;
		}
	};

	this.run = function() {
		var tick = 0;

		var that = this;

		setInterval(
			function() {
				for (var i in hooks) {
					hooks[i].call(that, tick);
				}

				tick++;

				gameOfLife.step();
				gameOfLife.commit();
			},
			600
		);

		var lastTick = 0;

		(function renderLoop() {
			view.render(gameOfLife);

			var thisTick = Date.now();

			var tickDelta = thisTick - lastTick;

			var tickWait = (1000 / 15) - tickDelta;

			lastTick = thisTick + (tickWait ? tickWait : 0);

			setTimeout(
				function() {
					(
						window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						function(callback){ window.setTimeout(callback, 1000 / 60); }
					)(renderLoop);
				},
				tickWait
			);
		})();
	};
};

window.onload = function() {
	var canvas = document.createElement('canvas');

	canvas.width = 640;
	canvas.height = 320;

	canvas.style['width'] = '100%';

	var container = document.getElementById('gol-container');

	container.appendChild(canvas);

	var view = new GameOfLifeView(canvas);

	var gameOfLife = new GameOfLife(32, 16);
	var controller = new GameOfLifeController(gameOfLife, view);

	controller.addHook(function(tick, controller) {
		if (tick % 8 != 0) {
			return;
		}

		var notFound = [
			'x    x   xxxx   x    x',
			'x    x  x    x  x    x',
			'x    x  x    x  x    x',
			' xxxxx  xxxxxx   xxxxx',
			'     x  x    x       x',
			'     x  x    x       x',
			'     x   xxxx        x'
		];

		this.drawLines(
			notFound
		);
	});

	controller.run();
};
