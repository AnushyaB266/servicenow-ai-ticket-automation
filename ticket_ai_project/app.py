from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

team_model = joblib.load('team_model.pkl')
issue_model = joblib.load('issue_model.pkl')
vectorizer = joblib.load('vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    description = data.get("description", "")

    X = vectorizer.transform([description])
    team = team_model.predict(X)[0]
    known_issue = bool(issue_model.predict(X)[0])

    return jsonify({
        "team": team,
        "known_issue": known_issue,
        "resolution": "Restarted service" if known_issue else ""
    })

if __name__ == "__main__":
    app.run(port=5000)
