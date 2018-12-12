var windowObject = window;
var navigatorObject = window.navigator;

// This function will bind the get method of Object.defineProperty javascript function in order to figure out when 
// the webpage attempts to access that property. In this case, a common method of fingerprinting the user is by accessing
// the window property present in all modern browsers. When a property is accessed, it will execute the code within the
// get function.
var assignPropertyBindings = function() {

    var cookieEnabled = window.navigator.cookieEnabled;
    var userAgent = window.navigator.userAgent.toLowerCase();
    var screen = window.screen;
    var javaEnabled = window.navigator.javaEnabled;
    var language = window.navigator.language;
    var platform = window.navigator.platform.toLowerCase();

    // Bind to screen property
    Object.defineProperty(windowObject, 'screen', {
        get: function() {
            console.log("window.screen property accessed.");
            return screen;
        }.bind(this)
    });

    // Bind to cookieEnabled property
    Object.defineProperty(navigatorObject, 'cookieEnabled', {
        get: function() {
            console.log("navigator.cookieEnabled property accessed.");
            return cookieEnabled;
        }.bind(this)
    });

    // Bind to userAgent property
    Object.defineProperty(navigatorObject, 'userAgent', {
        get: function() {
            console.log("navigator.userAgent property accessed.");
            return userAgent;
        }.bind(this)
    });

    // Bind to javaEnabled property
    Object.defineProperty(navigatorObject, 'javaEnabled', {
        get: function() {
            console.log("navigator.javaEnabled property accessed.");
            return javaEnabled;
        }.bind(this)
    });

    Object.defineProperty(navigatorObject, 'language', {
        get: function() {
            console.log("navigator.language property accessed.");
            return language;
        }.bind(this)
    });

    Object.defineProperty(navigatorObject, 'platform', {
        get: function() {
            console.log("navigator.platform property accessed.");
            return platform;
        }.bind(this)
    });
    
}

assignPropertyBindings();