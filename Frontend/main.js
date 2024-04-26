async function airports() {
  try { //kokeilee hakea tietoa
    const response = await fetch('http://127.0.0.1:3000/large_airports');
    const data = await response.json();
    console.log(data);
    return data;//palauttaa fetchillä haetut tiedot
  } catch (error) { // keskeyttää jos tapahtuu error
    console.error('Error fetching airports:', error);
    throw error;//lopettaa promisen errorin takia
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

async function add_score(player_name, score) {
  try {
    const url = `http://127.0.0.1:3000/addscore/${player_name}/${score}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
}

async function random_fly() {
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

async function traveling_co2(user_airport, airplane_model) {
  try {
    const url = `http://127.0.0.1:3000/travel_co2/${user_airport}/${airplane_model}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching CO2 data:', error);
    throw error;
  }
}


async function top_players() {
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