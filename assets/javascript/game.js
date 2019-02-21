// Global scope
let countryName = '';
let response = '';
let globalUnderscoreFormat = '';
let newString = '';
let newStringArray = [];
let underScoreFormat;

const countryData = {
  country: ['argentina', 'canada', 'egypt', 'india', 'italy', 'myanmar', 'south africa',
    'south korea', 'ukraine']
}

const usedCountry = ['argentina', 'canada', 'egypt', 'india', 'italy',];

const responseKeyEvent = [];



// Get random country from countryData object - via country: array index number
const randomCountry = (obj) => {
  let indexNumber = Math.floor(Math.random() * obj.country.length);
  // console.log(indexNumber);

  // Get the value/name of the country
  countryName = obj.country[indexNumber];
  console.log(countryName);

  // Check if the country was already selected
  if (usedCountry.includes(countryName)) {
    // Run the randomCountry function again to get another country
    console.log(`usedCountry ${countryName}`)
    randomCountry(countryData);
  } else {
    console.log('not used');
    // Push country to 'usedCountry array'
    usedCountry.push(countryName);
    // Run formatQuesion function
    globalUnderscoreFormat = formatQuesion(countryName);
  }
};

// Get country's flag image
const countryFlagImage = (countryName) => {
  let imagePath = `assets/images/${countryName}.png`
  console.log(`imagePath: ${imagePath}`);
  document.getElementById('flag-image').src = imagePath;
}

const formatQuesion = (countryName) => {
  // console.log(`test formatQuestion function: ${countryName}`)
  let regex = /([a-z])/g;
  let underscoreFormat = countryName.replace(regex, '_ ');
  // console.log(`format: ${underscoreFormat}`);
  globalUnderscoreFormat = underscoreFormat;
  document.getElementById('question-format').innerHTML = underscoreFormat;

}

// onkeyup event 
document.onkeyup = function (event) {
  let response = (event.key)
  // Check if letter was already selected
  if (responseKeyEvent.includes(response)) {
    console.log(`responseKeyEvent: ${response} already selected`)
  } else
    // push selected letter to responseKeyEvent array
    responseKeyEvent.push(response);
  document.getElementById('letter-selected').innerHTML = response;

  console.log(`Respone global scope: ${responseKeyEvent} ${globalUnderscoreFormat}`)
  checkLetter(response, countryName, newString)


}

// Check if onkeyup letter matches country spelling
const checkLetter = (letter, country, newString) => {
  console.log(`START newStringArray: ${newStringArray}`)
  let str = (newString.length === 0 ? country : str)
  console.log(`str: ${str}`);
  // console.log(`format: ${format}`)
  str = str.split('').map((l) => {
    if (letter === l) {
      return letter;
    } else if (l === ' ') {
      return ' '
    } else {
      return "_ ";
    }
  }).join('');
  // test = newString;
  // newString = str;
  // 

  document.getElementById('question-format').innerHTML = str;
  newStringArray.push(str)
  console.log(`str TEST: ${str}`);
  console.log(`newString TEST: ${newString}`);
  console.log(`END newStringArray: ${newStringArray}`)

}
// const checkLetter = (letter, country, format) => {
//   console.log(`checkLetter function format: ${format}`)
//   // Get index(s) of letter in country
//   let letterIndex = country.split('').map((l) => {
//     console.log(l);
//   })
// }

// let checkLetter = (letter, country, format) => {
//   // let solution = format;
//   console.log(`format: ${format}`)
//   let regex = /(_)/g;
//   solution = country.split('').map((l) => {
//     console.log(`letter: ${l} country: ${country}`);

//     if (l === letter) {

//       let test = l.replace(regex, letter);
//       return test;
//       console.log(`TEST ${test}`)
//     } else if (l === " ") {
//       return "_"
//     } else if (l === "_") {
//       return "_"
//     } else {
//       return "_";
//     }
//   }).join(' ')

//   console.log(`Solution: ${solution}`);
//   // globalUnderscoreFormat = solution;

//   // globalUnderscoreFormat = letterResponse;
//   // console.log(`new solution ${letterResponse}`);
//   console.log(`checkLetter *Global Underscore Format ${globalUnderscoreFormat}`)
//   console.log(`checkLetter *Underscore Format ${format}`)


//   // console.log(`letterResponse ${letterResponse}`)
//   // underscoreFormat = letterResponse
//   // document.getElementById('question-format').innerHTML = underscoreFormat;
//   // underscoreFormat = letterResponse
//   // console.log(`Global underscoreFormat: ${underscoreFormat}`);

// };

randomCountry(countryData);
countryFlagImage(countryName);
// console.log(`countryName Scope: ${countryName}`)
console.log(`Respone global scope: ${responseKeyEvent}`)
console.log(`UnderScore global scope: ${underScoreFormat}`)
console.log(`Global country name ${countryName}`);

console.log(`**Global globalUnderscoreFormat: ${globalUnderscoreFormat}`);
