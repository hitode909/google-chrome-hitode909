(function() {
    var meta = document.querySelector('meta[name="expand-image"]');
    if (meta && meta.content == 'no') return;

    if (location.host == "soundcloud.com") return; // XXX: heuristic

    // http://remysharp.com/2010/07/21/throttling-function-calls/
    function throttle(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    var expand = throttle(function(target) {
        if (!target) target = document.body;
        if (!target.tagName || target.tagName.toLowerCase() == 'img') return;

        Array.prototype.slice.apply(target.querySelectorAll('a')).forEach(function(a) {
            if (a.href.split(/\?|\\#/)[0].match(/(jpg|gif|png|bmp)$/i)
                && !a.querySelector('img')
                && !document.querySelector('img[src^="' + a.href + '"]')) {
                var img = document.createElement('img');
                img.src = a.href;
                img.style.maxWidth = '100%';
                a.appendChild(img);
            }
        });
    }, 100);

    document.body.addEventListener('DOMContentLoaded',function(ev){
        expand(document.body);
    }, false);

    document.body.addEventListener('DOMNodeInserted',function(ev){
        expand(document.body);
    }, false);

    document.body.addEventListener('mouseup',function(ev){
        expand(document.body);
    }, false);
})();