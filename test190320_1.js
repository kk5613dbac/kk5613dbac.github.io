window.addEventListener("load", function(event) {
    var elements = document.getElementsByClassName("drag-and-drop");

    var x;
    var y;

    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, { passive: false });
        elements[i].addEventListener("touchstart", mdown, { passive: false });
    }

    function mdown(e) {
        this.classList.add("drag");

        if(e.type === "mousedown") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        var drag = this;

        document.body.addEventListener("mousemove", mmove, { passive: false });
        document.body.addEventListener("touchmove", mmove, { passive: false });
    }

    function mmove(e) {
        var drag = document.getElementsByClassName("drag")[0];

        if(e.type === "mousemove") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        e.preventDefault();

        drag.style.top = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        drag.addEventListener("mouseup", mup, { passive: false });
        document.body.addEventListener("mouseleave", mup, { passive: false });
        drag.addEventListener("touchend", mup, { passive: false });
        document.body.addEventListener("touchleave", mup, { passive: false });
    }

    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        document.body.removeEventListener("mousemove", mmove, { passive: false });
        drag.removeEventListener("mouseup", mup, { passive: false });
        document.body.removeEventListener("touchmove", mmove, { passive: false });
        drag.removeEventListener("touchend", mup, { passive: false });

        drag.classList.remove("drag");
    }

}, false);