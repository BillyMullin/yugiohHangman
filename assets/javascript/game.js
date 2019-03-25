/* INITAL SETUP
 ----------------------------------------------------------------------------------------------------------------*/

//Array of yugioh objects each with words (name), image1 (yugioh Silhouettes), image2 (yugioh Reveal)
var yugiohArray = [
    {
        word: "blueeyeswhitedragon",
        image1: "assets/images/blueEyesWhiteDragon1.png",
        image2: "assets/images/blueEyesWhiteDragon.png"
    },
    {
        word: "barney",
        image1: "assets/images/barney1.jpg",
        image2: "assets/images/barney.jpg"
    },
    {
        word: "darkelf",
        image1: "assets/images/DarkElf1.png",
        image2: "assets/images/DarkElf.png"
    },
    {
        word: "darkmagician",
        image1: "assets/images/DarkMagician1.jpg",
        image2: "assets/images/DarkMagician.jpg"
    },
    {
        word: "jinzo",
        image1: "assets/images/jinzo1.png",
        image2: "assets/images/jinzo.png"
    },
    {
        word: "lusterdragon",
        image1: "assets/images/LusterDragon1.jpg",
        image2: "assets/images/LusterDragon.jpg"
    },
    {
        word: "monsterreborn",
        image1: "assets/images/MonsterReborn1.png",
        image2: "assets/images/MonsterReborn.png"
    },
    {
        word: "po",
        image1: "assets/images/po1.jpg",
        image2: "assets/images/po.jpg"
    },
    {
        word: "summonedskull",
        image1: "assets/images/summondSkull1.jpg",
        image2: "assets/images/summondSkull.jpg"
    },
    {
        word: "timewizard",
        image1: "assets/images/timeWizard1.jpg",
        image2: "assets/images/timeWizard.jpg"
    },
    {
        word: "trapmaster",
        image1: "assets/images/trapMaster1.jpg",
        image2: "assets/images/trapMaster.jpg"
    }]

//gameStatus is my start/stop controller between questions    
var gameStatus = false;

//Generate randomNumber
var randomNumber = Math.floor(Math.random() * yugiohArray.length);

//Apply randomNumber to obtain random word (answer), and related images.
var yugioh = yugiohArray[randomNumber].word;
var yugiohImage1 = yugiohArray[randomNumber].image1
var yugiohImage2 = yugiohArray[randomNumber].image2

//Establish lettersRemaining (for win);
var lettersRemaining = yugioh.length;

//Set up the answer array to store word (answer) as an array for indexing.
var answerArray = []; 

/* LISTENERS
 ----------------------------------------------------------------------------------------------------------------*/

//Use key events to listen for the letters that your players will type.
document.addEventListener("keyup", function(event){
    //If gameStatus (or game round) has been initialized, then proceed to playing.
    if(gameStatus) {
        letterCheck(event);
    } else {
        //If gameStatus (or game round) has completed, re-initialize (or reset) the game.
        init();
    }
});

//Setup alphabet array for letter checking
var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function letterCheck(guess) {
    //If letter key is press, check if the letter pressed is in the answer.
    if (alphabetArray.indexOf(guess.key) > -1) {
        correctGuessCheck(guess);
    }
}

//Check whether the guess is correct
var winScore = 0;
function correctGuessCheck(guess) {
    if (yugioh.indexOf(guess.key) > -1) {
        //if guess is correct, run correctGuess function.
        correctGuess(guess);
    } else {
        //If guess is incorrect, run incorrectGuess function.
        incorrectGuess(guess);
    }
}

function correctGuess(guess) {
    if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        //If the correctGuess doesn't exist in the answerArray, run addCorrectLetter function.
        addCorrectLetter(guess);
    }
}

function addCorrectLetter(guess) {
    for (var j = 0; j < yugioh.length; j++) {
        //If guess matches an existing letter in the answer.
        if (guess.key === yugioh[j]) {
            //Push correct letter to answerArray as upperCase.
            answerArray[j] = guess.key.toUpperCase();
            displayCurrentWord();
            //Reduce letters remaining for win by one.
            lettersRemaining--;
            //If letters left has reached 0, user wins. 
            if (lettersRemaining === 0) {
                //Add 1 to win score.
                winScore++;
                //Display new win score.
                displayWins();
                //Reveal the yugioh's identiy.
                changeImage();
                //Turn correct answer green.
                addCorrect();
                //display currentWord with new green font.
                displayCurrentWord();
            }
        }
    }
}

