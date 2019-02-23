// Global scope
let countryName = '';
let response = '';
let globalUnderscoreFormat = '';
let underScoreFormat;
let countryArray = [];
let formatArray = []
let wrongGussesAllowed = 7;
let usedCountry = [];

let responseKeyEvent = [];
let wrongRepsonseKeyEventArray = [];
let wrongRepsonseQuessCount = 0;

let questions = 5;
let questionsCount = 0;
let questionsRight = 0;
let questionsWrong = 0;
let totalQuestions = questionsRight + questionsWrong;

const countryData = {
  country: ['argentina', 'canada', 'egypt', 'india', 'italy', 'myanmar', 'south africa',
    'south korea', 'ukraine'],
  guessFormat: 'empty'
}


// Initial website setup content

document.getElementById('score-correct').innerHTML = 0;
document.getElementById('score-question-count').innerHTML = questionsCount;

// Get random country from countryData object - via country: array index number
const randomCountry = (obj) => {

  console.log(`** Global questionsCount: ${questionsCount}`);
  if (questionsCount > 5) {
    console.log(`***stop this program***`)
    // Stop the questions when allocated questions are met;
    endQuestion();
  }
  let indexNumber = Math.floor(Math.random() * obj.country.length);

  // Get the value/name of the country
  countryName = obj.country[indexNumber];
  console.log(countryName);

  // Check if the country was already selected
  if (usedCountry.includes(countryName)) {
    // Run the randomCountry function again to get another country
    randomCountry(countryData);
  } else {
    //  Reset wrong guess count and incorrect letters array
    wrongRepsonseKeyEventArray = [];
    wrongGussesAllowed = 7;
    document.getElementById("guesses-allowed").innerHTML = wrongGussesAllowed;
    document.getElementById("incorrect-letters").innerHTML = wrongRepsonseKeyEventArray;

    console.log('not used');
    // Push country to 'usedCountry array'
    usedCountry.push(countryName);
    // Push country into the 'countryArray;
    createCountryArray(countryName);
    // Run formatQuesion function
    globalUnderscoreFormat = formatQuesion(countryName);
  }
};

// Get country's flag image
const countryFlagImage = (countryName) => {
  let imagePath = `assets/images/${countryName}.png`
  document.getElementById('flag-image').src = imagePath;
}

const formatQuesion = (countryName) => {
  // console.log(`test formatQuestion function: ${countryName}`)
  let regex = /([a-z])/g;
  let underscoreFormat = countryName.replace(regex, '_');
  let initialUnderscoreFormat = countryName.replace(regex, '_ ');

  globalUnderscoreFormat = underscoreFormat;
  formatArray = [...underscoreFormat];

  // document.getElementById('question-format').innerHTML = underscoreFormat;
  document.getElementById('question-format').innerHTML = initialUnderscoreFormat;
}

// Put country name into separate array
const createCountryArray = (countryName) => {
  countryArray = [...countryName]
}

// Wrap onkeyup event in funciton
const onKeyUpFunction = () => {
  // onkeyup event 
  document.onkeyup = function (event) {
    let response = (event.key)
    // Check if letter was already selected
    if (responseKeyEvent.includes(response)) {
      // console.log(`responseKeyEvent: ${response} already selected`)
    } else {
      // push selected letter to responseKeyEvent array
      responseKeyEvent.push(response);
      document.getElementById('letter-selected').innerHTML = response;
    }

    checkLetter(response, countryName, countryData.guessFormat, countryArray, formatArray);
    checkResponse(formatArray, countryArray, countryName)
  }
};

const checkLetter = (letter, country, format, countryArray, formatArray) => {
  // Check the wrongGuessesAllowed Count - invoke checkResponse
  if (wrongGussesAllowed === 0) {
    console.log(`checkLetter function - questionsWrong: ${questionsWrong}`);
    questionsWrong += 1;
    document.getElementById('score-wrong').innerHTML = questionsWrong;
    // Start next question
    startQuestions();
  } else {

    // Compare letter selected against country name
    for (let i = 0; i < countryArray.length; i++) {
      if (letter === countryArray[i]) {
        formatArray.splice(i, 1, letter)
        globalUnderscoreFormat = formatArray.join('');
        globalUnderscoreFormat = globalUnderscoreFormat.split('').join(' ');
        document.getElementById('question-format').innerHTML = globalUnderscoreFormat;

      } else if (responseKeyEvent.includes(letter) && !countryArray.includes(letter) && !wrongRepsonseKeyEventArray.includes(letter)) {
        // If incorrect guess 
        // Check if letter was already used and check if letter is incorrect
        // Increase wrongRepsonseQuessCount by one and push letter to wrongResponseKeyEventArray array
        wrongRepsonseKeyEventArray.push(letter);
        // wrongRepsonseQuessCount = wrongRepsonseQuessCount + 1;
        document.getElementById('guesses-allowed').innerHTML = (wrongGussesAllowed -= 1);
        lettersList(wrongRepsonseKeyEventArray);
      } else {
        // undecided
      }

      // console.log(`***checkLetterTwo responseKeyEvent: ${responseKeyEvent} && wrongRepsonseKeyEventArray: ${wrongRepsonseKeyEventArray}`)

    };
  }
}

// List all the incorrect letter(s) to website
const lettersList = (wrongRepsonseKeyEventArray) => {
  let letters = wrongRepsonseKeyEventArray.join(', ');

  // console.log(`letters: ${letters}`);
  document.getElementById('incorrect-letters').innerHTML = letters
}


// Add validations and check conditions for correct answer
const checkResponse = (formatArray, countryArray, countryName) => {
  // Check if answer is correct
  checkAnswer = formatArray.join('');
  if (countryName === checkAnswer) {

    // If correct increase correct score by one and update scoreboard
    console.log(`This country array and format array match ${countryArray}:${formatArray}`)
    questionsRight += 1;
    document.getElementById('score-correct').innerHTML = questionsRight;

    // start next quiz
    startQuestions();
  } else {
    console.log('no match')
  }
}

// Functions for start app
const startQuestions = () => {
  questionsCount += 1;
  document.getElementById("score-question-count").innerHTML = questionsCount;
  randomCountry(countryData);
  countryFlagImage(countryName);
  onKeyUpFunction();
}


const endQuestion = () => {
  console.log(`endQuesiton Function is invoked`)
  document.getElementById("display").remove();
  document.getElementById("game").remove();

  document.getElementById('user-message').innerHTML = "You completed the five quesitons"
  console.log(`** Global questionsCount: ${questionsCount}`);
  console.log('DONE');


}

// Start app - IIFE 

const startApp = (questionsCount) => {
  if (questionsCount > 5) {
    console.log(`** Global questionsCount: ${questionsCount}`);
    document.getElementById('question-format').innerHTML = '';
    document.getElementById('flag-image') = '';
    document.getElementById('user-message').innerHTML = "You completed the five quesitons"
    endQuestions();

  } else {
    console.log(`**Check Question Count`);
    startQuestions();
  }
};

startApp(questionsCount);
console.log(`** Global globalUnderscoreFormat: ${globalUnderscoreFormat}`);
console.log(`** Global questionsCount: ${questionsCount}`);

