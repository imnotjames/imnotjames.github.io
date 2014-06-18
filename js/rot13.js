
String.prototype.rot13 = function(s) {
	return (s = (s) ? s : this)
		.split('')
		.map(
			function(_) {
				if (!_.match(/[A-Za-z]/))
					return _;

				c = _.charCodeAt(0)>=96;

				k = (_.toLowerCase().charCodeAt(0) - 96 + 12) % 26 + 1;

				return String
					.fromCharCode(k + (c ? 96 : 64));
			}
		)
		.join('');
};

window.addEventListener(
	"load",
	(function () {
		function derot13(s) {
			if (s.indexOf('rot13:') == 0) {
				return s.split(':').slice(1).join(":").rot13();
			}

			return s;
		}

		(function(collection) {
			var a = [];

			for (var i = 0; i < collection.length; i++) {
				a.push(collection[i]);
			}

			return a;
		})(document.getElementsByTagName('a')).map(
			function(_) {
				_.href = derot13(_.href);
				_.innerHTML = derot13(_.innerHTML);

				if (!_.title) {
					if (_.href.substring(0, 7) == 'mailto:') {
						_.title = _.href.substring(7);
					} else if (_.href.indexOf('github.com/') !== -1) {
						_.title = _.href.substring(_.href('github.com/') + 11)
					} else {
						_.title = _.href;
					}
				}
			}
		);
	})
);
