async function airports() {
    try {
        //kokeilee hakea tietoa
        const response = await fetch("http://127.0.0.1:3000/large_airports");
        const data = await response.json();
        return data; //palauttaa fetchillä haetut tiedot
    } catch (error) {
        // keskeyttää jos tapahtuu error
        alert("Error fetching airports! Can't connect to the server! :(");
        console.error("Error fetching airports:", error);
        throw error; //lopettaa promisen errorin takia
    }
}

async function questions() {
    try {
        const response = await fetch("http://127.0.0.1:3000/random_question");
         return await response.json();
    } catch (error) {
        alert("Error fetching random questions! Can't connect to the server! :(")
        console.error("Error fetching random question:", error);
        throw error;
    }
}

async function addScore(playerName, score) {
    try {
        const url = `http://127.0.0.1:3000/addscore/${playerName}/${score}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding score:", error);
        throw error;
    }
}

async function randomFly() {
    try {
        const response = await fetch("http://127.0.0.1:3000/random_flight")
        return await response.json();
    } catch (error) {
        alert("Error fetching random question! Can't connect to the server! :(")
        console.error("Error fetching random question:", error);
        throw error;
    }
}

async function travelingCo2(userAirport, airplaneModel) {
    try {
        const url = `http://127.0.0.1:3000/travel_co2/${userAirport.latitude}/${userAirport.longitude}/${airplaneModel}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error fetching CO2 data! Can't connect to the server! :(")
        console.error("Error fetching CO2 data:", error);
        throw error;
    }
}

async function topPlayers() {
    try {
        const response = await fetch("http://127.0.0.1:3000/top_players");
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Error fetching random question! Can't connect to the server! :(")
        console.error("Error fetching random question:", error);
        throw error;
    }
}

// ___________________________________________________________________________________________


function planeInfo() {
    const info =
        "Boeing 737:\n" +
        "The Boeing 737 is a popular narrow-body aircraft produced by Boeing Commercial Airplanes.\n" +
        "It is commonly used for short to medium-haul flights and is one of the best-selling commercial jetliners in history.\n" +
        "The Boeing 737 has several variants, each with different seating capacities and range capabilities.\n" +
        "Airbus A320:\n" +
        "The Airbus A320 is a narrow-body airliner developed by Airbus.\n" +
        "It is widely used by airlines around the world for short to medium-haul flights.\n" +
        "Like the Boeing 737, the Airbus A320 has several variants, including the A318, A319, A320, and A321, each with varying seating capacities and range capabilities.\n" +
        "Saab JA37 Viggen:\n" +
        "The Saab JA37 Viggen is not a commercial airliner like the Boeing 737 and Airbus A320. Instead, it is a Swedish single-seat, single-engine, short-medium range combat aircraft.\n" +
        "The Viggen was developed by Saab in the 1960s to replace the aging Saab 35 Draken as the Swedish Air Force's primary fighter aircraft.\n" +
        "It features advanced avionics and was designed to perform a variety of roles, including air defense, ground attack, and reconnaissance.";
    console.log(info);
    alert(info);
}

