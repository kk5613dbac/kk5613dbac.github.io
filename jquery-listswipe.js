		$(function() {
			$('.example-1').listSwipe();
		});

(function () {

	$.fn.listSwipe = function (options) {

		var settings = {
			itemSelector: '>',
			itemActionWidth: 80,
			leftAction: true,
			rightAction: true,
			snapThreshold: 0.8,
			snapDuration: 200,
			closeOnOpen: true,
			maxYDelta: 40,
			initialXDelta: 25
		};

		return this.each(function () {
			var $list = $(this);

			$list.on('touchstart', settings.itemSelector, function (e) {
				var $item = $(this);
				$item.stop();

				if (settings.closeOnOpen) {
					$list.find(settings.itemSelector).not($item).animate({
						left: '0px'
					}, settings.snapDuration);
				}

				var touch = getTouchPosition(e);
				var rawStartLeft = $item.css('left');

				var data = {
					touchStart: touch,
					startLeft: rawStartLeft === 'auto' ? 0 : parseInt(rawStartLeft),
					initialXDeltaReached: false,
					maxYDeltaReached: false
				};

				$item.data('listSwipe', data);
			}).on('touchmove', settings.itemSelector, function (e) {
				var $item = $(this);
				var data = $item.data('listSwipe');
				var touch = getTouchPosition(e);

				if (data.maxYDeltaReached) {
					return;
				}

				var touchDelta = getTouchDelta(touch, data, settings);

				if (!data.maxYDeltaReached && Math.abs(touchDelta.yDelta) > settings.maxYDelta) {
					data.maxYDeltaReached = true;
					$item.animate({
						left: '0px'
					}, settings.snapDuration);
				}
				else if (!data.initialXDeltaReached && Math.abs(touchDelta.xDelta) > settings.initialXDelta) {
					data.initialXDeltaReached = true;
					$item.css('left', touchDelta.xDelta + 'px');

				}
				else if (data.initialXDeltaReached) {
					$item.css('left', touchDelta.xDelta + 'px');
				}

				$item.data('listSwipe', data);

			}).on('touchend', settings.itemSelector, function (e) {
				var $item = $(this);
				var data = $item.data('listSwipe');
				var touch = getTouchPosition(e);

				if (data.maxYDeltaReached) {
					return;
				}

				var touchDelta = getTouchDelta(touch, data, settings);

				var xThreshold = Math.abs(touchDelta.xDelta) / settings.itemActionWidth;
				if (xThreshold >= settings.snapThreshold) {
					if (touchDelta.xDelta < 0) {
						touchDelta.xDelta = -settings.itemActionWidth;
					}
					else {
						touchDelta.xDelta = settings.itemActionWidth;
					}
				}
				else {
					touchDelta.xDelta = 0;
				}

				$item.animate({
					left: touchDelta.xDelta + 'px'
				}, settings.snapDuration);
			});
		});
	};

	function getTouchPosition(event) {
		return {
			x: event.changedTouches[0].clientX,
			y: event.changedTouches[0].clientY
		};
	}

	function getTouchDelta(touch, data, settings) {
		var xDelta = touch.x - data.touchStart.x + data.startLeft;
		var yDelta = touch.y - data.touchStart.y;

		if (!settings.rightAction && xDelta < 0) {
			xDelta = 0;
		}

		if (!settings.leftAction && xDelta > 0) {
			xDelta = 0;
		}

		return {
			xDelta: xDelta,
			yDelta: yDelta
		};
	}

})();