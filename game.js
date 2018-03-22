var commonWords = [
    "the","uss enterprise","q","star trek","phaser","data","scotty","uhura","that","bones","starfleet",
    "was","for","riker","cardassian","capt picard","with","redshirt","they","voyager","attic","stardate",
    "this","have","from","klingon","chekov","khan","romulan","word","but","ferengi",
    "what","all","were","borg","when","your","can","said","there",
    "use","vulcan","each","which","she","worf","how","their","federation","will",
    "tricorder","other","about","seven of nine","many","then","them","these","bajoran",
    "some","her","would","make","like","him","into","time","shuttle",
    "look","spock","more","write","capt kirk","see","number","bridge","way",
    "could","people","mind meld","than","first","water","been","call",
    "who","oil","prime directive","now","find","long","down","sulu","did","laforge",
    "come","made","may","part"
];

let startingBoard = [];
let len = commonWords.length;
let randomIndex = Math.floor(Math.random() * len);
let currentWord = commonWords[randomIndex].toLowerCase();
// let currentWord = 'capt kirk' //for testing words directly
let alphabetArray = [];

class CreateGame {
    constructor(numOfGuesses) {
        this.numOfGuesses = numOfGuesses;
    }

    get guesses() {
        return this.numOfGuesses
    }

    //creates the correct blanks to play 
    makeBoard() {
        for(let i = 0; i < currentWord.length; i++) {
            console.log(currentWord[i])
            if (currentWord[i] == ' ') {
                startingBoard.push('- ')
            } else {
                startingBoard.push('_ ');
            }
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
    //removes selected letter from queue and decrements guess count
    removeLetter(letter) {
        $('#letters').empty();
        for (let i = 0; i < alphabetArray.length; i++) {
            if (alphabetArray[i] === letter) {
                alphabetArray[i] = '_';
            }
            $('#letters').append(`<div class="letter">${alphabetArray[i]}</div>`)
        }
        this.numOfGuesses--;
        $('.guesses').html(`Guesses left: ${this.numOfGuesses}`)
    }
    //checks for a win or lose scenario
    checkEndGame(currentWord) {
        if (startingBoard.includes('_ ') === false) {
            if (currentWord === 'capt picard' || currentWord === 'capt kirk') {
                $('.happy-easter').css('display', 'block')
            }
            $('#message').html(`Congratulations you have won FLAMES!!`)
            $('.game-board-container').addClass('nuke');
        } else if (game.guesses === 0) {
            $('#message').html(`Congratulations you have lost FLAMES!!!!!
            The answer was '${currentWord}'`)
            setTimeout(function() {
                $.playSound('picard37.mp3')
            }, 1000)
            // $('.game-board-container').css('z-index', 5).fire({mode: 'anim'})
            $('.game-board-container').addClass('nuke');
            $('#letters').off()
        }
    }
}

const game = new CreateGame(currentWord.length+5);
game.makeBoard();
game.createLetters();

$('#letters').on('click', '.letter', function() {
    let $this = $(this);
    if ($this.text() == '_') {
        $('#message').html(`You already picked that`)
        return;
    }
    console.log(`Selected Letter: ${$this.text()}`)
    console.log(`Current Word: ${currentWord}`)
    let selectedLetter = $this.text()
    //adds clicked letter to game board if it exists
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
    game.removeLetter(selectedLetter)
    game.checkEndGame(currentWord)
})


