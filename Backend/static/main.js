async function airports() {
  try {
    //kokeilee hakea tietoa
    const response = await fetch('http://127.0.0.1:3000/large_airports');
    const data = await response.json();
    // console.log(data);
    return data; //palauttaa fetchillä haetut tiedot
  } catch (error) {
    // keskeyttää jos tapahtuu error
    console.error('Error fetching airports:', error);
    throw error; //lopettaa promisen errorin takia
  }
}

async function questions() {
  try {
    const response = await fetch('http://127.0.0.1:3000/random_question');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching random question:', error);
    throw error;
  }
}

async function addScore(playerName, score) {
  try {
    const url = `http://127.0.0.1:3000/addscore/${playerName}/${score}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
}

async function randomFly() {
  try {
    const response = await fetch('http://127.0.0.1:3000/random_flight');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching random question:', error);
    throw error;
  }
}

async function travelingCo2(userAirport, airplaneModel) {
  try {
    const url = `http://127.0.0.1:3000/travel_co2/${userAirport}/${airplaneModel}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching CO2 data:', error);
    throw error;
  }
}

async function topPlayers() {
  try {
    const response = await fetch('http://127.0.0.1:3000/top_players');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching random question:', error);
    throw error;
  }
}
// ___________________________________________________________________________________________

function planeModel() {
  while (true) {
    let airplaneModel = prompt('Enter airplane model: (1/2/3)');

    if (airplaneModel === '1') {
      airplaneModel = 'Boeing 737';
      break;
    } else if (airplaneModel === '2') {
      airplaneModel = 'Airbus A320';
      break;
    } else if (airplaneModel === '3') {
      airplaneModel = 'Saab JA37 Viggen';
      break;
    } else if (airplaneModel === 'Matti' || airplaneModel === 'Peyman') {
      airplaneModel = 'Matti or Peyman';
      break;
    } else {
      alert('Invalid airplane model. Please try again.');
    }
  }

  console.log('Selected airplane model:', airplaneModel);
  return airplaneModel;
}

function planeInfo() {
  const info =
    'Boeing 737:\n' +
    'The Boeing 737 is a popular narrow-body aircraft produced by Boeing Commercial Airplanes.\n' +
    'It is commonly used for short to medium-haul flights and is one of the best-selling commercial jetliners in history.\n' +
    'The Boeing 737 has several variants, each with different seating capacities and range capabilities.\n' +
    'Airbus A320:\n' +
    'The Airbus A320 is a narrow-body airliner developed by Airbus.\n' +
    'It is widely used by airlines around the world for short to medium-haul flights.\n' +
    'Like the Boeing 737, the Airbus A320 has several variants, including the A318, A319, A320, and A321, each with varying seating capacities and range capabilities.\n' +
    'Saab JA37 Viggen:\n' +
    'The Saab JA37 Viggen is not a commercial airliner like the Boeing 737 and Airbus A320. Instead, it is a Swedish single-seat, single-engine, short-medium range combat aircraft.\n' +
    "The Viggen was developed by Saab in the 1960s to replace the aging Saab 35 Draken as the Swedish Air Force's primary fighter aircraft.\n" +
    'It features advanced avionics and was designed to perform a variety of roles, including air defense, ground attack, and reconnaissance.';
  console.log(info);
  alert(info);
}

function quiz() {
  const questionsData = questions(); //hakee kysymys sanakirjan
  const {
    question,
    correct_answer,
    wrong_answer1,
    wrong_answer2,
    wrong_answer3,
    wrong_answer4,
  } = questionsData; //järjestää sanakirjan järkevästi
  const answers = [
    correct_answer,
    wrong_answer1,
    wrong_answer2,
    wrong_answer3,
    wrong_answer4,
  ]; //tekee listan sekoittamista varten

  // Fisher-Yates shuffle algorithm Kiitos chatGPT
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  // console logeja debugaamista varten
  console.log('Question:', question);
  console.log('Shuffled Answers:');
  answers.forEach((answer, index) => {
    console.log(`${index + 1}. ${answer}`);
  });

  return {
    question: question,
    answers: answers,
  };
}

// const quizData = quiz();
// console.log(quizData);

// ___________________________________________________________________________________________

// pelin pyöritys
async function runGame() {
  let score = 0;
  let distance = 0;
  let usedTime = 0;
  let co2Used = 0;
  let airportData = await randomFly();
  let currentAirport = airportData['airport name'];
  let currentLatitude = airportData.latitude;
  let currentLongitude = airportData.longitude;

  ` DEBUG
  console.log(currentAirport)
  console.log(currentLatitude)
  console.log(currentLongitude)
  `;
  let quitButtonClicked = false;

  // ALOITUS LENTOKENTÄN KARTTA-PIN näkymä
  const map = L.map('map').setView([currentLatitude, currentLongitude], 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // ALOITUS KENTÄN PINNI KARTTAAN
  L.marker([currentLatitude, currentLongitude])
    .addTo(map)
    .bindPopup(`Starting Airport - ${currentAirport}`)
    .openPopup();

  // ISOJEN KENTTIEN PINNIEN TEKEMINEN - Ei iha wörki
`  const largeAirports = await airports();

  for (let airport of largeAirports) {
    let largeAirportName = airport['airport name'];
    let largeAirportLatitude = airport.latitude;
    let largeAirportLongitude = airport.longitude;

    L.marker([largeAirportLatitude, largeAirportLongitude])
      .addTo(map)
      .bindPopup(largeAirportName)
      .openPopup();
  }`
  // __________________________________________

  document
    .getElementById('quit_button')
    .addEventListener('click', function (event) {
      quitButtonClicked = true;
    });

  while (!quitButtonClicked) {
    const selection1 = confirm(
      'Do you want info of our plane models before choosing?'
    );
    if (selection1 === true) {
      planeInfo();
    } else {
      break;
    }
    const airplaneModel = planeModel();

    document
      .getElementById('start_game_button')
      .addEventListener('click', function (event) {
        airportData = randomFly();
        currentAirport = airportData['airport name'];
        currentAirport = airportData['airport name'];
        currentLatitude = airportData['latitude'];
        currentLongitude = airportData['longitude'];
        let travelData = travelingCo2(currentAirport, airplaneModel);
        distance = distance + travelData.distance;
        co2Used = co2Used + travelData.co2;
        usedTime = distance + travelData.flight_time;
        let questioner = quiz();
        let userAnswer = prompt(
          questioner.question + '\n' + questioner.answers
        );
        if (userAnswer === questioner.correct_answer) {
          score += 1;
          alert('Correct!');
        } else {
          alert('Incorrect!');
        }
      });
    document
      .getElementById('save_score')
      .addEventListener('click', function (event) {
        let name = prompt('What is your username?');
        addScore(name, score);
      });
    document
      .getElementById('top_players')
      .addEventListener('click', function (event) {
        let tPlayers = topPlayers();
        alert(tPlayers);
      });
  }
}

runGame();
