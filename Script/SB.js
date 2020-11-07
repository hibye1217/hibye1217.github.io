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

let playerList = new Array(); // Players.
let roundName; // Round's name.

let playerCount = 0; // # of players.
let roundCount; // total Round

let changeRoundName = function(){
    let str = prompt("New Name?");
    if (str == null || str.length == 0 || findRound(str) != -1 || str.indexOf(' ') != -1){
        alert("Error.");
        return;
    }
    let idx = findRound(this.innerText);
    console.log(this.innerText, idx);
    roundName[idx] = str;

    Print();
}

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

    for (let i = 1; i <= roundCount; i++){
        roundName[i] = i + "라운드";
    }

    playerList.push({
        Name: "   "
    });

    Print();
}

function Sort(){
    playerList.sort( function(p1, p2){
        if (p1.Total == p2.Total){
            return p1.Name > p2.Name ? 1 : -1;
        }
        return p1.Total < p2.Total ? 1 : -1;
    } );
}

function Print(){
    const round = document.getElementById("Round");
    round.colSpan = roundCount;

    const roundTag = document.getElementById('subthead')
    roundTag.innerHTML = "";
    for (let i = 1; i <= roundCount; i++){
        let th = document.createElement('th');
        th.innerHTML = roundName[i].split('_').join(' ');
        th.onclick = changeRoundName;
        roundTag.appendChild(th);
    }

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
    let commands = command.value.split(';');
    command.value = "";

    commands.forEach(
        function (str){
            str = str.trim();
            let arr = str.split(' ');
            switch(arr[0].toLowerCase()){
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
                case "sr":
                case "setround":
                    SetRound(arr[1]);
                    break;
                case "sv":
                case "save":
                    Save();
                    break;
            }
        }
    )

    Sort();
    Print();
}

// Add New Player
function AddPlayer(name){
    if (findPlayer(name) != -1){
        alert("Error While Adding Player.");
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
        alert("Error While Removing Player.");
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
        alert("Error While Add Score.");
        return;
    }
    score = parseInt(score);

    playerList[idx].Scores[ridx] += score;
    playerList[idx].Total += score;
}

// Set RoundCount
function SetRound(round){
    if (isNaN(round)){
        alert("Error While Set Round.");
        return;
    }
    round = parseInt(round);

    for (let i = 1; i <= playerCount; i++){
        let delta = round - roundCount;
        while (delta > 0){
            playerList[i].Scores.push(0);
            delta -= 1;
        }
        while (delta < 0){
            playerList[i].Total -= playerList[i].Scores.pop();
            delta += 1;
        }
    }

    let delta = round - roundCount;
    while (delta > 0){
        roundName.push((round - delta + 1) + "라운드");
        delta -= 1;
    }
    while (delta < 0){
        roundName.pop();
        delta += 1;
    }
    roundCount = round;
}

// Commands
function Save(){
    let str = "";
    str += "function Manual(){\n";

    str += "  SetRound(" + roundCount + ");\n"
    for (let i = 1; i <= roundCount; i++){
        str += "  roundName[" + i + "] = \"" + roundName[i] + "\";\n";
    }

    for (let i = 1; i <= playerCount; i++){
        str += "  AddPlayer(\"" + playerList[i].Name + "\");\n";
        for (let j = 1; j <= roundCount; j++){
            str += "  AddScore(\"" + playerList[i].Name + "\", \"" + roundName[j] + "\", " + playerList[i].Scores[j] + ");\n";
        }
    }

    str += "  Print();\n"
    str += "}\n";
    str += "Manual();"

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(str);
    let downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "Scoreboard.txt");

    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}