const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const inputField = document.querySelector("input");
const checkBtn = document.querySelector(".check-word");
const timeText = document.querySelector(".time b");

let correctWord = "";
let timer = 0;

const startTimer = (maxTime) => {
    clearInterval(timer); 
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
           return timeText.innerText = maxTime; 
        }
        clearInterval(timer); 
        alert(`Time's up! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    startTimer(30)
    let randomObj =  words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for(let i = wordArray.length - 1;  i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLocaleLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) return alert("Please enter a word check");
    if(userWord !== correctWord) return alert("Incorrect!");
    alert("Correct!");
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);