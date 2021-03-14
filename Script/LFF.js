function Factorial(x){
    let result = 1;
    for (let i = 1; i <= x; i++){
        result *= i;
    }
    return result;
}

function Calculate(){
    const inputN = document.getElementById('inputN');
    const outputFN = document.getElementById('outputFN');
    outputFN.innerHTML = "\\( F(n) = \\textcolor{red}{ \\text{Error} } \\)";
    LoadMathJax();
    
    let n = inputN.value;
    if (!isInt(n)){ return; }
    n = parseInt(n);
    if (n <= 0){ return; }
    let result = 0;
    for (let k = 0; k <= Math.floor((n-1) / 2); k++){
        let up = Factorial(n-k-1);
        let down = Factorial(k) * Factorial(n-2*k-1);
        result += up/down;
    }
    outputFN.innerHTML = "\\( F(n) = " + result + " \\)";
    LoadMathJax();
}

function Calculate2(){
    const inputN = document.getElementById('inputN2');
    const outputFN = document.getElementById('outputFN2');
    const outputPASCAL = document.getElementById('outputPASCAL2');
    const outputSUM = document.getElementById('outputSUM2');
    outputFN.innerHTML = "\\( F(n) = \\textcolor{red}{ \\text{Error} } \\)";
    outputPASCAL.innerHTML = "";
    outputSUM = "\\( \\text{sum} = \\textcolor{red}{ \\text{Error} } \\)";
    LoadMathJax();

    let n = inputN.value;
    if (!isInt(n)){ return; }
    n = parseInt(n);
    if (n <= 0){ return; }

    let result = 0;
    for (let k = 0; k <= Math.floor((n-1) / 2); k++){
        let up = Factorial(n-k-1);
        let down = Factorial(k) * Factorial(n-2*k-1);
        result += up/down;
    }
    outputFN.innerHTML = "\\( F(n) = " + result + " \\)";

    outputPASCAL.innerHTML = "";
    let pascal = new Array(n);
    for (let i = 0; i < n; i++){
        pascal[i] = new Array(i+1);
        for (let j = 0; j <= i; j++){
            if (j == 0 || j == i){ pascal[i][j] = 1; }
            else{ pascal[i][j] = pascal[i-1][j-1] + pascal[i-1][j]; }
            if (i == n-j-1){ outputPASCAL.innerHTML += "\\( \\textcolor{red}{ " + pascal[i][j] + " } \\) "; }
            else{ outputPASCAL.innerHTML += "\\( " + pascal[i][j] + " \\) "; }
        }
        outputPASCAL.innerHTML += "<br>";
    }

    let result2 = 0;
    for (let i = 0; i <= n-i-1; i++){
        result2 += pascal[n-i-1][i];
    }
    outputSUM.innerHTML = "\\( \\text{sum} = " + result2 + " \\)";
    LoadMathJax();
}