function Point(x, y){
    this.x = x;
    this.y = y;
}

function gcd(x, y){
    if (y == 0){ return x; }
    return gcd(y, x%y);
}

function Fraction(nume, deno){
    this.nume = nume;
    this.deno = deno;
}

function sim(frac){
    if (frac.nume == -0){ frac.nume = 0; }
    if (frac.deno < 0){
        frac.nume *= -1;
        frac.deno *= -1;
    }
    if (frac.nume == 0){ frac.deno = 1; }
    else{
        let g = gcd( Math.abs(frac.nume), Math.abs(frac.deno) );
        frac.nume /= g;
        frac.deno /= g;
    }
    return frac;
}

function add(fracA, fracB){
    let nume = (fracA.nume * fracB.deno) + (fracA.deno * fracB.nume);
    let deno = fracA.deno * fracB.deno;
    let fracC = new Fraction(nume, deno);
    fracC = sim(fracC);
    return fracC;
}

function mul(fracA, fracB){
    let nume = fracA.nume * fracB.nume;
    let deno = fracA.deno * fracB.deno;
    let fracC = new Fraction(nume, deno);
    fracC = sim(fracC);
    return fracC;
}

let points;
let xxmat, xmat, ymat, amat;

function Calculate(){
    const inputTag = document.getElementById('input');
    const outputTag = document.getElementById('output');
    outputTag.innerHTML = "\\[ f(x) = \\textcolor{Red}{ \\text{Error} } \\]";
    LoadMathJax();
    let input = inputTag.value.split('\n');
    for (let i = 0; i < input.length; i++){
        input[i] = input[i].split(' ');
        for (let j = 0; j < input[i].length; j++){
            if (!isInt(input[i][j])){ return; }
            input[i][j] = parseInt(input[i][j]);
        }
    }
    if (input[0].length != 1){ return; }
    let n = input[0][0];
    if (n <= 0 || input.length != n+1){ return; }
    for (let i = 1; i <= n; i++){
        if (input[i].length != 2){ return; }
    }

    points = new Array(n+1);
    for (let i = 1; i <= n; i++){
        points[i] = new Point(input[i][0], input[i][1]);
        for (let j = 1; j < i; j++){
            if (points[i].x == points[j].x){ return; }
        }
    }

    xxmat = new Array(n+1);
    xmat = new Array(n+1);
    ymat = new Array(n+1);
    amat = new Array(n+1);
    for (let i = 1; i <= n; i++){
        xxmat[i] = new Array(n+1);
        xmat[i] = new Array(n+1);
        ymat[i] = new Fraction(points[i].y, 1);
        amat[i] = new Fraction(0, 1);
        let x = 1;
        for (let j = n; j >= 1; j--){
            xxmat[i][j] = new Fraction(x, 1);
            if (i == j){ xmat[i][j] = new Fraction(1, 1); }
            else{ xmat[i][j] = new Fraction(0, 1); }
            x *= points[i].x;
        }
    }

    for (let i = 1; i <= n; i++){
        if (xxmat[i][i].nume == 0){
            for (let j = 1; j <= n; j++){
                [ xxmat[i][j], xxmat[i+1][j] ] = [ xxmat[i+1][j], xxmat[i][j] ];
                [ xmat[i][j], xmat[i+1][j] ] = [ xmat[i+1][j], xmat[i][j] ];
                [ ymat[i][j], ymat[i+1][j] ] = [ ymat[i+1][j], ymat[i][j] ];
            }
        }
        let divFrac = new Fraction(xxmat[i][i].deno, xxmat[i][i].nume);
        for (let j = 1; j <= n; j++){
            xxmat[i][j] = mul(xxmat[i][j], divFrac);
            xmat[i][j] = mul(xmat[i][j], divFrac);
        }
        for (let j = 1; j <= n; j++){
            if (i == j){ continue; }
            let mulFrac = new Fraction(-xxmat[j][i].nume, xxmat[j][i].deno);
            for (let k = 1; k <= n; k++){
                xxmat[j][k] = add(xxmat[j][k], mul(xxmat[i][k], mulFrac) );
                xmat[j][k] = add(xmat[j][k], mul(xmat[i][k], mulFrac) );
            }
        }
    }

    for (let i = 1; i <= n; i++){
        for (let j = 1; j <= n; j++){
            amat[i] = add(amat[i], mul(xmat[i][j], ymat[j]) );
        }
    }

    outputTag.innerHTML = "\\[ f(x) = ";
    let first = true;
    for (let i = 1; i <= n; i++){
        console.log(amat[i]);

        if (amat[i].nume == 0){
            if (i != n){ continue; }
            if (!first){ continue; }
        }

        if (amat[i].nume < 0){ outputTag.innerHTML += "-"; }
        else if (!first){ outputTag.innerHTML += "+"; }
        first = false;

        if (amat[i].deno != 1){ outputTag.innerHTML += "\\frac{ " + Math.abs(amat[i].nume) + " }{ " + amat[i].deno + " }"; }
        else if (amat[i].nume != 1){ outputTag.innerHTML += Math.abs(amat[i].nume); }
        else if (i == n){ outputTag.innerHTML += "1"; }

        if (n-i > 1){ outputTag.innerHTML += "x^{ " + (n-i) + " }"; }
        else if (n-i == 1){ outputTag.innerHTML += "x"; }
    }
    outputTag.innerHTML += " \\]";
    LoadMathJax();
}