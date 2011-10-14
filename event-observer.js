(function(){
    document.body.addEventListener('click', function() {
        chrome.extension.sendRequest({event: "click"}, function(response) {
        });
    }, false);

    chrome.extension.sendRequest({event: "pageload", url: location.href}, function(response) {
    });
})();