window.addEventListener("load", function(event) {
    var elements = document.getElementsByClassName("drag-and-drop");

    var x;
    var y;

    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("touchstart", tstart, { passive: false });
    }

    function tstart(e) {
        var event = e.changedTouches[0];

        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        this.addEventListener("touchmove", tmove, { passive: false });
    }

    function tmove(e) {
        var event = e.changedTouches[0];

        e.preventDefault();

        this.style.top = event.pageY - y + "px";
        this.style.left = event.pageX - x + "px";

        this.addEventListener("touchend", tend, { passive: false });
    }

    function tend(e) {
        this.removeEventListener("touchmove", tmove, { passive: false });
        this.removeEventListener("touchend", tend, { passive: false });
    }

}, false);