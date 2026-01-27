(function executeRule(current, previous) {

    try {

        // ===============================
        // 1. Call AI REST API
        // ===============================
        var r = new sn_ws.RESTMessageV2();
        r.setEndpoint("https://<YOUR_NGROK_URL>/predict");
        r.setHttpMethod("POST");
        r.setRequestHeader("Content-Type", "application/json");

        var body = {
            "description": current.short_description.toString()
        };

        r.setRequestBody(JSON.stringify(body));

        var response = r.execute();
        var status = response.getStatusCode();

        if (status !== 200) {
            gs.error("AI API failed with status: " + status);
            return;
        }

        var result = JSON.parse(response.getBody());

        // ===============================
        // 2. Assignment Group SYS IDs
        // ===============================
        var NETWORK   = "db8ff69383523210710ef796feaad30f"; // Network Team
        var DESKTOP   = "64cf7e9383523210710ef796feaad39e"; // Desktop Support
        var MESSAGING = "b4bffa9383523210710ef796feaad357"; // Messaging Team
        var ITSUPPORT = "39af7a9383523210710ef796feaad35a"; // IT Support

        // ===============================
        // 3. Auto Assignment from AI
        // ===============================
        if (result.team == "Network Team") {
            current.assignment_group = NETWORK;
        } else if (result.team == "Desktop Support") {
            current.assignment_group = DESKTOP;
        } else if (result.team == "Messaging Team") {
            current.assignment_group = MESSAGING;
        } else {
            current.assignment_group = ITSUPPORT;
        }

        // ===============================
        // 4. Auto Resolution for Known Issues
        // ===============================
        if (result.known_issue === true) {

            current.state = 6; // Resolved
            current.close_notes = result.resolution || "Resolved automatically using AI";
            current.close_code = "Solved (Permanently)";
            current.resolved_by = gs.getUserID();
            current.resolved_at = new GlideDateTime();
        }

        // ===============================
        // 5. Update Incident
        // ===============================
        current.update();

    } catch (e) {
        gs.error("AI Auto Assign & Resolve Error: " + e.message);
    }

})(current, previous);

