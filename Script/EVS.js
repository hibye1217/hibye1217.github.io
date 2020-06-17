function rand(low, high){
    return Math.floor(Math.random() * (high-low+1) + low);
}

const n = 8, m = 14, cnt = 1000;
const half = parseInt((cnt+1)/2);
const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
const dx = [-1, 0, 1, -1, 1, -1, 0, 1];
var mutation = 50, evolved = 2500, mode = 1;
var arr = new Array(cnt+1);
var score = new Array(cnt+1);
var rank = new Array(cnt+1);
var chk = new Array(10020);

var input = prompt("Enter the Code");
var checked = false;
if (input == null || input.length != n*m*cnt) AccessDenied();

for (let k = 1; k <= cnt; k++){
    arr[k] = new Array(n+1);
    for (let i = 1; i <= n; i++){
        arr[k][i] = new Array(m+1);
        for (let j = 1; j <= m; j++){
            var p = (k-1)*n*m + (i-1)*m + (j-1);
            var char = input.charCodeAt(p);
            if (48 > char || char > 57) AccessDenied();
            arr[k][i][j] = char - 48;
        }
    }
}

function Evolve(){
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

function dfs(map, y, x, depth, value){
    chk[value] = true;
    if (depth == 4) return;

    for (let k = 0; k < 8; k++){
        var X = x+dx[k], Y = y+dy[k];
        if (1 > X || X > m || 1 > Y || Y > n) continue;
        dfs(map, Y, X, depth+1, value*10 + arr[map][Y][X]);
    }
    return;
}

function Judge(){
    for (let k = 1; k <= cnt; k++){
        for (let i = 1; i < 10000; i++) chk[i] = false;

        for (let i = 1; i <= n; i++){
            for (let j = 1; j <= m; j++){
                dfs(k, i, j, 1, arr[k][i][j]);
            }
        }
        
        if (mode == 1){
            var lowest = 10000;
            for (let i = 1; i < 10000; i++){
                if (!chk[i]){
                    lowest = i;
                    break;
                }
            }

            score[k] = lowest-1;
        }

        if (mode == 2){
            var count = 8140;
            for (let i = 1; i <= 8140; i++){
                if (!chk[i]){
                    count -= 1;
                }
            }

            score[k] = count;
        }
    }

    Sort();
}

function Sort(){
    for (let i = 1; i <= cnt; i++) rank[i] = i;
    
    for (let i = 1; i <= cnt; i++){
        for (let j = 1; j <= cnt-i; j++){
            if (score[ rank[j] ] < score[ rank[j+1] ]){
                var tmp = rank[j];
                rank[j] = rank[j+1];
                rank[j+1] = tmp;
            }
        }
    }
}

function Print(){
    var win = document.getElementById('win');
    win.innerHTML = "Rank 1 : #" + rank[1] + "<br>";
    for (let i = 1; i <= n; i++){
        for (let j = 1; j <= m; j++){
            win.innerHTML += arr[ rank[1] ][i][j];
        }
        win.innerHTML += "<br>";
    }
    win.innerHTML += "Fitness : " + score[ rank[1] ];

    var mid = document.getElementById('mid');
    mid.innerHTML = "Rank " + half + " : #" + rank[half] + "<br>";
    for (let i = 1; i <= n; i++){
        for (let j = 1; j <= m; j++){
            mid.innerHTML += arr[ rank[half] ][i][j];
        }
        mid.innerHTML += "<br>";
    }
    mid.innerHTML += "Fitness : " + score[ rank[half] ];

    var los = document.getElementById('los');
    los.innerHTML = "Rank " + cnt + " : #" + rank[cnt] + "<br>";
    for (let i = 1; i <= n; i++){
        for (let j = 1; j <= m; j++){
            los.innerHTML += arr[ rank[cnt] ][i][j];
        }
        los.innerHTML += "<br>";
    }
    los.innerHTML += "Fitness : " + score[ rank[cnt] ];
}

function Run(){
    if (checked){
        Evolve();
    }
    checked = true;
    Judge();
    Print();
}

function Copy(){
    var str = "";
    for (let k = 1; k <= cnt; k++){
        for (let i = 1; i <= n; i++){
            for (let j = 1; j <= m; j++){
                str += arr[k][i][j];
            }
        }
    }
    console.log(str);
}

function ChangeMutation(t){
    var x = prompt("");
    if (x == null || isNaN(x) || x.length == 0 || parseInt(x) > 10000) return;
    mutation = parseInt(x);
    t.innerHTML = "Mutation : " + x;
}

function ChangeEvolved(t){
    var x = prompt("");
    if (x == null || isNaN(x) || x.length == 0 || parseInt(x) > 10000) return;
    evolved = parseInt(x);
    t.innerHTML = "Evolved : " + x;
}

function ChangeJudge(t){
    mode += 1;
    if (mode == 3) mode = 1;
    if (mode == 1) t.innerHTML = "Judge : Perfection";
    if (mode == 2) t.innerHTML = "Judge : All Number";
}