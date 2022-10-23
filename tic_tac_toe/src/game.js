function startGame() {
    const signs = document.querySelectorAll(".sign");
    for (const sign of signs) {
        sign.disabled = true;
    }
    initializeFields(playTurn);
    const startGameButton = document.querySelector("#start_game");
    startGameButton.disabled = true;
}

function playTurn(event) {
    const playerSign = getPlayerSign();
    const playerChoice = getPlayerChoice(event);
    displaySign(playerChoice, playerSign);
    if (checkIfWon(playerSign)) {
        displayResultInfo("You");
        finishGame();
        return; 
    }
    
    if (getEmptyFields().length === 0) {
        displayResultInfo("Nobody");
        finishGame();
        return;
    }
    
    const computerSign = getComputerSign();
    const computerChoice = getComputerChoice();
    displaySign(computerChoice, computerSign);
    if (checkIfWon(computerSign)) {
        displayResultInfo("Computer");
        finishGame();
        return;
    }
}

function finishGame() {
    disableFields(playTurn);
    const restartButton = document.createElement("button");
    restartButton.textContent = "Reset";
    document.body.append(restartButton);
    restartButton.addEventListener("click", () =>  {
        restartButton.parentNode.removeChild(restartButton);
        clearFields();
        enableSignSelect();
        const resultInfo = document.getElementById("result_info");
        resultInfo.parentNode.removeChild(resultInfo);
        const startGameButton = document.querySelector("#start_game");
        startGameButton.disabled = false;
        hideFields();
    });
}

function checkIfWon(sign) {
    if (checkRow(sign) || checkColumn(sign) || checkDiagonal1(sign) || checkDiagonal2(sign)) {
        return true;
    }
    return false;
}

function getPlayerChoice(event) {
    const field = event.srcElement;
    return field.getAttribute("id");
}

function getPlayerSign() {
    const circle = document.querySelector("#circle");
    if (circle.checked) {
        return Sign.CIRCLE;
    }
    return Sign.CROSS;
}

function getComputerChoice() {
    const emptyFields = getEmptyFields();
    const randomIndex = Math.floor(Math.random() * emptyFields.length);
    return emptyFields[randomIndex];
}

function getComputerSign() {
    if (getPlayerSign() === Sign.CIRCLE) {
        return Sign.CROSS;
    }
    return Sign.CIRCLE;
}

function displayResultInfo(winner) {
    const resultInfo = document.createElement("div");
    resultInfo.setAttribute("id", "result_info");
    resultInfo.textContent = `${winner} won!`;
    document.body.append(resultInfo);
}

function enableSignSelect() {
    const signs = document.querySelectorAll(".sign");
    for (const sign of signs) {
        sign.disabled = false;
    }
}
