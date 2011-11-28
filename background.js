(function() {
    var today = getToday();
    var notification;
    var timer;

    // today's key
    function getToday() {
        return new Date().getDay();
    }
    function resetStorage() {
        localStorage.clear();
    }

    function showBadge(event, url) {
        if (event != 'pageload') {
            return;
        }
        if (!localStorage[event]) {
            localStorage[event] = 0;
        }

        var label = String(++localStorage[event]);
        chrome.browserAction.setBadgeText({
            text: label
        });

    };

    function showNotification(event, url) {
        if (!localStorage[event]) {
            localStorage[event] = 0;
        }
        if (notification) {
            notification.cancel();
        }
        if (timer) {
            clearTimeout(timer);
        }
        var title = "今日の" + event;
        var message = ++localStorage[event] + "回";
        if (event == "pageload") {
            if (!localStorage[url]) {
                localStorage[url] = 0;
            }
            message += ", このページ: " + (++localStorage[url]) + "回";
        }
        notification = webkitNotifications.createNotification(
            'icon48.png',
            title,
            message
        );
        notification.show();

        timer = setTimeout(function() {
            notification.cancel();
            notification = null;
            timer = null;
        }, 2000);
    }

    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            if (today != getToday()) {
                today = getToday();
                resetStorage();
            }
            try {
                if (request.event) {
                    showBadge(request.event);
                    // showNotification(request.event, request.url);
                } else {
                    throw "event is required";
                }
            } catch(error) {
                console.log(error);
            }
            sendResponse({});
        });

    chrome.browserAction.setBadgeBackgroundColor({color: [193, 53, 0, 255]});

})();
