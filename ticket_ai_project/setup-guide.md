📂 **File path**


📄 **Content**

# Setup Guide
## AI-Based ServiceNow Ticket Automation

This guide explains how to **set up and run the project end-to-end**
in a local or demo environment.

---

## 🧩 Architecture Overview

Components:
- Python ML model
- Flask REST API
- ServiceNow integration
- Ngrok for exposure

---

## 🛠️ Prerequisites

- Python 3.9+
- ServiceNow Developer Instance
- Ngrok installed
- Basic knowledge of ServiceNow scripting

---

## 🧪 AI Service Setup

### 1️⃣ Create Virtual Environment

python -m venv venv
venv\Scripts\activate

### 2️⃣ Install Dependencies

pip install pandas scikit-learn flask joblib

## 3️⃣ Train Model

python train_model.py

## 4️⃣ Start API

python app.py

## 🌐 Expose API Using Ngrok

ngrok http 5000

Copy HTTPS URL and update ServiceNow REST Message.

## ⚙️ ServiceNow Setup

1.Create Outbound REST Message

2.Configure HTTP Method (POST)

3.Add Business Rule

4.Test via Scripts – Background

5.Create incident to validate automation

## ✅ Validation Checklist

✔ AI API running
✔ Ngrok accessible
✔ REST Message test successful
✔ Incident auto-assigned
✔ Known issues auto-resolved

## 🚀 Production Considerations

->Replace Ngrok with API Gateway

->Add authentication

->Add monitoring and logging



## 
