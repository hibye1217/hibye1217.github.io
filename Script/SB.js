function FindName(){
    var input = prompt("Name?");
    if (input == null || input.length == 0){
        return -1;
    }
    var idx = -1;
    for (let i = 1; i <= count; i++){
        if (input == Name[i]) idx = i;
    }
    return idx;
}

function FindTeamName(){
    var input = prompt("Name?");
    if (input == null || input.length == 0){
        return -1;
    }
    var idx = -1;
    for (let i = 1; i <= teamCount; i++){
        if (input == TeamName[i]) idx = i;
    }
    return idx;
}

var ChangeTeam = function(){
    var par = this.parentElement.firstChild.innerHTML;
    var rnk = parseInt(par.substring(0, par.length - 2));
    var idx = Rank[rnk];
    Team[idx] += 1;
    if (Team[idx] > teamCount) Team[idx] = 0;

    Print();
}

var ChangeColor = function(){
    var par = this.parentElement.firstChild.innerHTML;
    var rnk = parseInt(par.substring(0, par.length - 2));
    var idx = TeamRank[rnk];
    var str = prompt("Enter : #(HexCode)");
    if (str == null || str.length != 7 || str[0] != '#'){
        RequestFailed();
        return;
    }
    for (let i = 1; i <= 6; i++){
        var char = str[i].charCodeAt();
        if ('0'.charCodeAt() <= char && char <= '9'.charCodeAt());
        else if ('A'.charCodeAt() <= char && char <= 'F'.charCodeAt());
        else if ('a'.charCodeAt() <= char && char <= 'f'.charCodeAt());
        else{
            RequestFailed();
            return;
        }
    }
    TeamColor[idx] = str;

    Print();
}

var count = 0, teamCount = 0;
var Name = new Array(1020);
var Score = new Array(1020);
var Out = new Array(1020);
var Rank = new Array(1020);
var Team = new Array(1020);
var TeamAverage = new Array(1020);
var TeamTotal = new Array(1020);
var TeamMember = new Array(1020);
var TeamName = new Array(1020);
var TeamColor = new Array(1020);
var TeamRank = new Array(1020);
TeamName[0] = "No Team"; TeamColor[0] = "#000000";
var OutColor = "#BBBBBB";

function Validate(){
    for (let i = 1; i <= count; i++) Rank[i] = i;

    for (let i = 1; i <= count; i++){
        for (let j = 1; j <= count-i; j++){
            if (Score[ Rank[j] ] < Score[ Rank[j+1] ]){
                var tmp = Rank[j];
                Rank[j] = Rank[j+1];
                Rank[j+1] = tmp;
            }
        }
    }

    for (let i = 0; i <= teamCount; i++){
        TeamTotal[i] = 0;
        TeamMember[i] = 0;
    }

    for (let i = 1; i <= count; i++){
        if (Out[i] || Team[i] == 0) continue;
        TeamTotal[ Team[i] ] += Score[i];
        TeamMember[ Team[i] ] += 1;
    }

    for (let i = 1; i <= teamCount; i++){
        if (TeamMember[i] == 0) TeamAverage[i] = 0;
        else TeamAverage[i] = TeamTotal[i] / TeamMember[i];
        TeamRank[i] = i;
    }

    for (let i = 1; i <= teamCount; i++){
        for (let j = 1; j <= teamCount-i; j++){
            if (TeamAverage[ TeamRank[j] ] < TeamAverage[ TeamRank[j+1] ]){
                var tmp = TeamRank[j];
                TeamRank[j] = TeamRank[j+1];
                TeamRank[j+1] = tmp;
            }
        }
    }
}

function Print(){
    Validate();

    var scoreboard = document.getElementById('scoreboard');
    while (scoreboard.childElementCount != 0) scoreboard.removeChild(scoreboard.childNodes[0]);
    for (let j = 1; j <= count; j++){
        var tr = document.createElement('tr');
        var rank, team, name, score;
        let i = Rank[j];
        var textColor = (Out[i] ? OutColor : TeamColor[ Team[i] ]);

        rank = document.createElement('td');
        rank.className = "rank";
        rank.innerHTML = j;
        if (j%10 == 1 && j%100 != 11) rank.innerHTML += "st";
        else if (j%10 == 2 && j%100 != 12) rank.innerHTML += "nd";
        else if (j%10 == 3 && j%100 != 13) rank.innerHTML += "rd";
        else rank.innerHTML += "th";
        rank.style.color = textColor;
        tr.appendChild(rank);

        team = document.createElement('td');
        team.className = "team";
        if (!Out[i]) team.innerHTML = TeamName[ Team[i] ];
        else team.innerHTML = "ELIMINATED";
        if (!Out[i]) team.onclick = ChangeTeam;
        team.style.color = textColor;
        tr.appendChild(team);

        name = document.createElement('td');
        name.className = "name";
        name.innerHTML = Name[i];
        name.style.color = textColor;
        tr.appendChild(name);

        score = document.createElement('td');
        score.className = "score";
        score.innerHTML = Score[i];
        score.style.color = textColor;
        tr.appendChild(score);

        scoreboard.appendChild(tr);
    }

    scoreboard = document.getElementById('tscoreboard');
    while (scoreboard.childElementCount != 0) scoreboard.removeChild(scoreboard.childNodes[0]);
    for (let j = 1; j <= teamCount; j++){
        var tr = document.createElement('tr');
        var rank, team, avg, tot, cnt;
        let i = TeamRank[j];
        var textColor = TeamColor[i];

        rank = document.createElement('td');
        rank.className = "rank";
        rank.innerHTML = j;
        if (j%10 == 1 && j%100 != 11) rank.innerHTML += "st";
        else if (j%10 == 2 && j%100 != 12) rank.innerHTML += "nd";
        else if (j%10 == 3 && j%100 != 13) rank.innerHTML += "rd";
        else rank.innerHTML += "th";
        rank.style.color = textColor;
        tr.appendChild(rank);

        team = document.createElement('td');
        team.className = "team";
        team.innerHTML = TeamName[i];
        team.style.color = textColor;
        team.onclick = ChangeColor;
        tr.appendChild(team);

        avg = document.createElement('td');
        avg.className = "team";
        avg.innerHTML = TeamAverage[i].toFixed(3);
        avg.style.color = textColor;
        tr.appendChild(avg);

        tot = document.createElement('td');
        tot.className = "tot";
        tot.innerHTML = TeamTotal[i];
        tot.style.color = textColor;
        tr.appendChild(tot);

        cnt = document.createElement('td');
        cnt.className = "cnt";
        cnt.innerHTML = TeamMember[i];
        cnt.style.color = textColor;
        tr.appendChild(cnt);

        scoreboard.appendChild(tr);
    }
}

