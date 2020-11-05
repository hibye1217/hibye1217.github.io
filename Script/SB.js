let playerList = new Array(1); // Players.
let roundName; // Round's name.

let playerCount = 0;
let roundCount; // total Round

// initialize round
function Init(){
    roundCount = prompt("Round Count");
    if (roundCount == null || isNaN(roundCount)){
        alert("Error.");
        location.href = "../Main.html";
    }
    roundCount = parseInt(roundCount);
    if (roundCount <= 0){
        alert("Error.");
        location.href = "../Main.html";
    }
    const roundTag = document.getElementById("Round");
    roundTag.colSpan = roundCount;

    roundName = new Array(roundCount+1);

    const subtag = document.getElementById('subthead');
    for (let i = 1; i <= roundCount; i++){
        let th = document.createElement('th');
        th.innerHTML = i + "라운드";
        roundName[i] = i + "라운드";
        subtag.appendChild(th);
    }
}

function Sort(){

}

function Print(){
    const table = document.getElementById('subtbody');
    table.innerHTML = "";

    for (let i = 1; i <= playerCount; i++){
        //console.log(i);
        let tr = document.createElement('tr');
        
        let td = document.createElement('td');
        td.innerHTML = playerList[i].Name.split('_').join(' ');
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = playerList[i].Total;
        tr.appendChild(td);

        for (let j = 1; j <= roundCount; j++){
            td = document.createElement('td');
            td.innerHTML = playerList[i].Scores[j];
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}

// Start Command.
function Start(){
    const command = document.getElementById("Command");
    let arr = command.value.split(' ');
    command.value = "";

    switch(arr[0]){
        case "ap":
        case "addplayer":
            AddPlayer(arr[1]);
            break;
        case "rp":
        case "removeplayer":
            RemovePlayer(arr[1]);
            break;
        case "as":
        case "addscore":
            AddScore(arr[1], arr[2], arr[3]);
            break;
    }

    Sort();
    Print();
}

function findPlayer(name){
    let idx = -1;
    for (let i = 1; i <= playerCount; i++){
        if (playerList[i].Name == name) idx = i;
    }
    return idx;
}

function findRound(round){
    let idx = -1;
    for (let i = 1; i <= roundCount; i++){
        if (roundName[i] == round) idx = i;
    }
    return idx;
}

// Add New Player
function AddPlayer(name){
    if (findPlayer(name) != -1){
        alert("Error.");
    }

    playerList.push({
        Name: name,
        Total: 0,
        Scores: new Array(roundCount+1)
    });
    playerCount += 1;

    for (let i = 1; i <= roundCount; i++){
        playerList[playerCount].Scores[i] = 0;
    }

    //console.log(playerList, playerCount);
}

// Remove Player
function RemovePlayer(name){
    let idx = findPlayer(name);
    if (idx == -1){
        alert("Error.");
        return;
    }

    playerList.splice(idx, 1);
    playerCount -= 1;
}

// Add Score
function AddScore(name, round, score){
    let idx = findPlayer(name);
    let ridx = findRound(round);
    if (idx == -1 || ridx == -1 || isNaN(score)){
        alert("Error.");
        return;
    }
    score = parseInt(score);

    playerList[idx].Scores[ridx] += score;
    playerList[idx].Total += score;
}