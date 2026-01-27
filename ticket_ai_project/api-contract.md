
📄 **Content**

# API Contract
## AI Ticket Classification & Resolution Service

This document defines the **REST API contract** between
ServiceNow and the AI-based ticket automation service.

---

## 🔗 Endpoint Details

| Item         | Value            |
|--------------|------------------|
| Protocol     | HTTP             |
| Method       | POST             |
| Endpoint     | /predict         |
| Content-Type | application/json |

---

## 📥 Request Payload


{
  "description": "Incident short description text"
}

---

## Field Description

| Field       | Type   | Required | Description               |
| ----------- | ------ | -------- | ------------------------- |
| description | String | Yes      | Incident description text |

---

## 📤 Response Payload (Success)

{
  "team": "IT Support",
  "known_issue": true,
  "resolution": "Reset password from self-service portal"
}

---

## Response Fields

| Field       | Type    | Description                 |
| ----------- | ------- | --------------------------- |
| team        | String  | Predicted assignment group  |
| known_issue | Boolean | Known issue detected or not |
| resolution  | String  | Auto-resolution steps       |

---

## ❌ Error Response

{
  "error": "Invalid request or model failure"
}

---

## ⚠️ Error Handling Rules

| Scenario          | Handling                |
| ----------------- | ----------------------- |
| Empty description | Default team assignment |
| API timeout       | Fallback assignment     |
| Invalid response  | Assign to IT Support    |

---

## 🔐 Security Considerations

->API exposed via Ngrok (POC)

->No authentication required (demo)

->Production requires secured gateway

---

## 🔄 Versioning

| Version | Notes                |
| ------- | -------------------- |
| v1      | Initial API contract |


