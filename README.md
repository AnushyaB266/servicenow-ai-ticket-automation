## ServiceNow ↔ AI Ticket Auto Assignment & Auto Resolution

Using Machine Learning + Flask REST API + Business Rules

## 1. Objective

Integrate ServiceNow with an AI-based ticket classification and resolution engine so that:

● A user creates an Incident in ServiceNow
● Incident description is sent to an AI REST API
● AI model predicts the correct support team
● Incident is automatically assigned
● Known issues are auto-resolved
● Resolution details are updated in ServiceNow

## 2. Prerequisites

Before starting, ensure:

ServiceNow instance with admin access

Python 3.x installed

Virtual environment configured

Required Python libraries installed:

Flask

scikit-learn

Pandas

Joblib

Historical incident dataset (tickets.csv)

Ngrok installed (for exposing local API)

## 3. AI Model Training (Machine Learning)
Objective

Train an NLP-based model to classify incidents based on description text.

**Steps**

Navigate to project directory

cd C:\ticket_ai_project


Create train_model.py

Model Logic

● Uses TF-IDF Vectorization
● Uses Multinomial Naive Bayes classifier
● Trained on historical ticket descriptions
● Outputs a serialized model (model.pkl)

**Output**
✅ AI model trained and saved as model.pkl

## 4. Flask REST API Creation
Objective

Expose AI model predictions via REST API.

API Details

Framework: Flask

Endpoint: /predict

Method: POST

Input: Incident description

**Output:**

Predicted team

Known issue flag

Resolution text (if available)

Run API
python app.py

**Expected Output**
* Running on http://127.0.0.1:5000
* Debug mode: on

## 5. Known Issue Detection Logic
Purpose

Automatically resolve recurring issues.

**Example Rules**

| Keyword  | Resolution                              |
| -------- | --------------------------------------- |
| password | Reset password from self-service portal |
| vpn      | Restart VPN service                     |
| email    | Clear Outlook cache and restart         |


**If keyword matches:**
● Incident is auto-resolved
● Resolution notes populated

## 6. API Testing (Local)
CURL Test
curl -X POST http://127.0.0.1:5000/predict \
-H "Content-Type: application/json" \
-d "{\"description\":\"Forgot password not able to login\"}"

**Expected Response**
{
  "known_issue": true,
  "resolution": "Reset password from self-service portal",
  "team": "IT Support"
}


Note: Browser access will return Method Not Allowed (POST-only API).

## 7. Expose API Using Ngrok
Command
ngrok http 5000

Generated Endpoint
https://xxxx.ngrok-free.dev/predict


This URL is used by ServiceNow.

## 8. Create Outbound REST Message in ServiceNow
Navigation

System Web Services → Outbound → REST Message → New

REST Message Details

● Name: AI Ticket Router
● Endpoint: Ngrok /predict URL

Save the record.

## 9. Create HTTP Method

Inside REST Message:

● Name: POST_PREDICT
● HTTP Method: POST
● Endpoint: (leave empty – inherited)

## 10. Configure HTTP Headers

| Name         | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |


## 11. Test REST Message (Scripts – Background)

var r = new sn_ws.RESTMessageV2('AI Ticket Router', 'default');
var body = {
  "description": "Forgot password not able to login"
};

r.setRequestBody(JSON.stringify(body));
r.setHttpMethod("POST");

var response = r.execute();
gs.print("Status: " + response.getStatusCode());
gs.print("Response: " + response.getBody());

**Expected Output**
Status: 200
Response:
{
  "known_issue": true,
  "resolution": "Reset password from self-service portal",
  "team": "IT Support"
}

## 12. Assignment Group Configuration

| Team            | Sys ID                           |
| --------------- | -------------------------------- |
| Network Team    | db8ff69383523210710ef796feaad30f |
| Desktop Support | 64cf7e9383523210710ef796feaad39e |
| Messaging Team  | b4bffa9383523210710ef796feaad357 |
| IT Support      | 39af7a9383523210710ef796feaad35a |

## 13. Create Business Rule
Navigation

System Definition → Business Rules → New

Configuration

● Name: AI Auto Assign & Resolve
● Table: Incident
● When: After Insert
● Advanced: ✅

## 14. Business Rule Logic (Server-side)
Core Responsibilities

● Call AI REST API
● Assign ticket based on prediction
● Apply fallback logic
● Auto-resolve known issues
● Update incident state and resolution

Actions Performed

Assignment group set dynamically

Incident resolved automatically for known issues

Resolution notes & close code populated

Fallback assignment if AI response fails

## 15. End-to-End Flow

User creates Incident in ServiceNow

Business Rule triggers

REST API sends description to AI

ML model predicts team

Incident auto-assigned

Known issues auto-resolved

Incident updated in ServiceNow

## 16. Final Outcome

This implementation delivers:

● AI-driven incident classification
● Zero manual assignment for known issues
● Faster Mean Time To Resolution (MTTR)
● Reduced service desk workload
● Scalable enterprise ITSM automation

## 17. Use Cases

Intelligent IT Service Desk

AIOps Automation

ServiceNow AI Integrations

NLP-based Incident Routing

Enterprise AI Workflow Automation

## 18. Future Enhancements

● LLM-based classification (GenAI)
● Confidence score for predictions
● Continuous learning from resolved tickets
● Authentication & security hardening
● Production-grade WSGI deployment

                                                           
