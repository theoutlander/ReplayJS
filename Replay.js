"use strict";

var r = (function () {

    var _mouseOvertimeout = 2000;
    var _cacheKey = "replay";
    var _started = false;

    var items, itemCount;

    var Tracker = function (src, options) {

        options = options || {};

        this.element = src || document;
        this.timeout = options.MouseOverTimeout || this._mouseOvertimeout;
    };
    var TrackMouse = function (mouseEvent) {
        items[itemCount++] = {
            id: mouseEvent.toElement.id,
            type: 'mouse',
            ts: Date.now(),
            x: mouseEvent.x,
            y: mouseEvent.y
        };

        console.log(mouseEvent.x);
        console.log(mouseEvent.y);
    };

    var TrackKeyboard = function (keyboardEvent) {
        items[itemCount++] = {
            id: keyboardEvent.srcElement.id,
            type: 'keyboard',
            ts: Date.now(),
            charCode: keyboardEvent.charCode
        };
        console.log(String.fromCharCode(keyboardEvent.charCode));
    };

    var TrackHover = function (mouseEvent) {
        setTimeout(function () {
            items[itemCount++] = {
                id: mouseEvent.toElement.id,
                type: 'hover',
                ts: Date.now()
            };
            console.log("Hover: " + mouseEvent.toElement.id);
        }, this.timeout);
    };

    var Serialize = function () {
        localStorage[_cacheKey] = JSON.stringify(items);
    };

    var Deserialize = function () {
        items = localStorage[_cacheKey] || "{}";
        items = JSON.parse(items);

        itemCount = Object.keys(items).length;
    };
    Tracker.prototype.start = function () {
        if (!_started) {
            Deserialize();

            document.addEventListener('click', TrackMouse);
            document.addEventListener('keypress', TrackKeyboard);
            document.addEventListener('hover', TrackHover);

            _started = true;
        }
    };

    Tracker.prototype.stop = function () {
        if (_started) {
            document.removeEventListener('click', TrackMouse);
            document.removeEventListener('keypress', TrackKeyboard);
            document.removeEventListener('hover', TrackHover);

            Serialize();

            _started = false;
        }
    };

    Tracker.prototype.play = function () {
        this.stop();
        Deserialize();
        var selectedElement = null;

        RecursivePlay(items, 0, itemCount, selectedElement);

        /*
		var selectedElement = null;
		for(var i=0; i<itemCount; i++)
		{
			var item = items[i];

			switch(item.type)
			{
				case 'mouse':
					console.log("Click location: " + item.x, item.y);
					selectedElement = document.getElementById(item.id);

					if(selectedElement!=null)
					{
						selectedElement.click();
					}

					break;
				case 'keyboard':
					console.log("Entered " + String.fromCharCode(item.charCode) + " on " + selectedElement);
					if(selectedElement!=null)
					{
						var e=document.createEvent("MouseEvent")
						e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						selectedElement.dispatchEvent(e);

						selectedElement.click();
						selectedElement.value = selectedElement.value.concat(String.fromCharCode(item.charCode));
					}
					break;
				case 'hover':
					console.log("Hovered on " + item.id);
					break;
				default:
					break;				
			}
		}*/
    };

    var RecursivePlay = function (items, index, itemCount, selectedElement) {
        if (index < itemCount) {
            var item = items[index];
            var ts = item.ts;

            switch (item.type) {
                case 'mouse':
                    console.log("Click location: " + item.x, item.y);
                    selectedElement = document.getElementById(item.id);

                    if (selectedElement != null) {
                        selectedElement.click();
                    }

                    break;
                case 'keyboard':
                    console.log("Entered " + String.fromCharCode(item.charCode) + " on " + selectedElement.id);
                    if (selectedElement != null) {
                        //var e=document.createEvent("MouseEvent")
                        //e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        //selectedElement.dispatchEvent(e);

                        selectedElement.click();
                        selectedElement.value = selectedElement.value.concat(String.fromCharCode(item.charCode));
                    }
                    break;
                case 'hover':
                    console.log("Hovered on " + item.id);
                    break;
                default:
                    break;
            }

            if (index + 1 < itemCount) {
                var timeDiff = items[index + 1].ts - ts;
                console.log("Waiting for " + timeDiff + "milliseconds");
                setTimeout(function() {
                    RecursivePlay(items, index + 1, itemCount, selectedElement);
                }, timeDiff);
            }
        }
    };
    Tracker.prototype.clear = function () {
        localStorage[_cacheKey] = "{}";
    };

    return new Tracker();
}());
