const letter = document.querySelector(".letter");
const inputLetter = document.querySelector("#userInput");
const scoreValue = document.querySelector(".scoreValue");
const inputForm = document.querySelector("#inputForm");
const resetCounter = document.querySelector(".resetCounter");
const linearButton = document.querySelector("#linearMode");
const randomButtom = document.querySelector("#randomMode");
let totalWords = 0;
let guessedWords = 0;
let newLetter = "";
let randomMode = true;
const ascii_A = 65;
let actualLinearLetter = ascii_A;
newLetter = changeLetter();

const alphabet = {
    "A": "Alfa",
    "B": "Bravo",
    "C": "Charlie",
    "D": "Delta",
    "E": "Echo",
    "F": "Foxtrot",
    "G": "Golf",
    "H": "Hotel",
    "I": "India",
    "J": "Juliett",
    "K": "Kilo",
    "L": "Lima",
    "M": "Mike",
    "N": "November",
    "O": "Oscar",
    "P": "Papa",
    "Q": "Quebec",
    "R": "Romeo",
    "S": "Sierra",
    "T": "Tango",
    "U": "Uniform",
    "V": "Victor",
    "W": "Whiskey",
    "X": "X-ray",
    "Y": "Yankee",
    "Z": "Zulu"
}

inputForm.addEventListener("submit", () => {
    checkLetterWithInput();
})

function changeLetter() {
    if (randomMode) {
        const oldLetter = newLetter;
        const randomLetter = String.fromCharCode(Math.floor(65 + Math.random() * 25));
        letter.innerHTML = randomLetter;
        return randomLetter != oldLetter ? randomLetter : changeLetter()
    } else {
        const oldLetter = newLetter;
        if (actualLinearLetter > 90) {
            actualLinearLetter = ascii_A;
        }
        const nextLetter = String.fromCharCode(actualLinearLetter);
        letter.innerHTML = nextLetter;
        actualLinearLetter++;
        return nextLetter != oldLetter ? nextLetter : changeLetter()
    }
}

function checkLetterWithInput() {
    const word = alphabet[newLetter].toUpperCase();
    if (inputLetter.value.toUpperCase() === word) {
        guessedWords++;
        showAnswer("correctAnswer", word);
    } else {
        showAnswer("wrongAnswer", word)
    }
    setTimeout(() => {
        letter.classList = "letter";
        totalWords++;
        updateScore();
        inputLetter.value = "";
        newLetter = changeLetter();
    }, 1000)
}

function updateScore() {
    scoreValue.innerHTML = `${guessedWords} / ${totalWords}`
}

function showAnswer(color, word) {
    letter.innerHTML = word;
    letter.classList = "word"
    letter.classList.add(color);
}

scoreValue.addEventListener("mouseover", () => {
    showResetCounter();
});

resetCounter.addEventListener("mouseleave", () => {
    removeResetCounter();
});

function showResetCounter() {
    scoreValue.style.display = "none";
    resetCounter.classList.add("appear");
}

function removeResetCounter() {
    scoreValue.style.display = "block";
    resetCounter.classList.remove("appear");
}

function resetScore() {
    totalWords = 0;
    guessedWords = 0;
    updateScore();
}

resetCounter.addEventListener("click", resetScore);

linearButton.addEventListener("click", () => {
    if (randomMode) {
        randomMode = false;
        newLetter = changeLetter();
        actualLinearLetter = ascii_A;
    }
});
randomButtom.addEventListener("click", () => {
    randomMode = true;
    actualLinearLetter = ascii_A;
});