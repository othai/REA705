// Retrieves all HTML elements that contain the "input" tag and checks for email, username, or password fields.
var inputCollection = document.getElementsByTagName("input");

for (var elements of inputCollection) {

    if (elements.id.toLowerCase().includes("email") || elements.name.toLowerCase().includes("email") || elements.type.toLowerCase() === "email") {
        console.log("Email input field detected.");
    }
    
    if (elements.id.toLowerCase().includes("username") || elements.name.toLowerCase().includes("username") || elements.type.toLowerCase() === "username") {
        console.log("Username input field detected.");
    } 
    
    if (elements.id.toLowerCase().includes("password") || elements.name.toLowerCase().includes("password") || elements.type.toLowerCase() === "password") {
        console.log("Password input field detected.");
    }
}
