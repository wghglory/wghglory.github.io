(function() {

    /* Add one or more listeners to an element
     ** @param {DOMElement} element - DOM element to add listeners to
     ** @param {string} eventNames - space separated list of event names, e.g. 'click change'
     ** @param {Function} listener - function to attach for each event as a listener
     */
    function addListenerMulti(element, eventNames, listener) {
        var events = eventNames.split(' ');
        for (var i = 0, iLen = events.length; i < iLen; i++) {
            element.addEventListener(events[i], listener, false);
        }
    }

    function playMusic() {
        var audio = document.querySelector('audio');
        var music = document.getElementById('music');
        var onOff = true;

        // window.onresize = function() {
        //     var winW = document.documentElement.clientWidth; // 获取视界宽度
        //     console.log(winW)
        //     if (winW < 992) {
        //         audio.pause();
        //     } else {
        //         audio.play();
        //     }
        // }

        addListenerMulti(music, 'click touchstart', function() {

            if (onOff) {
                this.classList.add('active');
                audio.play();
            } else {
                this.classList.remove('active');
                audio.pause();
            }
            onOff = !onOff;

        });

        var event = new Event('click');
        // Dispatch the event. like trigger()
        music.dispatchEvent(event);
    }

    playMusic();

})();
