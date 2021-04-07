function Calculate(){
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    output.innerHTML = "\\[ " + input.value + " \\]";
    LoadMathJax();
}