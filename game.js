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
let alphabetArray = [];
// let tempCurrentWord = '';

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
    createLetters() {
        for (let i = 65; i < 91; i++) {
            $('#letters').append(`<div class="letter">${String.fromCharCode(i)}</div>`)
            alphabetArray.push(String.fromCharCode(i))
        }
        return alphabetArray;
    }
    removeLetter(letter) {
        var re = new RegExp(letter,"g");
        let newAlpha = alphabetArray.join('').replace(re, '_').split('')
        // console.log(alphabetArray)
        this.numOfGuesses--
        $('.guesses').html(`Guesses left: ${this.numOfGuesses}`)
        // $('#letters').empty();
        // for (let i = 0; i < 26; i++) {
        //     $('#letters').append(`<div class="letter">${newAlpha[i]}</div>`)
        // }
    }
}

const game = new CreateGame(10);
game.makeBoard();
game.createLetters();

$('.letter').click(function() {
    let $this = $(this);
    console.log(`Selected Letter: $this.text()`)
    console.log(`Current Word: ${currentWord}`)
    let selectedLetter = $this.text()
    if (currentWord.includes(selectedLetter.toLowerCase())) {
        for (let i = 0; i < currentWord.length; i++) {
            if (startingBoard[i] === '_ ') {
                if (currentWord[i] === selectedLetter.toLowerCase()) {
                    startingBoard[i] = selectedLetter;
                }
            }
        }
        $('#message').html(`'${selectedLetter}' is correct`)
        $('#word-board').html(startingBoard)
    }
    if (startingBoard.includes('_ ') === false) {
        $('#message').html(`Congratulations you have won`)
    }
    game.removeLetter(selectedLetter)
        
})


