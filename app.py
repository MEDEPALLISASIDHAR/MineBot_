from flask import Flask, render_template, request, send_from_directory
import joblib
import json
import os

app = Flask(__name__)

# Load the trained model and vectorizer
classifier = joblib.load("classifier.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Load data from JSON file
with open("static/data.json", "r") as file:
    data = json.load(file)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        keyword = request.form['keyword']
    except KeyError:
        return "No keyword provided in the form data.", 400

    # Search for the keyword in questions
    filtered_questions = [q for q in data["questions"] if keyword.lower() in q.lower()]
    if not filtered_questions:
        return "No questions found related to '{}'".format(keyword)

    # Find the index of the first matching question
    question_index = data["questions"].index(filtered_questions[0])

    # Get the corresponding answer
    response = data["answers"][question_index]
    return response

if __name__ == '__main__':
    app.run(debug=True)
