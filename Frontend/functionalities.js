import * as fetch from './fetchFuncs';
function planeModel() {
  while (true) {
    let airplane_model = prompt('Enter airplane model: (1/2/3)');

    if (airplane_model === '1') {
      airplane_model = 'Boeing 737';
      break;
    } else if (airplane_model === '2') {
      airplane_model = 'Airbus A320';
      break;
    } else if (airplane_model === '3') {
      airplane_model = 'Saab JA37 Viggen';
      break;
    } else if (airplane_model === 'Matti' || airplane_model === 'Peyman') {
      airplane_model = 'Matti or Peyman';
      break;
    } else {
      alert('Invalid airplane model. Please try again.');
    }
  }

  console.log('Selected airplane model:', airplane_model);
  return airplane_model;
}

function plane_info() {
  const info = 'Boeing 737:\n' +
      'The Boeing 737 is a popular narrow-body aircraft produced by Boeing Commercial Airplanes.\n' +
      'It is commonly used for short to medium-haul flights and is one of the best-selling commercial jetliners in history.\n' +
      'The Boeing 737 has several variants, each with different seating capacities and range capabilities.\n' +
      'Airbus A320:\n' +
      'The Airbus A320 is a narrow-body airliner developed by Airbus.\n' +
      'It is widely used by airlines around the world for short to medium-haul flights.\n' +
      'Like the Boeing 737, the Airbus A320 has several variants, including the A318, A319, A320, and A321, each with varying seating capacities and range capabilities.\n' +
      'Saab JA37 Viggen:\n' +
      'The Saab JA37 Viggen is not a commercial airliner like the Boeing 737 and Airbus A320. Instead, it is a Swedish single-seat, single-engine, short-medium range combat aircraft.\n' +
      'The Viggen was developed by Saab in the 1960s to replace the aging Saab 35 Draken as the Swedish Air Force\'s primary fighter aircraft.\n' +
      'It features advanced avionics and was designed to perform a variety of roles, including air defense, ground attack, and reconnaissance.';
  console.log(info)
  alert(info)
}

function quiz() {
    const questions = func.question(); //hakee kysymys sanakirjan
    const { question, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3, wrong_answer4 } = questions; //järjestää sanakirjan järkevästi
    const answers = [correct_answer, wrong_answer1, wrong_answer2, wrong_answer3, wrong_answer4]; //tekee listan sekoittamista varten

    // Fisher-Yates shuffle algorithm Kiitos chatGPT
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
  // console logeja debugaamista varten
    console.log("Question:", question);
    console.log("Shuffled Answers:");
    answers.forEach((answer, index) => {
        console.log(`${index + 1}. ${answer}`);
    });

    return {
        question: question,
        answers: answers
    };
}

const quizData = quiz();
console.log(quizData);
