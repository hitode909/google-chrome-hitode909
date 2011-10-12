(function() {
    var today = null;
    var notification;
    var timer;

    // today's key
    function getToday() {
        return new Date().getDay();
    }
    function resetStorage() {
        localStorage.clear();
    }

    function showNotification(event) {
        if (!localStorage[event]) {
            localStorage[event] = 0;
        }
        if (notification) {
            notification.cancel();
        }
        if (timer) {
            clearTimeout(timer);
        }
        notification = webkitNotifications.createNotification(
            'icon48.png',
            "今日の" + event,
            ++localStorage[event] + "回"
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
                    showNotification(request.event);
                } else {
                    throw "event is required";
                }
            } catch(error) {
                console.log(error);
            }
            sendResponse({});
        });
})();
