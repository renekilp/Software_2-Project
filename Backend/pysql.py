import mysql.connector
import random
from geopy.distance import geodesic
from colorama import Fore, Back, Style

connection = mysql.connector.connect(
    host="localhost",
    port=3306,
    database="flight_game",
    user="root",
    password="root",
    autocommit=True
)
def query_database(sql,fetchall=True): #Tein täst funktion, niin ei tarvi aina tehä cursor ja execute
    cursor = connection.cursor()
    cursor.execute(sql)

    if fetchall:
        return cursor.fetchall()
    else:
        return cursor.fetchone()

# query_database("SELECT * FROM airport") TestiTesti

def search_large_airports(): # hakee isojen lentokenttien nimet ja sijainnin
    sql = f"SELECT name, ROUND(latitude_deg, 4), ROUND(longitude_deg, 4) FROM airport WHERE type = 'large_airport'"
    airports = query_database(sql) # airports = suoritetaan query_database funktio, joka hakee tietokannasta tiedot annetulla sql muuttujalla

    return airports

def get_random_question():
    question_count = query_database("SELECT COUNT(*) FROM questions")
    random_id = random.randint(1, question_count[0][0])
    sql = f"SELECT question,correct_answer,wrong_answer_1,wrong_answer_2,wrong_answer_3,wrong_answer_4 FROM questions where id = {random_id}"
    query = query_database(sql)
    return query[0]

def new_score(player_name,score): #tallentaa uuden pistemäärän tietokantaan
    sql = f"INSERT INTO high_score(player_name,player_score) values ('{player_name}',{score})"  #
    cursor = connection.cursor()
    cursor.execute(sql)

def random_fly(): #lennättää pelaajan uudelle random lentokentälle
    possible_airports = search_large_airports()
    airport_number = random.randint(0,len(possible_airports)-1)
    user_airport = possible_airports[airport_number]
    return user_airport

def travel_co2(user_airport, airplane_model):
    next_airport = random_fly()
    next_coordinates = [next_airport[1], next_airport[2]]
    current_coordinates = [user_airport[1], user_airport[2]]
    distance = geodesic(next_coordinates, current_coordinates).kilometers
    co2 = 0
    flight_time = 0
    if airplane_model == 2:  # boeing 737
        co2 = distance * 0.0625  # kg per kilometer
        flight_time = distance / 830  # km/h
    elif airplane_model == 1:  # airbus a320
        co2 = distance * 0.061
        flight_time = distance / 845
    elif airplane_model == 3:  # saab ja37 viggen
        co2 = distance * 0.435
        flight_time = distance / 2231
    elif airplane_model == "Matti" or airplane_model == "Peyman":
        co2 = distance * 0.0045
        flight_time = distance / 6

    results = [distance, co2, flight_time, next_airport]
    return results
def top_players(): #hakee top 5 pelaajaa score taulusta
    sql = f"SELECT player_name,player_score FROM high_score ORDER BY player_score DESC LIMIT 5";