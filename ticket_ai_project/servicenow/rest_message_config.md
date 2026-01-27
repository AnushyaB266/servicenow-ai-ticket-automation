# ServiceNow REST Message Configuration  
## AI Ticket Router

This document describes the **Outbound REST Message configuration** used to integrate
ServiceNow with the **AI-based Ticket Classification & Auto Resolution API**.

---

## 1. REST Message Details

| Field       | Value                                                                            |
|-------------|----------------------------------------------------------------------------------|
| Name        | AI Ticket Router                                                                 |
| Description | Sends incident description to AI service for team prediction and auto-resolution |
| Endpoint    | https://<YOUR_NGROK_URL>/predict                                                 |

-> ⚠️ Replace '<YOUR_NGROK_URL>' with your actual Ngrok endpoint.

---

## 2. HTTP Method Configuration

| Field       | Value                       |
|-------------|-----------------------------|
| Method Name | POST_PREDICT                |
| HTTP Method | POST                        |
| Endpoint    | Inherited from REST Message |

---

## 3. HTTP Headers

| Header Name  | Value            |
|--------------|------------------|
| Content-Type | application/json |

---

## 4. Request Body


{
  "description": "${incident_description}"
}

---

## 5.Sample Request

{
  "description": "Forgot password not able to login"
}

---

## 6.Sample Response (Success)

{
  "team": "IT Support",
  "known_issue": true,
  "resolution": "Reset password from self-service portal"
}

---

## 7.Error Handling

| Scenario         | Behavior                          |
| ---------------- | --------------------------------- |
| API unreachable  | Business Rule fallback assignment |
| Non-200 response | Logged using 'gs.error()'         |
| Invalid response | Incident assigned to IT Support   |

---

## 8.Testing (Scripts – Background)

var r = new sn_ws.RESTMessageV2('AI Ticket Router', 'default');

var body = {
  "description": "Forgot password not able to login"
};

r.setRequestBody(JSON.stringify(body));
r.setHttpMethod("POST");

var response = r.execute();

gs.print("Status: " + response.getStatusCode());
gs.print("Response: " + response.getBody());

---

## 9.Security Notes

->API endpoint exposed using Ngrok

->No credentials stored in code

->Suitable for POC / Demo environments

->For production, replace Ngrok with secured API gateway

---

## 10. Related Components

**Business Rule:** AI Auto Assign & Resolve

**Script Type:** Server-side

**Table:** Incident

**AI Service:** Flask ML API

---

## 11. Outcome

✔ Incident descriptions sent to AI engine
✔ Team predicted automatically
✔ Known issues auto-resolved
✔ Manual assignment effort eliminated



