var commonWords = [
    "the","enterprise","and","startrek","phaser","data","scotty","you","that","bones","he",
    "was","for","riker","are","picard","with","his","they","voyager","attic","be",
    "this","have","from","klingon","one","had","by","word","but","not",
    "what","all","were","borg","when","your","can","said","there",
    "use","vulcan","each","which","she","wharf","how","their","if","will",
    "up","other","about","out","many","then","them","these","so",
    "some","her","would","make","like","him","into","time","has",
    "look","two","more","write","kirk","see","number","no","way",
    "could","people","my","than","first","water","been","call",
    "who","oil","its","now","find","long","down","day","did","get",
    "come","made","may","part"
];

let startingBoard = [];
let len = commonWords.length;
let randomIndex = Math.floor(Math.random() * len);
let currentWord = commonWords[randomIndex].toLowerCase();
let alphabetArray = [];

class CreateGame {
    constructor(numOfGuesses) {
        this.numOfGuesses = numOfGuesses;
    }

    get guesses() {
        return this.numOfGuesses
    }

    makeBoard() {
        for(let i = 0; i < currentWord.length; i++) {
            startingBoard.push('_ ');
        }
        $('#word-board').html(startingBoard)
        $('.guesses').html(`Guesses left: ${this.numOfGuesses}`)
        $('#message').html(`Select a letter to begin`)
       
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
        this.numOfGuesses--
        $('.guesses').html(`Guesses left: ${this.numOfGuesses}`)
        $('#letters').empty();
        for (let i = 0; i < alphabetArray.length; i++) {
            if (alphabetArray[i] === letter) {
                alphabetArray[i] = '_';
            }
            $('#letters').append(`<div class="letter">${alphabetArray[i]}</div>`)
        }
    }
}

const game = new CreateGame(10);
game.makeBoard();
game.createLetters();

$('#letters').on('click', '.letter', function() {
    let $this = $(this);
    console.log(`Selected Letter: ${$this.text()}`)
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
    } else {
        $('#message').html(`There are no ${selectedLetter}'s`)
    }
    if (startingBoard.includes('_ ') === false) {
        $('#message').html(`Congratulations you have won FLAMES!!`)
        $('.game-board-container').addClass('nuke');
    }
    game.removeLetter(selectedLetter)
    if (game.guesses === 0) {
        $('#message').html(`Congratulations you have lost FLAMES!!!!!
                            The answer was '${currentWord}'`)
        // $('.game-board-container').css('z-index', 5).fire({mode: 'anim'})
        $('.game-board-container').addClass('nuke');
        $('#letters').off()
    }
})