//Set up an incorrect answer array
var incorrectGuessesMade = [];
//Establish the number of guesses.
var guessesLeft = 9;

function incorrectGuess(guess) {
    if (incorrectGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
        //If the inCorrectGuess doesn't exist in the answerArray, run addIncorrectLetter function.
        addIncorrectLetter(guess);
    }
}

function addIncorrectLetter(guess) {
    //Push incorrect guess into the incorrectGuessesMade array
    incorrectGuessesMade.push(guess.key.toUpperCase());
    //Inform user of incorrectGuessesMade
    displayGuessesMade();
    //Lower guessesLeft by 1
    guessesLeft--;
    //Inform user of guessesLeft
    displayGuessesLeft();
    if (guessesLeft === 0) {
        //If guesses left reaches equals 0, then Game Over.
        changeImage();
        //Display corrent answer.
        displayAnswer();
    }
}

/* HANDLERS
----------------------------------------------------------------------------------------------------------------*/

//Displays the number of wins user has obtains.
function displayWins() {
    var winsDisplay = document.querySelector("#winsDisplay");
    winsDisplay.textContent = winScore;
}

//Displays the letters the user has guessed.
function displayGuessesMade() {
    var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
    guessesMadeDisplay.textContent = incorrectGuessesMade.join(", ");
}

//Displays how many user guesses are left.
function displayGuessesLeft() {
    var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
    guessesLeftDisplay.textContent = guessesLeft;
}

//Displays current solve status of answerArray.
function displayCurrentWord() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.innerHTML = answerArray.join(" ");
}

//Displays silhouette of yugioh when game initalizes.
function displayImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = yugiohImage1;
}

//Reveals yugioh identiy regardless of whether user was able to solve. 
function changeImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = yugiohImage2;
    gameStatus = false;
}

//Reveals answer if user is unable to solve.
function displayAnswer() {
    var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
    revealedAnswerDisplay.textContent = yugioh.toUpperCase();
}

//Turns current word green (to indicate correctness)
function addCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.add('correct');
}

//Removes green color of current word (for re-initalizing purposes)
function removeCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.remove('correct');
}


/* Initalize (or re-initialize) the game.
----------------------------------------------------------------------------------------------------------------*/

function init() {
    //Changes gameStatus to ready.
    gameStatus = true;
    
    //Generate a new random number
    randomNumber = Math.floor(Math.random() * yugiohArray.length);
    
    //Apply new randomNumber to obtain random word (answer), and related images.
    yugioh = yugiohArray[randomNumber].word;
    yugiohImage1 = yugiohArray[randomNumber].image1
    yugiohImage2 = yugiohArray[randomNumber].image2

    //Re-establish lettersRemaining (for win);
    lettersRemaining = yugioh.length;

    //Re-establish answer array.
     answerArray = []; 

    //Convert word answer into an array.
    for (var i = 0; i < yugioh.length; i++) {
        //If an answer has more than one word, use + as a separator. A space will be displayed when currentWord is displayed. Not applicable for this particlar yugioh game, but here for flexibility.
        if (yugioh[i] === "+") {
            answerArray[i] = "&nbsp;";
        } else {
            //Replace word answer with "_"s
            answerArray[i] = "_";
        }
    }

    //Re-establish lettersRemaining (for win)
    lettersRemaining = yugioh.length;

    //Re-establish guessesLeft for user.
    guessesLeft = 9;
    displayGuessesLeft()

    //Re-establish guessesMade array.
    incorrectGuessesMade = [];
    displayGuessesMade()
    
    //Display current word.
    displayCurrentWord();

    //Display yugioh silhouette.
    displayImage();

    //Empty revealedAnswer display if user was unsuccessful previously.
    revealedAnswerDisplay.textContent = "";

    //Play "Who's that yugioh?" audio.
    document.getElementById('whosThat').play();

    //Remove greenColor from currentWord if user was successful previously.
    removeCorrect();
}