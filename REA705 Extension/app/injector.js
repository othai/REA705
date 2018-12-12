var filePath = 'app/injectme.js';

// Creates a new element on the webpage and injects the designated javascript into the element
var script = document.createElement('script');
script.src = chrome.extension.getURL(filePath);
script.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(script);