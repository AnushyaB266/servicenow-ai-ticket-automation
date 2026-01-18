import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.read_csv('data.csv')

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(data['short_description'])

team_model = RandomForestClassifier()
team_model.fit(X, data['team'])

issue_model = RandomForestClassifier()
issue_model.fit(X, data['known_issue'])

joblib.dump(team_model, 'team_model.pkl')
joblib.dump(issue_model, 'issue_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')

print("Model training completed")
