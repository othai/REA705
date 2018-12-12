tabDataObject = {};
objectUpdated = false;

// Class for constructing and storing tab data 
class TabData {
    // var tabId;
    // var scripts;
    // var cookiesRequested;

    constructor(tabId, scripts, cookiesRequested) {
        this.tabId = tabId;
        this.scripts = scripts;
        this.cookiesRequested = cookiesRequested;
    }
}

var doesCookieExist = function(details) {

    for (var i = 0; i < details.requestHeaders.length; i++) {
        // Check if it is a session cookie, ignore if true
        if (details.requestHeaders[i].name.toLowerCase() === "cookie" && (details.requestHeaders[i].value.toLowerCase().includes("session")) || details.requestHeaders[i].value.toLowerCase().includes("sid")) {
            return false;
        }

        // Check if cookie is being set/queried through img src
        // Typically means it is a third-party tracking cookie
        if (details.requestHeaders[i].name.toLowerCase() === "cookie" && details.type.toLowerCase() === "image") {
            return true;
        } 
        // Does not work as a catch-all for first-party cookies...Amazon tracking cookies include the word "ad"
        else if (details.requestHeaders[i].name.toLowerCase() === "cookie") {
            return true;
        }
    }
    return false;

}

var doesScriptExist = function(type) {

    if (type.toLowerCase() === "script") {
        return true;
    }
    return false;

}

// Updating cookies' properties is a two step process where the entire cookie is first removed 
// and then replaced with the new values
/*
var onCookieRemovedListener = function(changeInfo) {
    console.log(changeInfo);
    if (changeInfo.removed) {
        tabDataObject[details.tabId].cookiesRemoved++;
        objectUpdated = true;
    }

    if (objectUpdated) {
        updateTabData();
    }

}
*/

// Creates a new tabDataObject when the listener detects a new tab being created.
var onNewTabCreatedListener = function(newTab) {

    var tabData = new TabData(newTab.id, 0, 0);
    tabDataObject[newTab.id] = tabData;

}

// Function that implements the Chrome API webRequest onBeforeSendHeaders listener. This is used to intercept any
// HTTP headers that are being sent from the browser to the website before it is sent so that may be observed or 
// modified.
var onBeforeSendHeadersListener = function(details) {

    // Google assigns tabId = -1 when opening new tab suggestion page
    // if tabId equals -1, request is not related to tab and ignore request.
    // else parse request and retrieve associated cookies and script urls, if any
    //console.log(details);
    var objectUpdated = false;
    if (details.tabId === -1) {
        //console.log("ignored tab");
        return;
    }

    if (doesCookieExist(details)) {
        //console.log("cookie queried");
        //console.log(details)
        tabDataObject[details.tabId].cookiesRequested++;
        objectUpdated = true;
    } else {
        //console.log("cookie not detected");
        //tabDataObject[details.tabId].cookies += 0;
    }

    if (doesScriptExist(details.type)) {
        //console.log("script detected");
        tabDataObject[details.tabId].scripts++;
        objectUpdated = true;
    } else {
        //console.log("script not detected");
        //tabDataObject[details.tabId].scripts += 0;
    }

    // If the tabDataObject object has been modified, send the tabDataObject to popup.js
    if (objectUpdated) {
        updateTabData();
    }

}

// If the tabDataObject object has been modified, send the tabDataObject to popup.js
var updateTabData = function() {

    chrome.runtime.sendMessage({
        msg: "tabData",
        data: tabDataObject
    });

}

// Listener functions from Chrome API
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestListener, {
    urls: ["*://*/*"]
}, ["requestBody","blocking"]);
chrome.tabs.onCreated.addListener(onNewTabCreatedListener);
//chrome.cookies.onChanged.addListener(onCookieRemovedListener);
chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeadersListener, {
    urls: ["*://*/*"]
}, ["requestHeaders","blocking"]);