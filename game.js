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

// function getRandomWord(wordsList) {
//     let len = wordsList.length;
//     let randomIndex = Math.floor(Math.random() * len)
//     console.log(randomIndex)
//     let currentWord = wordsList[randomIndex]
//     console.log(currentWord)
    
// }

let startingBoard = [];
let len = commonWords.length;
let randomIndex = Math.floor(Math.random() * len);
let currentWord = commonWords[randomIndex].toLowerCase();
// let tempCurrentWord = '';
let alphabetArray = [];

class CreateGame {
    constructor(numOfGuesses) {
        this.numOfGuesses = numOfGuesses;
    }

    makeBoard() {
        for(let i = 0; i < currentWord.length; i++) {
            startingBoard.push('_ ');
        }
        $('#word-board').html(startingBoard)
        $('.guesses').html(`Guesses left: ${this.numOfGuesses}`)
       
    }
    playableLetters() {
        for (let i = 65; i < 91; i++) {
            $('#letters').append(`<div class="letter">${String.fromCharCode(i)}</div>`)
            alphabetArray.push(String.fromCharCode(i))
        }
        return alphabetArray;
    }
    removeLetter(letter) {
        // alphabetArray.join('').replace(/letter/, `${letter.strike()}`).split('')
        this.numOfGuesses--
        $('.guesses').html(`Guesses left: ${this.numOfGuesses}`)

    }
}

// (function playableLetters() {
//     let alphabetArryay = [];
//     for (let i = 65; i < 91; i++) {
//         $('#letters').append(`<div class="letter">${String.fromCharCode(i)}</div>`)
//     }
// })()

const game = new CreateGame(10);
game.makeBoard();
game.playableLetters();

$('.letter').click(function() {
    let $this = $(this);
    let selectedLetter = $this.text()
    game.removeLetter(selectedLetter)
    if (currentWord.includes(selectedLetter.toLowerCase())) {
        $('#message').html(`'${selectedLetter}' is correct`)
        let index = currentWord.indexOf(selectedLetter.toLowerCase())
        startingBoard[index] = currentWord[index]
        $('#word-board').html(startingBoard)
    }
    console.log(currentWord)
    if (startingBoard.includes('_ ') === false) {
        $('#message').html(`Congratulations you have won`)
    }
        
})


