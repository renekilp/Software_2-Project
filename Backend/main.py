import Backend.pysql as pysql
from flask import Flask, jsonify
from flask_cors import CORS
#pip install flask-cors

app = Flask(__name__)
CORS(app)
#approutet kaikille sql hauille

@app.route('/large_airports')
def large_airports():
    result = pysql.search_large_airports()
    return jsonify(result)

@app.route('/random_question')
def random_question():
    question = pysql.get_random_question()
    response = {
        'question': question[0],
        'correct_answer': question[1],
        'wrong_answer1': question[2],
        'wrong_answer2': question[3],
        'wrong_answer3': question[4],
        'wrong_answer4': question[5],
    }
    return jsonify(response)

@app.route('/addscore/<player_name>/<int:score>')
def add_score(player_name, score):
    pysql.new_score(player_name, score)
    return jsonify({'Viesti': 'Score lisätty'})

@app.route('/random_flight')
def random_flight():
    airport = pysql.random_fly()
    response = {"airport name": airport[0],
                "latitude": airport[1],
                "longitude": airport[2],}
    return jsonify(response)

@app.route('/travel_co2/<user_airport>/<airplane_model>')
def travel_co2_route(user_airport, airplane_model):
    result = pysql.travel_co2(user_airport, airplane_model)
    return jsonify(result)

@app.route('/top_players')
def top_players():
    players = pysql.top_players()
    return jsonify(players)

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=3000)