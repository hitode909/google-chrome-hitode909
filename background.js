(function() {
    var counts = {};
    var today = null;

    // today's key
    function getToday() {
        return Math.floor(Date.now() / (60*60*24*1000));
    }
    function resetCounts() {
        counts = {};
    }

    function showNotification(event) {
        if (!counts[event]) {
            counts[event] = 0;
        }
        var notification = webkitNotifications.createNotification(
            'icon48.png',
            "今日の" + event,
            ++counts[event] + "回"
        );
        notification.show();

        setTimeout(function() {
            notification.cancel();
        }, 2000);
    }

    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            if (today != getToday()) {
                today = getToday();
                resetCounts();
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
