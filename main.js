var commonWords = [
  "the","of","and","a","to","in","is","you","that","it","he",
  "was","for","on","are","as","with","his","they","I","at","be",
  "this","have","from","or","one","had","by","word","but","not",
  "what","all","were","we","when","your","can","said","there",
  "use","an","each","which","she","do","how","their","if","will",
  "up","other","about","out","many","then","them","these","so",
  "some","her","would","make","like","him","into","time","has",
  "look","two","more","write","go","see","number","no","way",
  "could","people","my","than","first","water","been","call",
  "who","oil","its","now","find","long","down","day","did","get",
  "come","made","may","part"
];

// To filter down to words of min. 3 letters
var newWords = commonWords.filter(item => item.length > 3);

// To select a random word in new array of word
var word = newWords[Math.floor(Math.random()*newWords.length)].split("");

let chancesLeft = 8;
$("#chances").html(chancesLeft)

// set up the _ for each letter of any word
const blank = word.map(n => "_")

  //console.log(word, blank)

document.getElementById('word').innerHTML = blank.join(" ");

// variable with alphatical letters - split in individual strings
const alphabet = "abcdefghijklmnopqrstuwxyz"
const letters = alphabet.split("")

    // console.log(letters)

var alpha = letters.map(l => (
  `
  <button class="letters" value="${l}">${l.toUpperCase()}</button>
  `
)).join('')

document.getElementById('alphabet').innerHTML = alpha


let guessed = []

$("#alphabet").on("click", 'button', function (e) {
  const l = $(this).html();
  $(this).attr('disabled', true);
  guessed.push(l);
  
    //console.log(guessed)

  guess(l.toLowerCase());
})

function guess(l) {
  if (word.includes(l)) {
    word.forEach((letter, i) => {
      if (letter === l) {
        blank[i] = l
      }
    })
    document.getElementById('word').innerHTML = blank.join(" ");

    if (!blank.includes("_")) {
      $("#turns").html(`<h1>You Won!</h1>`)

      $("#start").on("click", function () {
        location.reload()
    })
    }

  } else {
    if (chancesLeft >1) {
      chancesLeft -= 1;
      $("#chances").html(chancesLeft);
      //console.log(chancesLeft, l);
    } else {
      gameOver()
      $("#start").on("click", function () {
        location.reload()
      })
    }
  }
}

function gameOver () {
  $("#game").html(`<h1> HUNG! </h1>`)
  $("#reso").html(`The word was "${word.join("")}"!`)
}