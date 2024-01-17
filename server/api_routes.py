from flask import Flask, jsonify
from flask_cors import CORS
from covid import Covid

app = Flask(__name__)
cors = CORS(app)
covid = Covid(source='worldometers')

@app.route('/getcoviddataworld', methods=['GET'])
def covid_data_world():
    world_data = covid.get_status_by_country_name("World")
    response = jsonify(world_data)
    return response

@app.route('/getcoviddatabycountry/<string:country>', methods=['GET'])
def covid_data_by_country(country: str):
    country_data = covid.get_status_by_country_name(country)
    print(country_data)
    return jsonify(country_data)

if __name__ == "__main__":
    app.run(debug=True)