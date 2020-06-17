function loadMathJax(){
    MathJax.typeset();
}

var points = new Array(120);
var count = 0;
var xmatrix, Xmatrix, Ymatrix, Amatrix;

var add = function(f){
    this.up = this.up*f.down + this.down*f.up;
    this.down = this.down*f.down;
    this.simplify();
}
var multiply = function(f){
    this.up *= f.up;
    this.down *= f.down;
    this.simplify();
}
var simplify = function(){
    if (this.up == -0) this.up = 0;
    if (this.down < 0){
        this.up *= -1;
        this.down *= -1;
    }
    if (this.up == 0){
        this.down = 1;
    }
    else{
        var gcd = GCD(Math.abs(this.up), Math.abs(this.down));
        this.up /= gcd;
        this.down /= gcd;
    }
}

function GCD(x, y){
    if (y == 0) return x;
    else return GCD(y, x%y);
}

function getAnswer(){
    for (let i = 1; i <= count; i++){
        for (let j = 1; j <= count; j++){
            var res = {
                up: Xmatrix[i][j].up,
                down: Xmatrix[i][j].down,
                add: add,
                multiply: multiply,
                simplify: simplify
            }

            res.multiply(Ymatrix[j]);
            Amatrix[i].add(res);
        }
    }
}

function inverseMatrix(){
    for (let i = 1; i <= count; i++){
        if (xmatrix[i][i].up == 0){
            for (let j = 1; j <= count; j++){
                var tmp = xmatrix[i][j];
                xmatrix[i][j] = xmatrix[i+1][j];
                xmatrix[i+1][j] = tmp;

                tmp = Xmatrix[i][j];
                Xmatrix[i][j] = Xmatrix[i+1][j];
                Xmatrix[i+1][j] = tmp;

                tmp = Ymatrix[i][j];
                Ymatrix[i][j] = Ymatrix[i+1][j];
                Ymatrix[i+1][j] = tmp;
            }
        }

        var div = {
            up: xmatrix[i][i].down,
            down: xmatrix[i][i].up,
            add: add,
            multiply: multiply,
            simplify: simplify
        }

        for (let j = 1; j <= count; j++){
            xmatrix[i][j].multiply(div);
            Xmatrix[i][j].multiply(div);
        }

        for (let j = 1; j <= count; j++){
            if (i == j) continue;

            var mul = {
                up: -xmatrix[j][i].up,
                down: xmatrix[j][i].down,
                add: add,
                multiply: multiply,
                simplify: simplify
            }

            for (let k = 1; k <= count; k++){
                var frc = {
                    up: xmatrix[i][k].up,
                    down: xmatrix[i][k].down,
                    add: add,
                    multiply: multiply,
                    simplify: simplify
                }

                frc.multiply(mul);
                xmatrix[j][k].add(frc);

                frc = {
                    up: Xmatrix[i][k].up,
                    down: Xmatrix[i][k].down,
                    add: add,
                    multiply: multiply,
                    simplify: simplify
                }

                frc.multiply(mul);
                Xmatrix[j][k].add(frc);
            }
        }
    }
}

function makeMatrix(){
    xmatrix = new Array(count+1);
    for (let i = 1; i <= count; i++){
        xmatrix[i] = new Array(count+1);
        var X = 1;
        for (let j = count; j >= 1; j--){
            xmatrix[i][j] = {
                up: X,
                down: 1,
                add: add,
                multiply: multiply,
                simplify: simplify
            }

            X *= points[i].x;
        }
    }

    Xmatrix = new Array(count+1);
    for (let i = 1; i <= count; i++){
        Xmatrix[i] = new Array(count+1);
        for (let j = 1; j <= count; j++){
            if (i == j){
                Xmatrix[i][j] = {
                    up: 1,
                    down: 1,
                    add: add,
                    multiply: multiply,
                    simplify: simplify
                }
            }
            else{
                Xmatrix[i][j] = {
                    up: 0,
                    down: 1,
                    add: add,
                    multiply: multiply,
                    simplify: simplify
                }
            }
        }
    }
    
    Ymatrix = new Array(count+1);
    for (let i = 1; i <= count; i++){
        Ymatrix[i] = {
            up: points[i].y,
            down: 1,
            add: add,
            multiply: multiply,
            simplify: simplify
        }
    }

    Amatrix = new Array(count+1);
    for (let i = 1; i <= count; i++){
        Amatrix[i] = {
            up: 0,
            down: 1,
            add: add,
            multiply: multiply,
            simplify: simplify
        }
    }
}

function Print(){
    var output = document.getElementById('output');
    if (count == 0){
        output.innerHTML = "";
    }
    else{
        makeMatrix();
        inverseMatrix();
        getAnswer();

        output.innerHTML = "\\( f(x) = \\) ";
        var showed = false, first = true;
        for (let i = 1; i <= count; i++){
            if (Amatrix[i].up == 0 && (showed || i != count)) continue;
            showed = true;

            output.innerHTML += " \\( "

            if (!first || Amatrix[i].up < 0){
                if (Amatrix[i].up > 0){
                    output.innerHTML += "+"
                }
                else{
                    output.innerHTML += "-"
                }
            }
            first = false;

            if (Amatrix[i].down == 1){
                if (Amatrix[i].up == 1){
                    if (i == count){
                        output.innerHTML += Math.abs(Amatrix[i].up);
                    }
                    else{
                        // Nothing.
                    }
                }
                else{
                    output.innerHTML += Math.abs(Amatrix[i].up);
                }
            }
            else{
                output.innerHTML += "\\frac{ " + Math.abs(Amatrix[i].up) +" }{ "+ Amatrix[i].down +" }";
            }
            
            if (count-i == 1) output.innerHTML += "x";
            else if (count-i > 1) output.innerHTML += "x^{" + (count-i) + "}";

            output.innerHTML += " \\)"
        }
    }

    var outpoint = document.getElementById('outpoint');
    outpoint.innerHTML = "\\( ";
    for (let i = 1; i <= count; i++){
        outpoint.innerHTML += "(" + points[i].x + ", " + points[i].y + ")";
        if (i != count){
            outpoint.innerHTML += ", ";
        }
    }
    outpoint.innerHTML += " \\)";

    loadMathJax();
}

function makePoint(){
    var coordinate = prompt("Input the Coordinate.");
    if (coordinate.indexOf(' ') == -1){
        RequestFailed();
        return;
    }

    var xinput = coordinate.substr(0, coordinate.indexOf(' '));
    var yinput = coordinate.substr(coordinate.indexOf(' ')+1);
    console.log(xinput, yinput);
    if (isNaN(xinput) || isNaN(yinput)){
        RequestFailed();
        return;
    }

    xinput = parseInt(xinput);
    yinput = parseInt(yinput);
    var found = false;
    for (let i = 1; i <= count; i++){
        if (xinput == points[i].x) found = true;
    }
    if (found){
        RequestFailed();
        return;
    }

    count += 1;
    points[count] = {
        x: xinput,
        y: yinput
    }

    Print();
}

function erasePoint(){
    var erase = prompt("Input the X coordinate.");
    if (isNaN(erase)){
        RequestFailed();
        return;
    }
    erase = parseInt(erase);

    var found = -1;
    for (let i = 1; i <= count; i++){
        if (points[i].x == erase) found = i;
    }
    if (found == -1){
        RequestFailed();
        return;
    }

    for (let i = found; i < count; i++){
        points[i] = {
            x: points[i+1].x,
            y: points[i+1].y
        }
    }
    count -= 1;
    
    Print();
}