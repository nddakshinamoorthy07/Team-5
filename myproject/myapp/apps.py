from flask import Flask, render_template, request
import requests

app = Flask(__name__)

API_KEY = '920736660be741819f222646d8eb730d'  # Replace with your actual API key
BASE_URL = 'https://newsapi.org/v2/top-headlines'

@app.route('/', methods=['GET', 'POST'])
def home():
    category = request.form.get('category', 'general')
    country = request.form.get('country', 'us')

    params = {
        'apiKey': API_KEY,
        'country': country,
        'category': category,
        'pageSize': 10,
    }

    response = requests.get(BASE_URL, params=params)
    data = response.json()
    articles = data.get('articles', [])

    return render_template('index.html', articles=articles, selected_category=category, selected_country=country)

if __name__ == '__main__':
    app.run(debug=True)
