var newFontFamily = "";
var re1 = new RegExp("^.*times new roman.*$");
var re2 = new RegExp("^.*arial.*$");
var re3 = new RegExp("^.*consolas.*$");

// Looping function that checks every object returned by the MutationObserver listener and calls the font checking function.
var observer = new MutationObserver(function(mutations) {

    mutations.forEach(function(mutation) {
        //console.log(mutation);
        checkCurrentFontFamily(mutation);
    });

});

// Function to check if the webpage has modified the font family in the browser that is not one of the default Chrome fonts.
var checkCurrentFontFamily = function(mutation) {
    
    if (mutation.addedNodes.length > 0) {
        if (mutation.__proto__.constructor.name == "MutationRecord") {
            for (node of mutation.addedNodes) {
                if (node.firstElementChild) {
                    if (node.firstElementChild.style && node.firstElementChild.style.fontFamily != "") {
                        newFontFamily = node.firstElementChild.style.fontFamily;
                        if (!re1.test(newFontFamily.toLowerCase()) || !re2.test(newFontFamily.toLowerCase()) || !re3.test(newFontFamily.toLowerCase())) {
                            console.log("Detected font change to " + newFontFamily);
                        }
                    }
                }
            }
        }
    }

}

// MutationObserver listener object
observer.observe(document, { attributes: true, childList: true, subtree: true });
