const probability = [
    { price: 1, succeed: 9500, asIs: 500, fail: 0, destroy: 0 },
    { price: 1, succeed: 9000, asIs: 1000, fail: 0, destroy: 0 },
    { price: 1, succeed: 8500, asIs: 1500, fail: 0, destroy: 0 },
    { price: 1, succeed: 8500, asIs: 1500, fail: 0, destroy: 0 },
    { price: 1, succeed: 8000, asIs: 2000, fail: 0, destroy: 0 },
    
    { price: 1, succeed: 7500, asIs: 2500, fail: 0, destroy: 0 },
    { price: 1, succeed: 7000, asIs: 3000, fail: 0, destroy: 0 },
    { price: 1, succeed: 6500, asIs: 3500, fail: 0, destroy: 0 },
    { price: 1, succeed: 6000, asIs: 4000, fail: 0, destroy: 0 },
    { price: 1, succeed: 5500, asIs: 4500, fail: 0, destroy: 0 },
    
    { price: 2, succeed: 5000, asIs: 5000, fail: 0, destroy: 0 },
    { price: 2, succeed: 4500, asIs: 0, fail: 5500, destroy: 0 },
    { price: 2, succeed: 4000, asIs: 0, fail: 5940, destroy: 60 },
    { price: 2, succeed: 3500, asIs: 0, fail: 6370, destroy: 130 },
    { price: 2, succeed: 3000, asIs: 0, fail: 6860, destroy: 140 },
    
    { price: 3, succeed: 3000, asIs: 6790, fail: 0, destroy: 210 },
    { price: 3, succeed: 3000, asIs: 0, fail: 6790, destroy: 210 },
    { price: 3, succeed: 3000, asIs: 0, fail: 6790, destroy: 210 },
    { price: 3, succeed: 3000, asIs: 0, fail: 6720, destroy: 280 },
    { price: 3, succeed: 3000, asIs: 0, fail: 6720, destroy: 280 },
    
    { price: 4, succeed: 3000, asIs: 6300, fail: 0, destroy: 700 },
    { price: 4, succeed: 3000, asIs: 0, fail: 6300, destroy: 700 },
    { price: 4, succeed: 300, asIs: 0, fail: 7760, destroy: 1940 },
    { price: 4, succeed: 200, asIs: 0, fail: 6860, destroy: 2940 },
    { price: 4, succeed: 100, asIs: 0, fail: 5940, destroy: 3960 },
]
const MaxLevel = 25, TotalProbability = 10000;

let currentLevel = 0;
function printResult(){
    const star = document.getElementById('star');
    let starStr = "";
    for (let i = 0; i < MaxLevel; i++){
        if (i < currentLevel){ starStr += "★"; } else{ starStr += "☆"; }
        if (i%5 == 4 && i+1 != MaxLevel){ starStr += " "; }
    }
    star.innerHTML = starStr;

    const level = document.getElementById('level');
    if (currentLevel == MaxLevel){ level.innerHTML = currentLevel + "성 (MAX)"; }
    else{ level.innerHTML = currentLevel + "성 > " + (currentLevel+1) + "성"; }

    const succeed = document.getElementById('succeed');
    const fail = document.getElementById('fail');
    const destroy = document.getElementById('destroy');
    if (currentLevel == MaxLevel){
        succeed.innerHTML = "";
        fail.innerHTML = "";
        destroy.innerHTML = "";
    }
    else{
        succeed.innerHTML = "성공확률: " + (probability[currentLevel].succeed*100/TotalProbability) + "%";
        if (probability[currentLevel].fail == 0){ fail.innerHTML = "실패(유지)확률: " + (probability[currentLevel].asIs*100/TotalProbability) + "%"; }
        else{ fail.innerHTML = "실패(하락)확률: " + (probability[currentLevel].fail*100/TotalProbability) + "%"; }
        destroy.innerHTML = "파괴확률: " + (probability[currentLevel].destroy*100/TotalProbability) + "%";
    }
}

function powerUp(noDestroy){
    /* for (let i = 0; i < MaxLevel; i++){
        let p = probability[i];
        let total = p.succeed + p.asIs + p.fail + p.destroy;
        if (total != TotalProbability){ console.error("Probability Error", i); }
    }
    console.log("No Problem"); */
    
    currentLevel += 1; if (currentLevel > MaxLevel){ currentLevel = 0; }
    printResult();
}