async function quiz() {
    const questionsData = await questions(); //hakee kysymys sanakirjan
    const quizElement = document.getElementById("quiz");
    const {
        question,
        correct_answer,
        wrong_answer1,
        wrong_answer2,
        wrong_answer3,
        wrong_answer4,
    } = questionsData; //järjestää sanakirjan järkevästi
    let answers = [
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

    quizElement.innerHTML = `                    <h2 id="question">${question}</h2>
                    <form>
                        <label>
                            <input name="answer" type="radio" value ="${answers[0]}">${answers[0]}</input>
                        </label>
                        <label>
                            <input name="answer" type="radio" value ="${answers[1]}">${answers[1]}</input>
                        </label>
                        <label>   
                            <input name="answer" type="radio" value="${answers[2]}">${answers[2]}</input>
                        </label>
                        <label>
                            <input name="answer" type="radio" value="${answers[3]}">${answers[3]}</input>
                        </label>
                        <label>
                            <input name="answer" type="radio" value="${answers[4]}">${answers[4]}</input>
                        </label>   
                        <input type="submit" value="submit answer"></input>
                    </form>`

    quizElement.style.display = "block"

    let form = quizElement.getElementsByTagName("form")[0]
    return new Promise((resolve) => {
        form.addEventListener("submit", function (evt) {
            evt.preventDefault()

            resolve(form["answer"].value === correct_answer)


        })
    })
}
// ___________________________________________________________________________________________

// pelin pyöritys
async function runGame() {
    let score = 0;
    let distance = 0;
    let usedTime = 0;
    let co2Used = 0;
    let currentAirport = await randomFly();
    //let currentAirport = airportData["airport name"];
    const planeModel = document.getElementById("planeModel").textContent
    document.getElementById("currentAirport").textContent = currentAirport["airport name"]
    // ALOITUS LENTOKENTÄN KARTTA-PIN näkymä
    const map = L.map("map").setView([currentAirport.latitude, currentAirport.longitude], 12);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // ALOITUS KENTÄN PINNI KARTTAAN
    L.marker([currentAirport.latitude, currentAirport.longitude])
        .addTo(map)
        .bindPopup(`Starting Airport - ${currentAirport["airport name"]}`)
        .openPopup();
    /*
      // ISOJEN KENTTIEN PINNIEN TEKEMINEN - Ei iha wörki
      const largeAirports = await airports();

      for (let airport of largeAirports) {
        let largeAirportName = airport["airport name"];
        let largeAirportLatitude = airport["latitude"];
        let largeAirportLongitude = airport["longitude"];
        L.marker([largeAirportLatitude, largeAirportLongitude])
          .addTo(map)
          .bindPopup(largeAirportName)
          .openPopup();
      }
      map.setView([currentLatitude, currentLongitude], 12);
      // __________________________________________

      document
        .getElementById("quit_button")
        .addEventListener("click", function (event) {
          quitButtonClicked = true;
        });

      */

while(true){

    if(await quiz()){ // quiz return true if answered correctly
        score++
        let traveldata =  await travelingCo2(currentAirport,planeModel)
        distance = distance + traveldata["distance"]
        usedTime = usedTime + traveldata["flight_time"]
        co2Used = co2Used + traveldata["co2"]
        currentAirport = traveldata["next_airport"]
        statUpdate(distance,co2Used,usedTime,currentAirport,score) //updates stats


        //updates current location to map
        L.marker([currentAirport.latitude, currentAirport.longitude])
        .addTo(map)
        .bindPopup(`current airport - ${currentAirport["airport_name"]}`)
        .openPopup();


    }
    else{
        document.getElementById("quiz").style.display = "none" //hides quiz when answer was incorrect
        document.getElementById("quitScreen").style.display = "block"
        endstats(distance,co2Used,usedTime,score)
        document.getElementById("saveScore").addEventListener("click", function() {
            addScore(document.getElementById("playerName").textContent,score)
            window.location.reload()
        })
        document.getElementById("retryButton").addEventListener("click",function(){
            window.location.reload()
        })
        break
    }
}


}

// ----- Tutorial popup soosit --------

let popup = document.getElementById("helppop");

function openPopup() {
    popup.classList.add("open-helppop");
}

function closePopup() {
    popup.classList.remove("open-helppop");
}

// PELIN START NAPPI
const gameStartWindow = document.getElementById("startButton");
const gameStartButton = document.getElementById("startGame");

window.onload = function () {
    //start nappulan ikkuna
    gameStartWindow.style.display = "block";
};

gameStartButton.onclick = function () {
    // starttinappulan jälkeen display none
    gameStartWindow.style.display = "none";

    function capitalize(str) { // funktio että voi saada ekan kirjaimen isoksi
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    // sit kysytään nimi, tsekataan että se ei ole tyhjä, ja että jotain on syötetty
    let name = prompt("What is your username?");
    while (name == null || name.trim() === "") {
        name = prompt("Please enter a valid username:");
    }
    name = capitalize(name);
    console.log("Welcome, " + name + "!");
    document.querySelector("#playerName").textContent = name;

     //Startin ja nimen jälkeen alotetaan peli
};

//plane model selection
buttons = [document.getElementById("model1"), document.getElementById("model2"), document.getElementById("model3")]
buttons.forEach((button) => button.addEventListener("click", planeselection))

function planeselection(evt) {
    document.getElementById("modelChoice").style.display = "none";
    const planediv = document.getElementById("planeModel");
    const button = evt.target
    if (button.value === "1") {
        planediv.textContent = "Boeing 737";

    }
    if (button.value === "2") {
        planediv.textContent = "Airbus A320";
    }
    if (button.value === "3") {
        planediv.textContent = "Saab JA37 Viggen";

        /* } else if (button.value === "Matti" || airplaneModel === "Peyman") {
             airplaneModel = "Matti or Peyman";
             break;*/
    }
    runGame()
}


function statUpdate(distance,co2,time,current_airport,score){
    document.getElementById("distance").textContent = distance.toFixed(2) + " km"
    document.getElementById("co2").textContent = co2.toFixed(2) + " kg"
    document.getElementById("time").textContent = time.toFixed(2) + " h"
    document.getElementById("currentAirport").textContent = current_airport["airport_name"]
    document.getElementById("points").textContent = score
}

function endstats(distance,co2,time,score){
    document.getElementById("enddistance").textContent = distance.toFixed(2) + " km"
    document.getElementById("endco2").textContent = co2.toFixed(2) + " kg"
    document.getElementById("endtime").textContent = time.toFixed(2) + " h"

    document.getElementById("endpoints").textContent = score
}
