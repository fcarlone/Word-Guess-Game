// Global scope
let countryName = '';
let response = '';
let globalUnderscoreFormat = '';
let newString = '';
let newStringArray = [];
let underScoreFormat;
let countryArray = [];
let formatArray = []

const countryData = {
  country: ['argentina', 'canada', 'egypt', 'india', 'italy', 'myanmar', 'south africa',
    'south korea', 'ukraine'],
  guessFormat: 'empty'
}

const usedCountry = ['egypt', 'india', 'italy',];
const responseKeyEvent = [];

// Get random country from countryData object - via country: array index number
const randomCountry = (obj) => {
  let indexNumber = Math.floor(Math.random() * obj.country.length);

  // Get the value/name of the country
  countryName = obj.country[indexNumber];
  console.log(countryName);

  // Check if the country was already selected
  if (usedCountry.includes(countryName)) {
    // Run the randomCountry function again to get another country
    randomCountry(countryData);
  } else {
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
  console.log(`formatQuestion: formatArray: ${formatArray.length}`);

  // document.getElementById('question-format').innerHTML = underscoreFormat;
  document.getElementById('question-format').innerHTML = initialUnderscoreFormat;
}

// Put country name into separate array
const createCountryArray = (countryName) => {
  countryArray = [...countryName]
}

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
  // console.log(`Respone global scope: ${responseKeyEvent} ${globalUnderscoreFormat} ${countryData.guessFormat}`)
  // checkLetter(response, countryName, countryData.guessFormat);
  checkLetterTwo(response, countryName, countryData.guessFormat, countryArray, formatArray);
}

const checkLetterTwo = (letter, country, format, countryArray, formatArray) => {
  for (let i = 0; i < countryArray.length; i++) {
    if (letter === countryArray[i]) {
      console.log(`checkLetterTwo letter:${letter} indexNumber = ${i}`)
      formatArray.splice(i, 1, letter)

      console.log(`** Global globalUnderscoreFormat: ${globalUnderscoreFormat}`);
      globalUnderscoreFormat = formatArray.join('');
      console.log(`** Global globalUnderscoreFormat: ${globalUnderscoreFormat}`);
      globalUnderscoreFormat = globalUnderscoreFormat.split('').join(' ');
      console.log(`** Global globalUnderscoreFormat: ${globalUnderscoreFormat}`);
      document.getElementById('question-format').innerHTML = globalUnderscoreFormat;
    }
  };
  console.log(`checkLetterTwo countryArray: ${countryArray.length}`)
  console.log(`checkLetterTwo countryArray: ${countryArray}`)
  console.log(`checkLetterTwo formatArray: ${formatArray.length}`)
  console.log(`checkLetterTwo formatArray: ${formatArray}`)

}

randomCountry(countryData);
countryFlagImage(countryName);
console.log(`** Global globalUnderscoreFormat: ${globalUnderscoreFormat}`);

