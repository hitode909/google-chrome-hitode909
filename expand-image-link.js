(function() {
    var meta = document.querySelector('meta[name="expand-image"]');
    if (meta && meta.content == 'no') return;

    var expand = function(target) {
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
    };

    document.body.addEventListener('DOMNodeInserted',function(ev){
        expand(ev.target);
    }, false);

    document.body.addEventListener('mouseup',function(ev){
        expand(document.body);
    }, false);
})();