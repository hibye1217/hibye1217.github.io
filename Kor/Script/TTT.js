var map = new Array(10);
for (let i = 0; i < 3; i++){
    map[i] = new Array(10);
    for (let j = 0; j < 3; j++){
        map[i][j] = 0;
    }
}
var turn = 1;
var play = true;
var score1 = 0, score2 = 0;

function win(t){
    if (map[0][0] == t && map[0][1] == t && map[0][2] == t) return true;
    if (map[1][0] == t && map[1][1] == t && map[1][2] == t) return true;
    if (map[2][0] == t && map[2][1] == t && map[2][2] == t) return true;

    if (map[0][0] == t && map[1][0] == t && map[2][0] == t) return true;
    if (map[0][1] == t && map[1][1] == t && map[2][1] == t) return true;
    if (map[0][2] == t && map[1][2] == t && map[2][2] == t) return true;

    if (map[0][0] == t && map[1][1] == t && map[2][2] == t) return true;
    if (map[2][0] == t && map[1][1] == t && map[0][2] == t) return true;
    
    return false;
}

function tie(){
    if (map[0][0] != 0 && map[0][1] != 0 && map[0][2] != 0 && 
        map[1][0] != 0 && map[1][1] != 0 && map[1][2] != 0 && 
        map[2][0] != 0 && map[2][1] != 0 && map[2][2] != 0) return true;
    return false;
}

function fill(z, tag){
    if (!play) return;
    var x = z%10, y = parseInt(z/10);
    if (map[y][x] != 0){
        return;
    }
    map[y][x] = turn;
    if (turn == 1){
        tag.innerHTML = "O";
        tag.style.color = "#FF0000";
        tag.style.fontSize = "72px";
        turn = 2;
        var vs = document.getElementById('vs');
        vs.style.color = "#0000FF";
    }
    else{
        tag.innerHTML = "X";
        tag.style.color = "#0000FF";
        tag.style.fontSize = "72px";
        turn = 1;
        var vs = document.getElementById('vs');
        vs.style.color = "#FF0000";
    }

    if (win(1)){
        play = false;
        var p = document.getElementById('p1');
        score1 += 1;
        p.innerHTML = "O " + score1;
        var hide = document.getElementById('hide');
        hide.style.visibility = "visible";
    }
    if (win(2)){
        play = false;
        var p = document.getElementById('p2');
        score2 += 1;
        p.innerHTML = score2 + " X";
        var hide = document.getElementById('hide');
        hide.style.visibility = "visible";
    }
    if (tie()){
        play = false;
        var hide = document.getElementById('hide');
        hide.style.visibility = "visible";
    }
}

function reset(){
    play = true;
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            map[i][j] = 0;
        }
    }
    hide.style.visibility = "hidden";
    var tds = document.getElementsByTagName('td');
    for (let i = 0; i < tds.length; i++) tds[i].innerHTML = "";
}