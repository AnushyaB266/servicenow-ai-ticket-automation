# Assignment Group SYS IDs  
## ServiceNow – AI Ticket Auto Assignment

This document contains the **ServiceNow Assignment Group SYS IDs** used by the  
**AI Auto Assign & Auto Resolve Business Rule**.

These SYS IDs allow the AI response to map predicted teams directly to
ServiceNow assignment groups.

---

## 📌 Purpose

- Enable **automatic incident assignment**
- Map AI-predicted team names to ServiceNow groups
- Avoid manual routing by service desk agents

---

## 📂 Assignment Groups Mapping

| Team Name (AI Output) | Assignment Group | SYS ID                           |
|-----------------------|------------------|----------------------------------|
| Network Team          | Network          | db8ff69383523210710ef796feaad30f |
| Desktop Support       | Desktop Support  | 64cf7e9383523210710ef796feaad39e |
| Messaging Team        | Messaging Team   |b4bffa9383523210710ef796feaad357  |
| IT Support            | IT Support       | 39af7a9383523210710ef796feaad35a |

---

## 🧠 AI Prediction Mapping Logic

The AI service returns a response in the following format:

{
  "team": "IT Support",
  "known_issue": true,
  "resolution": "Reset password from self-service portal"
}
