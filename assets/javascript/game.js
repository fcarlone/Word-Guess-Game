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
let questionsLeft = 5;
let questionsCount = 0;
let questionsRight = 0;
let questionsWrong = 0;

const countryData = {
  country: ['argentina', 'canada', 'egypt', 'india', 'italy', 'myanmar', 'south africa',
    'south korea', 'ukraine'],
  guessFormat: 'empty'
}


// Initial website content
document.getElementById('score-correct').innerHTML = 0;
document.getElementById('score-wrong').innerHTML = 0;
document.getElementById('score-question-left').innerHTML = questions;
document.getElementById('score-question-count').innerHTML = questionsCount;
let toggleReplayGameButton = document.getElementById('replay-game-button');


// Get random country from countryData object - via country: array index number
const randomCountry = (obj) => {
  if (questionsCount > 5) {
    // Stop the questions when allocated questions are met;
    return endQuestion();
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
    // Reset wrong guess count and incorrect letters array
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
    let response = (event.key).toLocaleLowerCase();
    // Check if letter was already selected
    if (responseKeyEvent.includes(response)) {
      // console.log(`responseKeyEvent: ${response} already selected`)
    } else {
      // push selected letter to responseKeyEvent array
      responseKeyEvent.push(response);
      document.getElementById('letter-selected').innerHTML = response;
    }
    checkLetter(response, countryArray, formatArray);
    checkResponse(formatArray, countryArray, countryName)
  }
};

const checkLetter = (letter, countryArray, formatArray) => {
  // Check the wrongGuessesAllowed Count - invoke checkResponse
  if (wrongGussesAllowed === 0) {
    questionsWrong += 1;
    document.getElementById('score-wrong').innerHTML = questionsWrong;
    // Reduce questionsLeft count by one
    questionsLeft -= 1;
    document.getElementById("score-question-left").innerHTML = questionsLeft;
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
        // Reduce wrongRepsonseQuessCount by one and push letter to wrongResponseKeyEventArray array
        wrongRepsonseKeyEventArray.push(letter);
        document.getElementById('guesses-allowed').innerHTML = (wrongGussesAllowed -= 1);
        lettersList(wrongRepsonseKeyEventArray);
      } else {
        // undecided
      }
    };
  }
};

// List all the incorrect letter(s) to website
const lettersList = (wrongRepsonseKeyEventArray) => {
  let letters = wrongRepsonseKeyEventArray.join(', ').toUpperCase();
  document.getElementById('incorrect-letters').innerHTML = letters
};


// Add validations and check conditions for correct answer
const checkResponse = (formatArray, countryArray, countryName) => {
  // Check if answer is correct
  checkAnswer = formatArray.join('');
  if (countryName === checkAnswer) {
    // If correct increase correct score by one and update scoreboard
    console.log(`This country array and format array match ${countryArray}:${formatArray}`)
    questionsRight += 1;
    document.getElementById('score-correct').innerHTML = questionsRight;
    // Reduce questionsLeft count by one
    console.log(`checkResponse - check questions left count questions: ${questions} - questionsCount: ${questionsCount}`)
    questionsLeft -= 1;
    document.getElementById("score-question-left").innerHTML = questionsLeft;
    // start next quiz
    startQuestions();
  } else {
    console.log('no match')
  }
};

// Functions for start app
const startQuestions = () => {
  questionsCount += 1;
  document.getElementById("score-question-count").innerHTML = questionsCount;
  // Check questionsCount before invoking functions
  if (questionsCount > 5) {
    endQuestion();
  } else if (questionsCount <= 5) {
    randomCountry(countryData);
    countryFlagImage(countryName);
    onKeyUpFunction();
  }
};

const endQuestion = () => {
  console.log(`endQuesiton Function is invoked`)
  displayReplayGameButton();
  // Disable keys when game is completed
  document.onkeyup = function (event) {
    return false;
  };
  document.getElementById("display").remove();
  document.getElementById("game").remove();
  document.getElementById("user-message").innerHTML = `You completed the quiz.  Check out your score.`
};

// Repaly game
const replayGame = () => {
  location.reload();
};

// Display Repaly Game Button
const displayReplayGameButton = () => {
  console.log(`displayReplayGameButton invoked`)
  toggleReplayGameButton.style.display = "block"
};

// Start app - IIFE 
const startApp = (questionsCount) => {
  if (questionsCount > 5) {
    endQuestions();
  } else {
    // Hide replay game button until quiz is completed.
    toggleReplayGameButton.style.display = "none"
    startQuestions();
  }
};

startApp(questionsCount);