function AddPlayer(){
    var input = prompt("Name?");
    if (input == null || input.length == 0 || input.indexOf('.') != -1){
        RequestFailed();
        return;
    }
    for (let i = 1; i <= count; i++){
        if (Name[i] == input){
            RequestFailed();
            return;
        }
    }

    count += 1;
    Name[count] = input;
    Team[count] = 0;
    Score[count] = 0;
    Out[count] = false;

    Print();
}

function ErasePlayer(){
    var idx = FindName();
    if (idx == -1){
        RequestFailed();
        return;
    }

    for (let i = idx; i < count; i++){
        Name[i] = Name[i+1];
        Team[i] = Team[i+1];
        Score[i] = Score[i+1];
        Out[i] = Out[i+1];
    }
    count -= 1;

    Print();
}

function EliminatePlayer(){
    var idx = FindName();
    if (idx == -1 || Out[idx]){
        RequestFailed();
        return;
    }
    
    Out[idx] = true;

    Print();
}

function RejoinPlayer(){
    var idx = FindName();
    if (idx == -1 || !Out[idx]){
        RequestFailed();
        return;
    }

    Out[idx] = false;

    Print();
}

function AddTeam(){
    var input = prompt("Name?");
    if (input == null || input.length == 0){
        RequestFailed();
        return;
    }
    for (let i = 1; i <= teamCount; i++){
        if (TeamName[i] == input){
            RequestFailed();
            return;
        }
    }

    teamCount += 1;
    TeamName[teamCount] = input;
    TeamColor[teamCount] = "#000000";
    TeamAverage[teamCount] = 0;
    TeamTotal[teamCount] = 0;
    TeamMember[teamCount] = 0;

    Print();
}

function EraseTeam(){
    var idx = FindTeamName();
    if (idx == -1){
        RequestFailed();
        return;
    }

    for (let i = 1; i <= count; i++){
        if (Team[i] == idx) Team[i] = 0;
    }

    for (let i = idx; i < teamCount; i++){
        TeamName[i] = TeamName[i+1];
        TeamColor[i] = TeamColor[i+1];
        TeamAverage[i] = TeamAverage[i+1];
        TeamTotal[i] = TeamTotal[i+1];
        TeamMember[i] = TeamMember[i+1];
    }
    teamCount -= 1;

    Print();
}

function AddScore(){
    var idx = FindName();
    if (idx == -1){
        RequestFailed();
        return;
    }
    
    input = prompt("Add?");
    if (input == null || input.length == 0 || isNaN(input)){
        RequestFailed();
        return;
    }
    Score[idx] += parseInt(input);

    Print();
}

function Save(){
    var string = "";
    string += "function Manual(){\n";

    string += "  teamCount = " + teamCount + ";\n";
    for (let i = 1; i <= teamCount; i++){
        string += "  TeamName[" + i + "] = \"" + TeamName[i] + "\";\n";
        string += "  TeamColor[" + i + "] = \"" + TeamColor[i] + "\";\n";
        string += "  TeamAverage[" + i + "] = " + TeamAverage[i] + ";\n";
        string += "  TeamTotal[" + i + "] = " + TeamTotal[i] + ";\n";
        string += "  TeamMember[" + i + "] = " + TeamMember[i] + ";\n";
    }

    string += "  count = " + count + ";\n";
    for (let i = 1; i <= count; i++){
        string += "  Name[" + i + "] = \"" + Name[i] + "\";\n";
        string += "  Score[" + i + "] = " + Score[i] + ";\n";
        string += "  Team[" + i + "] = " + Team[i] + ";\n";
        string += "  Out[" + i + "] = " + Out[i] + ";\n";
    }

    string += "  Print();\n";
    string += "}\n";

    string += "Manual();";

    console.log(string);
}