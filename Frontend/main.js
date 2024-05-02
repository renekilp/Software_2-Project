import * as fetch from './fetchFuncs';
import * as func from './functionalities';

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
let current_airport = gamesql.random_fly();
let game_going = True;
let airplane_model = '';
let buttonClicked = false;

document.getElementById('quit_button').addEventListener('click', function(event) {
    buttonClicked = true;
});

while (!buttonClicked) {
    const selection1 = confirm('Do you want info of our plane models before choosing?');
    if (selection1 === true) {
        func.plane_info();
    } else {
        break;
    }
    airplane_model = func.planeModel();

    document.getElementById('start_game_button').addEventListener('click', function(event) {
        let questioner = func.quiz();
        let userAnswer = prompt(questioner.question + '\n' + questioner.answers);
        if (userAnswer === questioner.correct_answer) {
            score += 1;
            alert('Correct!')
        } else {
            alert('Incorrect!')
        }
    });
}
