import Backend.pysql as pysql
import Backend.pyquiz as pyquiz
from flask import Flask, jsonify

app = Flask(__name__)
#approutet kaikille sql hauille

@app.route('/large_airports')
def large_airports():
    result = pysql.search_large_airports()
    return jsonify(result)

@app.route('/random_question')
def random_question():
    question = pysql.get_random_question()
    return jsonify(question)

@app.route('/addscore/<player_name>/<int:score>')
def add_score(player_name, score):
    pysql.new_score(player_name, score)
    return jsonify({'Viesti': 'Score lisätty'})

@app.route('/random_flight')
def random_flight():
    airport = pysql.random_fly()
    return jsonify({'airport': airport})

@app.route('/travel_co2/<user_airport>/<airplane_model>')
def travel_co2_route(user_airport, airplane_model):
    result = pysql.travel_co2(user_airport, airplane_model)
    return jsonify(result)

def top_players_route():
    players = pysql.top_players()
    return jsonify(players)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=3000)