var tabDataObject = {};

// Messaging function that listens for specific messages and executes a callback function that calls another function to
// render and update popup.html with new values.
var getCurrentTabID = function () {
    chrome.tabs.query(
        { currentWindow: true, active: true
    },
        function (tabArray) {
            initializeRenderers(tabArray[0].id);
        }
    )
}

var initializeRenderers = function (tabID) {
    renderNumOfScripts(tabID);
    renderNumOfCookiesRequested(tabID);
}

// Retrieve number of scripts run on the page from the tabDataObject
var renderNumOfScripts = function (tabID) {
    var numOfScripts = tabDataObject[tabID].scripts;
    document.getElementById("scriptsCounter").innerHTML = numOfScripts;
}

// Retrieve number of cookies queried on the page from the tabDataObject
var renderNumOfCookiesRequested = function (tabID) {
    var numOfCookiesRequested = tabDataObject[tabID].cookiesRequested;
    document.getElementById("cookiesRequestedCounter").innerHTML = numOfCookiesRequested;
}

// Create message listener function
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.msg === "tabData") {
            tabDataObject = request.data;
            getCurrentTabID();
        }
    }
);