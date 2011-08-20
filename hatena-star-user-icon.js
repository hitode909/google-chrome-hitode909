(function(){
    var user_icon = function(name) {
        return "http://www.st-hatena.com/users/" + name.slice(0, 2) + "/" + name + "/profile_s.gif";
    };

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

    var filter = throttle(function() {
        Array.prototype.slice.call(document.querySelectorAll("span.hatena-star-star-container a")).forEach(function(star) {
            try {
                if (star.className.match(/user-icon/)) return;
                star.className += 'user-icon';

                var img = star.querySelector('img');
                s = img.style;
                s.position = 'absolute';
                s.top = '0px';
                s.left = '0px';
                s.margin = '0px';
                s.padding = '0px';
                s.marginBottom = '0px !important';

                var new_img = img.cloneNode(false);
                var name = star.href.match(/hatena\.ne\.jp\/([^\/]+)\/?/)[1];
                s = new_img.style;
                s.width = '16px';
                s.height = '16px';
                new_img.src = user_icon(name);

                img.style.margin = '3px';
                img.style.opacity = 0.9;

                var container = document.createElement('span');
                s = container.style;
                s.position = 'relative';
                s.display = 'inline-block';
                s.width = '16px';
                s.height = '16px';
                s.verticalAlign = 'middle';

                star.appendChild(container);
                container.appendChild(new_img);
                container.appendChild(img);
            } catch(e) { };
        });
    }, 100);

    document.body.addEventListener('DOMNodeInserted',function(ev){
        filter();
    }, false);

    document.body.addEventListener('mouseup',function(ev){
        filter();
    }, false);
})();
