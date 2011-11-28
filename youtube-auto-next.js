(function() {
    function selectRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    };

    function jumpNextMovie() {
        var nextItem = selectRandom(document.querySelectorAll('.video-list-item a'));
        location.href = nextItem.href;
    };

    var video = document.querySelector('embed#movie_player');
    if (!video) return;

    var timer = setInterval(function() {
        var state = video.getPlayerState();
        if (state != 0) return;

        jumpNextMovie();
        clearInterval(timer);
    }, 1000);

    var button = document.createElement('button');
    button.textContent = 'Skip';
    button.className = 'yt-uix-button';
    document.querySelector('#watch-actions').appendChild(button);
    button.addEventListener('click', function() {
        jumpNextMovie();
    });
})();