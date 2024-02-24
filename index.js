const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const cellContainer = document.querySelector("#cellContainer");
const h2 = document.querySelector("#h2");
const pick = document.querySelector("#pick");
const pickMelody = document.querySelector("#pickMelody");
const pickHelloKitty = document.querySelector("#pickHelloKitty");
const pickKuromi = document.querySelector("#pickKuromi");
const pickPompomurin = document.querySelector("#pickPompomurin");
const refresh = document.querySelector("#refresh");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let running = false;
let counter = 1;

chooseYourFighter();
function chooseYourFighter() {
    restartBtn.style.visibility = "hidden";
    cellContainer.style.visibility = "hidden";
    h2.textContent = "Choose your fighter:";

    pickMelody.addEventListener("click", () => {
        currentPlayer = "Melody";
        clicked();
    });

    pickHelloKitty.addEventListener("click", () => {
        currentPlayer = "Hello Kitty";
        clicked();
    });   
    
    pickKuromi.addEventListener("click", () => {
        currentPlayer = "Kuromi";
        clicked();
    });

    pickPompompurin.addEventListener("click", () => {
        currentPlayer = "Pompompurin";
        clicked();
    });

    function clicked() {
        h2.textContent = `${currentPlayer} vs. Ditto`;
        pick.style.display = "none";
        restartBtn.style.visibility = "visible";
        cellContainer.style.visibility = "visible";
        refresh.style.visibility = "visible";
        initializeGame();
    }
}


function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
    if (running){
        switch(counter){
            case 1:
                setTimeout(firstMove, 600);
                break;
            case 2:
                setTimeout(secondMove, 600);
                break;
            case 3:
                setTimeout(thirdMove, 600);
                break;
            case 4:
                setTimeout(thirdMove, 600);
                break;
        }
    }
    counter += 1;
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    if (currentPlayer == "Hello Kitty"){
        var hellokitty = cell.querySelector('.hellokitty');
        hellokitty.style.visibility = "visible";
    }
    else if (currentPlayer == "Melody"){
        var melody = cell.querySelector('.melody');
        melody.style.visibility = "visible";
    }
    else if (currentPlayer == "Kuromi"){
        var kuromi = cell.querySelector('.kuromi');
        kuromi.style.visibility = "visible";
    }
    else if (currentPlayer == "Pompompurin"){
        var kuromi = cell.querySelector('.pompompurin');
        kuromi.style.visibility = "visible";
    }
}


function checkWinner(){
    let roundWon = false;

    for( let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            if (cellA == "Ditto"){
                winner = "Ditto";
            }
            else {
                winner = currentPlayer;
            }
            break;
        }
    }
    if (roundWon){
        statusText.textContent = `${winner} wins!`;
        running = false;
    }
    else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    }
}

function restartGame(){
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = ``;
    cells.forEach(cell => {
        var hellokitty = cell.querySelector('.hellokitty');
        hellokitty.style.visibility = "hidden";
        var melody = cell.querySelector('.melody');
        melody.style.visibility = "hidden";
        var ditto = cell.querySelector('.ditto');
        ditto.style.visibility = "hidden";
        var kuromi = cell.querySelector('.kuromi');
        kuromi.style.visibility = "hidden";
        var pompompurin = cell.querySelector('.pompompurin');
        pompompurin.style.visibility = "hidden";
    });
    running = true;
    counter = 1;
    initializeGame();
}

function refreshPage(){
    location.reload();
}


//ditto plays
function firstMove(cell){
    console.log(counter);
    console.log(options[4]);
    if (counter == 2 && options[4] != ""){
        randomMove = Math.floor(Math.random() * 9);
        console.log(randomMove)
        while(randomMove != 0 && randomMove != 2 && randomMove != 6 && randomMove != 8){
            randomMove = Math.floor(Math.random() * 9);
            console.log(randomMove);
        }
    } 
    else {
        randomMove = Math.floor(Math.random() * 9);
        while(options[randomMove] != ""){
            randomMove = Math.floor(Math.random() * 9);
        }
    }
    options[randomMove] = "Ditto";
    cell = cells[randomMove];
    var ditto = cell.querySelector('.ditto');
    ditto.style.visibility = "visible";
}

function secondMove(){
    moveOption = -1;
    moveOption = checkX();
    
    if (moveOption == -1 || moveOption == randomMove){
        moveOption = checkO();
    }

    if(moveOption == -1){
        firstMove();
    }
    else {
        options[moveOption] = "Ditto";
        let cell = cells[moveOption];
        var ditto = cell.querySelector('.ditto');
        ditto.style.visibility = "visible";
    }   
}

function thirdMove(){
    moveOption = -1;
    moveOption = checkO2();

    if(moveOption == -1){
        checkX();
    }
    if(moveOption == -1){
        checkO();
    }
    if(moveOption == -1){
        firstMove();
    } else {
        options[moveOption] = "Ditto";
        let cell = cells[moveOption];
        var ditto = cell.querySelector('.ditto');
        ditto.style.visibility = "visible";
    }
    checkWinner();
}


function checkX() {
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" && cellB == "" && cellC == "") {
            continue;
        }
        if(cellA != "" && cellB != "" && cellC != ""){
            continue;
        }
        else if(cellA == cellB && (cellA != "")){
            moveOption = winConditions[i][2];
            break;
        }
        else if(cellC == cellB && (cellC != "")){
            moveOption = winConditions[i][0];
            break;
        }
        else if(cellA == cellC && (cellA != "")){
            moveOption = winConditions[i][1];
            break;
        }
        else{
            moveOption = -1;
        }
    }
    return moveOption;
}

function checkO() {
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "Ditto"){
            if(cellB == "" && cellC == "") {
                moveOption = winConditions[i][2];
                i = winConditions.length;
            }
        }
        if(cellB == "Ditto"){
            if(cellA == "" && cellC == "") {
                moveOption = winConditions[i][2];
                i = winConditions.length;
            }
        }
        if(cellC == "Ditto"){
            if(cellB == "" && cellA == "") {
                moveOption = winConditions[i][0];
                i = winConditions.length;
            }
        }
    }
    return moveOption;
}

function checkO2() {
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "Ditto" && cellC == "Ditto"){
            if(cellB == "") {
                moveOption = winConditions[i][1];
                i = winConditions.length;
            }
        }
        if(cellB == "Ditto" && cellC == "Ditto"){
            if(cellA == "") {
                moveOption = winConditions[i][0];
                i = winConditions.length;
            }
        }
        if(cellA == "Ditto" && cellB == "Ditto"){
            if(cellC == "") {
                moveOption = winConditions[i][2];
                i = winConditions.length;
            }
        }
    }
    return moveOption;
}