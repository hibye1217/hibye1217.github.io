const circleSize = 80;
const boldLine = 5, thinLine = 1;
let workCount, workList;

function Run(){
    const inputTag = document.getElementById('input');
    const outputTag = document.getElementById('output');
    const inp = inputTag.value.trimRight().split('\n');
    while (inp[ inp.length-1 ] == []){ inp.pop(); }
    for (let i = 0; i < inp.length; i++){ inp[i] = inp[i].trim().split(' '); }

    inputTag.innerHTML = ""; outputTag.innerHTML = "";

    if (inp[0].length != 1){ outputTag.innerHTML = "작업의 개수에 오류가 있습니다."; return; }
    if (!isInt(inp[0][0]) || parseInt(inp[0][0]) <= 0){ outputTag.innerHTML = "작업의 개수가 자연수가 아닙니다."; return; }
    workCount = parseInt(inp[0][0]); workList = new Array(workCount+1);

    if (inp[1].length != workCount){ outputTag.innerHTML = "작업의 개수와 입력받은 수의 개수가 다릅니다."; return; }
    for (let i = 0; i < workCount; i++){
        if (!isInt(inp[1][i]) || parseInt(inp[1][i]) <= 0){ outputTag.innerHTML = "작업에 걸리는 시간이 자연수가 아닙니다."; return; }
        workList[i+1] = {
            index: i+1,
            time: parseInt(inp[1][i]), total: 0,
            before: [], after: [],
            xCoor: 0, yCoor: 0,
            x: 0, y: 0
        };
    }

    if (inp[2].length != 1){ outputTag.innerHTML = "선후관계의 개수에 오류가 있습니다."; return; }
    if (!isInt(inp[2][0]) || parseInt(inp[2][0]) < 0){ outputTag.innerHTML = "선후관계의 개수가 정수가 아닙니다."; return; }
    let adjCount = parseInt(inp[2][0]);

    if (inp.length != adjCount+3){ outputTag.innerHTML = "선후관계의 개수와 입력받은 관계의 개수가 다릅니다."; return; }
    for (let i = 3; i < inp.length; i++){
        if (inp[i].length != 2){ outputTag.innerHTML = "선후관계의 입력에 오류가 있습니다."; return; }
        if (!isInt(inp[i][0]) || parseInt(inp[i][0]) <= 0 || parseInt(inp[i][0]) > workCount){ outputTag.innerHTML = "작업의 번호에 오류가 있습니다."; return; }
        if (!isInt(inp[i][1]) || parseInt(inp[i][1]) <= 0 || parseInt(inp[i][1]) > workCount){ outputTag.innerHTML = "작업의 번호에 오류가 있습니다."; return; }
        let i1 = parseInt(inp[i][0]), i2 = parseInt(inp[i][1]);
        console.log(i1, i2);
        workList[i1].after.push(i2); workList[i2].before.push(i1);
    }
    
    let q = new Array();
    let cnt = new Array(workCount+1).fill(0);
    for (let i = 1; i <= workCount; i++){
        if (workList[i].before.length == 0){
            q.push(i);
        }
    }
    let right = 0;
    for (let i = 1; i <= workCount; i++){
        if (q.length == 0){ outputTag.innerHTML = "선후관계에 모순이 있습니다."; return; }
        let now = q[0], mx = 0, mxt = 0;
        workList[now].before.forEach(pre => {
            mx = Math.max(mx, workList[pre].xCoor);
            mxt = Math.max(mxt, workList[pre].total);
        });
        workList[now].xCoor = mx + 1;
        workList[now].total = mxt + workList[now].time;
        right = Math.max(right, mx + 1);
        workList[now].after.forEach(nxt => {
            cnt[nxt] += 1;
            if (workList[nxt].before.length == cnt[nxt]){
                q.push(nxt);
            }
        });
        q.shift();
    }

    let xCnt = new Array(right+1).fill(0);
    for (let i = 1; i <= workCount; i++){
        xCnt[ workList[i].xCoor ] += 1;
        workList[i].yCoor = xCnt[ workList[i].xCoor ];
    }

    const rx = outputTag.offsetWidth;
    const ry = outputTag.offsetHeight;
    console.log(rx, ry);

    for (let i = 1; i <= workCount; i++){
        workList[i].x = ( ( workList[i].xCoor*100 / (right+1) )*rx / 100) - (circleSize/2);
        workList[i].y = ( ( workList[i].yCoor*100 / ( xCnt[ workList[i].xCoor ] + 1 ) )*ry / 100 ) - (circleSize/2);
    }

    for (let i = 1; i <= workCount; i++){
        const circle = document.createElement('div');
        circle.style.display = "inline-block";
        circle.style.width = circleSize + "px";
        circle.style.height = circleSize + "px";
        circle.style.border = "1px solid black";
        circle.style.borderRadius = circleSize + "px";
        circle.style.backgroundColor = "#FFFFFF";

        circle.innerHTML =
        "<div style='display:flex;justify-content:center;align-items:center; height: 30%; font-weight: bold; font-size: " + (circleSize/5) + "px'>" + workList[i].time + "</div>"+
        "<div style='display:flex;justify-content:center;align-items:center; height: 40%; font-weight: bold; font-size: " + (circleSize/3) + "px'>" + i + "</div>" +
        "<div style='display:flex;justify-content:center;align-items:center; height: 30%; font-weight: bold; font-size: " + (circleSize/5) + "px'>" + workList[i].total + "</div>";

        circle.style.position = "absolute";
        circle.style.top = workList[i].y + "px";
        circle.style.left = workList[i].x + "px";
        circle.style.zIndex = 2763;

        outputTag.append(circle);
    }

    for (let i1 = 1; i1 <= workCount; i1++){
        workList[i1].after.forEach(i2 => {
            const line = document.createElement('div');

            let flg = true;
            if (workList[i1].total + workList[i2].time == workList[i2].total){ flg = true; }
            else{ flg = false; }

            let x1 = workList[i1].x + circleSize/2, y1 = workList[i1].y + circleSize/2;
            let x2 = workList[i2].x + circleSize/2, y2 = workList[i2].y + circleSize/2;
            let dx = x2-x1, dy = y2-y1;
            let dis = Math.sqrt(dx*dx + dy*dy);
            let sx = (x1+x2) / 2, sy = (y1+y2) / 2;
            let x = sx - dis/2, y = sy - (flg ? boldLine/2 : thinLine/2);
            let ang = Math.PI - Math.atan2(-dy, dx);

            line.setAttribute('style',
                  'width: ' + dis + 'px;'
                + 'height: ' + (flg ? boldLine : thinLine) + 'px;'
                + 'background-color: #000000;'

                + '-moz-transform: rotate(' + ang + 'rad);'
                + '-webkit-transform: rotate(' + ang + 'rad);'
                + '-o-transform: rotate(' + ang + 'rad);'  
                + '-ms-transform: rotate(' + ang + 'rad);'  

                + 'position: absolute;'
                + 'top: ' + y + 'px;'
                + 'left: ' + x + 'px;'
            );

            outputTag.append(line);
        });
    }
}