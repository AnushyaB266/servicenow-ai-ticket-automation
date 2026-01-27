/**
 * Script Name: scripts_background_test.js
 * Purpose    : Test AI Ticket Router REST API from ServiceNow
 * Location   : Scripts - Background
 * Project    : AI-Based Ticket Auto Assignment & Auto Resolution
 */

// Create REST Message object
var r = new sn_ws.RESTMessageV2('AI Ticket Router', 'default');

// Sample incident description
var requestBody = {
    "description": "Forgot password not able to login"
};

// Configure request
r.setHttpMethod("POST");
r.setRequestHeader("Content-Type", "application/json");
r.setRequestBody(JSON.stringify(requestBody));

try {
    // Execute REST call
    var response = r.execute();

    // Log response details
    gs.print("HTTP Status Code: " + response.getStatusCode());
    gs.print("Response Body: " + response.getBody());

} catch (ex) {
    // Log error
    gs.error("AI REST Message Test Failed: " + ex.message);
}
