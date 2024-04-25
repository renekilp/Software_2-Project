import Py_Sql
import Py_Quiz
from flask import Flask, jsonify

app = Flask(__name__)
#approutet kaikille sql hauille

@app.route('/search_lairport')
def search_lairport():
    result = Py_Sql.search_large_airports()
    return jsonify(result)

@app.route('/random_question')
def random_question_route():
    question = Py_Sql.get_random_question()
    return jsonify(question)

@app.route('/new_score/<player_name>/<int:score>')
def new_score_route(player_name, score):
    Py_Sql.new_score(player_name, score)
    return jsonify({'Viesti': 'Score lisätty'})

@app.route('/random_fly')
def random_fly_route():
    airport = Py_Sql.random_fly()
    return jsonify({'airport': airport})

@app.route('/travel_co2/<user_airport>/<airplane_model>')
def travel_co2_route(user_airport, airplane_model):
    result = Py_Sql.travel_co2(user_airport, airplane_model)
    return jsonify(result)

def top_players_route():
    players = Py_Sql.top_players()
    return jsonify(players)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=3000)