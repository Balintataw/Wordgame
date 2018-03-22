var commonWords = [
    "uss enterprise","q","star trek","phaser","data","scotty","uhura","bones","starfleet","riker","cardassian","capt picard","redshirt","voyager","attic","stardate","klingon","chekov","khan","romulan","ferengi",
    "what","were","borg","vulcan","each","which","worf","federation",
    "tricorder","other","about","seven of nine","bajoran",
    "some","her","would","make","like","into","time","shuttle",
    "look","spock","holodeck","write","capt kirk","see","number","bridge","transporter","mind meld","bird of prey","prime directive","down","sulu","laforge"
];
var starWarsWords = [ //implement an option for word sets
    "luke","force","imperial","alliance","jedi","wookie","tatooine","star destroyer","millenium falcon","empire","darth vader","droid","lightsaber","han solo","chewbacca","stormtrooper","leia","obiwan kenobi","death star","boba fett","x wing","ewok","resistance","lando","hoth","jabba the hut","palpatine","coruscant","speeder bike","dagobah"
]

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
            setTimeout(function() {
                $.playSound('Khan.mp3')
            }, 500)
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


