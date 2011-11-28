var execute = function(func){
    location.href = "javascript:void (" + encodeURIComponent(func) + ")()";
};

execute(function(){
    var MouseUtil = { };
    ['mousemove', 'mousedown', 'mouseup', 'click'].forEach(function (method) {
        MouseUtil[method] = function(x, y) {
            if (!x) x = 0;
            if (!y) y = 0;
            var event = document.createEvent("MouseEvents");
            event.initMouseEvent(method, true, false, window,
                                 0, x, y, x, y, false, false, true, false, 0, null );
            return event;
        };
    });

    var s = document.createElement('script');
    s.src = 'http://s.hatena.ne.jp/js/HatenaStar.js';
    s.charset = 'utf-8';

    var timer = setInterval(function(){
        if(window.Hatena){
            init();
            clearInterval(timer);
        }
    }, 500);

    document.body.appendChild(s);

    function init(){
        window.Hatena.Star.EntryLoader.headerTagAndClassName = ['h2', 'item_title'];
        window.Keybind.add('S', function(){
            addStar();
        });

        var loaderTimer = null;
        window.register_hook('after_printfeed', function(feed) {
            if (loaderTimer) {
                clearTimeout(loaderTimer);
            }
            loaderTimer = setTimeout(function() {
                new window.Hatena.Star.EntryLoader();
                loaderTimer = null;
            }, 500);
        });
    }

    function addStar() {
        var item = get_active_item(true);
        if (!item) return;

        var element = item.element;
        if (!element) return;

        var button = element.querySelector('.hatena-star-add-button');
        if (!button) return;

        button.dispatchEvent(MouseUtil.click(0, 0));
    }
});