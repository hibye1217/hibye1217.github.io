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

let hanbyeolCatch = false;
let currentLevel = 0, failCombo = 0, totalUsed = 0;
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
    else if (failCombo == 2){
        succeed.innerHTML = "성공확률: 100%";
        fail.innerHTML = "";
        destroy.innerHTML = "";
    }
    else if (hanbyeolCatch){
        let val = probability[currentLevel].succeed / 20;
        succeed.innerHTML = "성공확률: " + ((probability[currentLevel].succeed+val)*100/TotalProbability) + "%";
        if (probability[currentLevel].fail == 0){ fail.innerHTML = "실패(유지)확률: " + ((probability[currentLevel].asIs-val)*100/TotalProbability) + "%"; }
        else{ fail.innerHTML = "실패(하락)확률: " + ((probability[currentLevel].fail-val)*100/TotalProbability) + "%"; }
        destroy.innerHTML = "파괴확률: " + (probability[currentLevel].destroy*100/TotalProbability) + "%";
    }
    else{
        succeed.innerHTML = "성공확률: " + (probability[currentLevel].succeed*100/TotalProbability) + "%";
        if (probability[currentLevel].fail == 0){ fail.innerHTML = "실패(유지)확률: " + (probability[currentLevel].asIs*100/TotalProbability) + "%"; }
        else{ fail.innerHTML = "실패(하락)확률: " + (probability[currentLevel].fail*100/TotalProbability) + "%"; }
        destroy.innerHTML = "파괴확률: " + (probability[currentLevel].destroy*100/TotalProbability) + "%";
    }

    const used = document.getElementById('used');
    used.innerHTML = "사용한 별조각 개수: " + totalUsed + "개";

    const normal = document.getElementById('normal');
    const noDestroy = document.getElementById('noDestroy');
    const hanbyeolCatchTag = document.getElementById('hanbyeolCatch');
    normal.innerHTML = "강화 - ★" + probability[currentLevel].price;
    if (currentLevel > 17 || probability[currentLevel].destroy == 0){ noDestroy.innerHTML = "파괴 방지 강화 (사용 불가)"; }
    else{ noDestroy.innerHTML = "파괴 방지 강화 - ★" + (probability[currentLevel].price * 5); }
    if (hanbyeolCatch){ hanbyeolCatchTag.innerHTML = "한별캐치 끄기"; } else{ hanbyeolCatchTag.innerHTML = "한별캐치 켜기"; }
}

let randomValue = new Uint32Array(1);
function powerUp(noDestroy){
    /* for (let i = 0; i < MaxLevel; i++){
        let p = probability[i];
        let total = p.succeed + p.asIs + p.fail + p.destroy;
        if (total != TotalProbability){ console.error("Probability Error", i); }
    }
    console.log("No Problem"); */
    
    // console.log(randomResult);
    let succeed = probability[currentLevel].succeed;
    let asIs = probability[currentLevel].asIs;
    let fail = probability[currentLevel].fail;
    let destroy = probability[currentLevel].destroy;
    if (noDestroy){
        if (12 > currentLevel || currentLevel >= 17){
            console.info("파괴 방지 사용 불가");
            return;
        }
        console.info("파괴 방지!");
        if (asIs != 0){ asIs += destroy; } else{ fail += destroy; }
        destroy = 0;
    }
    if (hanbyeolCatch){
        let val = succeed/20;
        succeed += val;
        if (asIs != 0){ asIs -= val; } else{ fail -= val; }
        console.info("한별캐치~");
    }

    if (noDestroy){ totalUsed += probability[currentLevel].price*5; }
    else{ totalUsed += probability[currentLevel].price; }

    window.crypto.getRandomValues(randomValue);
    // console.log(randomValue);
    while (randomValue[0] >= 4294960000){ window.crypto.getRandomValues(randomValue); }
    let randomResult = randomValue[0] % 10000;
    console.info(randomResult, "/", succeed, asIs, fail, destroy);
    if (randomResult < succeed || failCombo == 2){
        console.log("강화 성공!", currentLevel, ">", currentLevel+1);
        currentLevel += 1; failCombo = 0;
    }
    else{
        randomResult -= succeed;
        if (randomResult < asIs){
            console.log("강화 실패...", currentLevel, ">", currentLevel); 
            currentLevel = currentLevel; failCombo = 0;
        }
        else{
            randomResult -= asIs;
            if (randomResult < fail){
                console.log("강화 실패...", currentLevel, ">", currentLevel-1);
                currentLevel -= 1; failCombo += 1;
            }
            else{
                console.log("프로필 파괴됨......", currentLevel, ">", 12);
                currentLevel = 12; failCombo = 0;
            }
        }
    }
    // currentLevel += 1; if (currentLevel > MaxLevel){ currentLevel = 0; }

    printResult();
}
function hanbyeol(){ hanbyeolCatch = !hanbyeolCatch; printResult(); }