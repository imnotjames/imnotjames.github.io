
var GameOfLifeHelper = function(gameOfLife, canvas) {
	var context = canvas.getContext('2d');

	context.imageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	context.mozImageSmoothingEnabled = false;

	var width = canvas.width;
	var height = canvas.height;

	var hooks = [];

	this.addHook = function(hook) {
		hooks.push(hook);
	};

	this.render = function() {
		context.clearRect (0, 0, width, height);

		context.fillStyle = 'rgb(30, 30, 30)';
		context.strokeStyle = 'rgb(30, 30, 30)';

		var nodes = gameOfLife.getInhabitants();

		for (var i in nodes) {
			context.beginPath();

			context.rect(
				(nodes[i].x / gameOfLife.getWidth()) * width,
				(nodes[i].y / gameOfLife.getHeight()) * height,
				Math.floor((1 / gameOfLife.getWidth()) * width),
				Math.floor((1 / gameOfLife.getHeight()) * height)
			);

			context.fill();
			context.stroke();
		}
	};

	this.drawLines = function(xOffset, yOffset, lines) {
		if (typeof lines == 'string') {
			lines = [lines];
		}

		var x = xOffset;
		var y = yOffset;

		for (var i in lines) {
			line = lines[i].split("");

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

		setInterval(
			function() {
				for (var i in hooks) {
					hooks[i].call(this, tick);
				}

				tick++;

				gameOfLife.step();
				gameOfLife.commit();
			},
			600
		);

		var that = this;

		(function renderLoop() {
			var thisTick = Date.now();

			var tickDelta = thisTick - this.lastTick;

			var tickWait = (1000 / 15) - tickDelta;

			this.lastTick = thisTick + (tickWait ? tickWait : 0);

			setTimeout(
				function() {
					that.render();

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

	var container = document.getElementById('gol-container');

	container.appendChild(canvas);

	canvas.style.width = '100%';

	var gameOfLife = new GameOfLife(32, 16);
	var helper = new GameOfLifeHelper(gameOfLife, canvas);

	helper.addHook(function(tick) {
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

		helper.drawLines(
			Math.floor((gameOfLife.getWidth() / 2) - (notFound[0].length / 2)),
			Math.floor((gameOfLife.getHeight() / 2) - (notFound.length / 2)),
			notFound
		);
	});

	helper.run();
};
