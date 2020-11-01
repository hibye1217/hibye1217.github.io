// returns random number between [low, high]
function rand(low, high){
    return Math.floor(Math.random() * (high-low+1) + low);
}

// defined constants
const PERFECT = 1;
const ALL = 2;

// constants
const n = 8, m = 14, cnt = 1000, last = 8140; // size, population, final goal
const half = parseInt((cnt+1)/2); // half of the population
const dy = [-1, -1, -1,  0,  0,  1,  1,  1]; // Y direction
const dx = [-1,  0,  1, -1,  1, -1,  0,  1]; // X direction

// Arrays
let arr = new Array(cnt+1); // arr[idx] = Gene's idx
let score = new Array(cnt+1); // score[idx] = score of Gene idx.
let rank = new Array(cnt+1); // rank[idx] = idx th rank.
let chk = new Array(10020); // chk[idx] = can find the number idx.

// Variables.
let mutation = 50, evolved = 2500, mode = 1; // percentage, judge mode.
let checked = false; // is it judged?
let genCount = 0; // Generation Count.

// Code Checker.
function codeCheck(){
    let input = prompt("Enter Code Here");
    if (input == null || input.length != n*m*cnt){
        alert("Incorrect Code.");
        location.href = "../Main.html";
    }

    for (let k = 1; k <= cnt; k++){
        arr[k] = new Array(n+1);
        for (let i = 1; i <= n; i++){
            arr[k][i] = new Array(m+1);
            for (let j = 1; j <= m; j++){
                let p = (k-1)*n*m + (i-1)*m + (j-1);
                let char = input.charCodeAt(p);
                if (48 > char || char > 57){
                    alert("Incorrect Code.");
                    location.href = "../Main.html";
                }
                arr[k][i][j] = char - 48;
            }
        }
    }
}

// Evolve, then Judge, then Print.
function Run(lang){
    if (checked) Evolve();
    checked = true;
    Judge();
    Sort();
    Print(lang);
}

// Judging all genes.
function Judge(){
    for (let k = 1; k <= cnt; k++){
        for (let i = 1; i <= 9999; i++) chk[i] = false;

        for (let i = 1; i <= n; i++){
            for (let j = 1; j <= m; j++){
                dfs(k, i, j, 1, arr[k][i][j]);
            }
        }

        // First non-present number is score
        if (mode == PERFECT){
            let lowest = last;
            for (let i = 1; i <= last; i++){
                if (!chk[i]){
                    lowest = i-1;
                    break;
                }
            }
            score[k] = lowest;
        }

        // Number of presented number is score
        if (mode == ALL){
            let count = last;
            for (let i = 1; i <= last; i++){
                if (!chk[i]){
                    count -= 1;
                }
            }
            score[k] = count;
        }
    }
}

// Sort genes by order.
function Sort(){
    for (let i = 1; i <= cnt; i++) rank[i] = i;

    for (let i = 1; i <= cnt; i++){
        for (let j = 1; j <= cnt-i; j++){
            if (score[ rank[j] ] < score[ rank[j+1] ]){
                let tmp = rank[j];
                rank[j] = rank[j+1];
                rank[j+1] = tmp;
            }
        }
    }
}

function Print(lang){
    const tag = document.getElementById('genCounter');
    switch(lang){
        case "Kor":
            tag.innerHTML = genCount + "세대";
            break;
        case "Eng":
            tag.innerHTML = "Generation " + genCount;
            break;
    }

    PrintRank(1, 'win', lang);
    PrintRank(500, 'mid', lang);
    PrintRank(999, 'los', lang);
}

// Print (rank)th genes.
function PrintRank(ranking, tagID, lang){
    const tag = document.getElementById(tagID);
    switch(lang){
        case "Kor":
            tag.innerHTML = ranking + "위 : #" + rank[ranking] + "<br>";
            break;
        case "Eng":
            tag.innerHTML = "Rank " + ranking + " : #" + rank[ranking] + "<br>";
            break;
    }
    
    for (let i = 1; i <= n; i++){
        for (let j = 1; j <= m; j++){
            tag.innerHTML += arr[ rank[ranking] ][i][j];
        }
        tag.innerHTML += "<br>";
    }

    switch(lang){
        case "Kor":
            tag.innerHTML += "점수 : " + score[ rank[ranking] ];
            break;
        case "Eng":
            tag.innerHTML += "Fitness : " + score[ rank[ranking] ];
            break;
    }
}

// Evolving 501st ~ 1000th. 1000th's gene = random
function Evolve(){
    genCount += 1;

    for (let r = cnt; r > cnt/2; r--){
        var child = rank[r];
        var parent = rank[cnt-r+1];
        if (rand(1, 1000) > r){
            child = rank[cnt-r+1];
            parent = rank[r];
        }
        
        for (let i = 1; i <= n; i++){
            for (let j = 1; j <= m; j++){
                if (rand(1, 10000) <= mutation) arr[child][i][j] = rand(0, 9);
                if (rand(1, 10000) <= evolved) arr[child][i][j] = arr[parent][i][j];
            }
        }
    }
}

// Finding all numbers from gene.
function dfs(map, y, x, depth, value){
    chk[value] = true;
    if (depth == 4) return;

    for (let k = 0; k < 8; k++){
        let xx = x+dx[k], yy = y+dy[k];
        if (1 > xx || xx > m || 1 > yy || yy > n) continue;
        dfs(map, yy, xx, depth+1, value*10 + arr[map][yy][xx]);
    }
}
 // Copy Function. Print at F12 Console.
function Copy(){
    var str = "";
    for (let k = 1; k <= cnt; k++){
        for (let i = 1; i <= n; i++){
            for (let j = 1; j <= m; j++){
                str += arr[k][i][j];
            }
        }
    }
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(str);
    let downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "18789.txt");

    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Change Mutation Factor. 1 ~ 10000
function ChangeMutation(t, lang){
    var x = prompt("");
    if (x == null || isNaN(x) || x.length == 0 || parseInt(x) > 10000) return;
    mutation = parseInt(x);
    switch(lang){
        case "Kor":
            t.innerHTML = "돌연변이 : " + x;
            break;
        case "Eng":
            t.innerHTML = "Mutation : " + x;
            break;
    }
}

// Change Evolve Factor. 1 ~ 10000
function ChangeEvolved(t, lang){
    var x = prompt("");
    if (x == null || isNaN(x) || x.length == 0 || parseInt(x) > 10000) return;
    evolved = parseInt(x);
    switch(lang){
        case "Kor":
            t.innerHTML = "진화 : " + x;
            break;
        case "Eng":
            t.innerHTML = "Evoled : " + x;
            break;
    }
}

// Change Judge Mode.
function ChangeJudge(t, lang){
    mode += 1;
    if (mode == 3) mode = 1;
    switch(lang){
        case "Kor":
            t.innerHTML = "평가 : ";
            break;
        case "Eng":
            t.innerHTML = "Judge : ";
            break;
    }
    switch(lang){
        case "Kor":
            if (mode == 1) t.innerHTML += "완벽주의";
            if (mode == 2) t.innerHTML += "전체";
            break;
        case "Eng":
            if (mode == 1) t.innerHTML += "Perfection";
            if (mode == 2) t.innerHTML += "All Number";
            break;
    }
}