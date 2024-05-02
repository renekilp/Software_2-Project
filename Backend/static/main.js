import * as fetch from '../templates/fetchFuncs';
import * as func from '../templates/functionalities';

// LEAFLET MÄPPI KOODI
const map = L.map('map').setView([60.223831106748996, 24.758107289511884], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([60.223831106748996, 24.758107289511884]).
    addTo(map).
    bindPopup('KARAMALMI JAUUUU').
    openPopup();
// -----

// pelin pyöritys
let score = 0;
let distance = 0;
let used_time = 0;
let co2_used = 0;
let airportData = fetch.random_fly();
let current_airport = airportData['airport name'];
let current_latitude = airportData['latitude'];
let current_longitude = airportData['longitude'];
let QuitbuttonClicked = false;

document.getElementById('quit_button').
    addEventListener('click', function(event) {
      QuitbuttonClicked = true;
    });

while (!QuitbuttonClicked) {
  const selection1 = confirm(
      'Do you want info of our plane models before choosing?');
  if (selection1 === true) {
    func.plane_info();
  } else {
    break;
  }
  const airplane_model = func.planeModel();

  document.getElementById('start_game_button').
      addEventListener('click', function(event) {
        airportData = fetch.random_fly();
        current_airport = airportData['airport name'];
        current_airport = airportData['airport name'];
        current_latitude = airportData['latitude'];
        current_longitude = airportData['longitude'];
        let travelData = fetch.traveling_co2(current_airport, airplane_model);
        distance = distance + travelData.distance;
        co2_used = co2_used + travelData.co2;
        used_time = distance + travelData.flight_time;
        let questioner = func.quiz();
        let userAnswer = prompt(
            questioner.question + '\n' + questioner.answers);
        if (userAnswer === questioner.correct_answer) {
          score += 1;
          alert('Correct!');
        } else {
          alert('Incorrect!');
        }
      });
  document.getElementById('save_score').
      addEventListener('click', function(event) {
        let name = prompt('What is your username?');
        fetch.add_score(name, score);
      });
  document.getElementById('top_players').
      addEventListener('click', function(event) {
        let tPlayers = fetch.top_players();
        alert(tPlayers);
      });
}
