function LoadMathJax(){
    MathJax.typeset();
}

function Convert(lang){
    const tag = document.getElementById('output');
    let str = document.getElementById('Equation').value;
    if (str == ""){
        if (lang == 'Kor'){
            tag.innerHTML = "입력된 수식이 없습니다."
        }
        else{
            tag.innerHTML = "There are nothing to show..."
        }
    }
    else{
        tag.innerHTML = "\\[ " + str + " \\]";
        LoadMathJax();
    }
}