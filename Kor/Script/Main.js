function init(){
    arr = new Array(32);
    arr[1] = {
        symb: "HP",
        name: "hibye1217's Projects",
        desc: "Project Count : 11",
        down: 2,
        right: 0,
        start: 0,
        end: 0,
        link: "NULL"
    }
        arr[2] = {
            symb: "MJ",
            name: "Math with Jax",
            desc: "MathJax를 사용하여 Math를 설명하였음.",
            down: 13,
            right: 4,
            start: 0,
            end: 0,
            link: "NULL"
        }
            arr[13] = {
                symb: "FQ",
                name: "Friend's Question",
                desc: "친구의 수학적 질문에 답변하였음.",
                down: 12,
                right: 3,
                start: 0,
                end: 0,
                link: "NULL"
            }
                arr[12] = {
                    symb: "SC",
                    name: "Sqrt and Cbrt",
                    desc: "제곱근, 세제곱근.",
                    down: 0,
                    right: 15,
                    start: 0,
                    end: 0,
                    link: "./MJ/FQ/SC.html"
                }
                arr[15] = {
                    symb: "FP",
                    name: "Factor of Prime",
                    desc: "소수, 제곱수.",
                    down: 0,
                    right: 0,
                    start: 0,
                    end: 0,
                    link: "./MJ/FQ/FP.html"
                }
            arr[3] = {
                symb: "LFF",
                name: "leonld94's Fibonacci Function",
                desc: "leonld94님이 만든 피보나치 함수를 설명함.",
                down: 0,
                right: 9,
                start: 0,
                end: 0,
                link: "./MJ/LFF.html"
            }
            arr[9] = {
                symb: "SFL",
                name: "Special Function's Logic",
                desc: "Special Function의 로직을 설명함.",
                down: 0,
                right: 18,
                start: 0,
                end: 0,
                link: "./MJ/SFL.html"
            }
            arr[18] = {
                symb: "PF",
                name: "Pascal's Fibonacci",
                desc: "LFF 주석. 파스칼의 삼각형에서 대각선을 그으면 피보나치 함수가 나오는 이유를 증명항.",
                down: 0,
                right: 0,
                start: 0,
                end: 0,
                link: "./MJ/PF.html"
            }
        arr[4] = {
            symb: "PP",
            name: "Private Project",
            desc: "만들고 싶어서 만들었어요.",
            down: 14,
            right: 7,
            start: 0,
            end: 0,
            link: "NULL"
        }
            arr[14] = {
                symb: "WP",
                name: "Word Play",
                desc: "단어를 가지고 놀아봤어요.",
                down: 5,
                right: 10,
                start: 0,
                end: 0,
                link: "NULL"
            }
                arr[5] = {
                    symb: "CS",
                    name: "Chemical Sentence",
                    desc: "화학 원소로 문장을 만들었어요.",
                    down: 0,
                    right: 0,
                    start: 0,
                    end: 0,
                    link: "./PP/WP/CS.html"
                }
            arr[10] = {
                symb: "EVS",
                name: "18789",
                desc: "만들어봤어요.",
                down: 0,
                right: 6,
                start: 0,
                end: 0,
                link: "./PP/EVS.html"
            }
            arr[6] = {
                symb: "SF",
                name: "Special Function",
                desc: "N개의 점을 지나는 함수를 만들었어요.",
                down: 0,
                right: 11,
                start: 0,
                end: 0,
                link: "./PP/SF.html"
            }
            arr[11] = {
                symb: "SB",
                name: "Scoreboard",
                desc: "점수판이 필요해서 만들었어요.",
                down: 0,
                right: 0,
                start: 0,
                end: 0,
                link: "./PP/SB.html"
            }
        arr[7] = {
            symb: "EG",
            name: "Existed Game",
            desc: "이미 있는 거지만 저퀄리티로 다시 만들었어요!",
            down: 8,
            right: 16,
            start: 0,
            end: 0,
            link: "NULL"
        }
            arr[8] = {
                symb: "TTT",
                name: "Tic Tac Toe",
                desc: "틱택토 만들었어요!",
                down: 0,
                right: 0,
                start: 0,
                end: 0,
                link: "./EG/TTT.html"
            }
        arr[16] = {
            symb: "PT",
            name: "Programming Talking",
            desc: "프로그래밍으로 대화하자!",
            down: 17,
            right: 0,
            start: 0,
            end: 0,
            link: "NULL"
        }
            arr[17] = {
                symb: "LRM",
                name: "leonld94's Recursive Multiplication",
                desc: "leonld94님의 구구단 재귀함수 설명해줄게!",
                down: 0,
                right: 0,
                start: 0,
                end: 0,
                link: "./PT/LRM.html"
            }
    len = 18;
    pos = new Array(32);
    hide = new Array(32);
    for (let i = 1; i <= len; i++){
        pos[i] = {x: 0, y: 0};
        hide[i] = (i != 1);
    }
}

var arr, pos, hide, len, cnt = 0, num = 11;
var R=120, S=48, A=100, B=2, M=4, F=14;
var deep = 0;
var parent;
init();
findPos(1, 0);

let margStyle = function(x,y,i){
    return    'position: absolute;'
            + 'width: ' + (S+B*2+M*2) + 'px;'
            + 'height: ' + (S+B*2+M*2) + 'px;'
            + 'border-radius: ' + (S+B*2+M*2) + 'px;'
            + 'top: ' + (y-M) + 'px;'
            + 'left: ' + (x-M) + 'px;'
            + 'display: flex;'
            + 'justify-content: center;'
            + 'align-items: center;'
}
let rectStyle = function(x,y){
    return    'position: absolute;'
            + 'width: ' + S + 'px;'
            + 'height: ' + S + 'px;'
            + 'border-radius: ' + S + 'px;'
            + 'border-width: ' + B + 'px;'
            + 'border-style: dashed;'
            + 'display: flex;'
            + 'justify-content: center;'
            + 'align-items: center;'
            + 'font-size: ' + F + 'px'
}
let lineStyle = function(dis,ang,x,y){
    return    'background-color: #000000;'
            + 'width: ' + dis + 'px;'
            + 'height: 1px;'
            + '-moz-transform: rotate(' + ang + 'rad);'
            + '-webkit-transform: rotate(' + ang + 'rad);'
            + '-o-transform: rotate(' + ang + 'rad);'  
            + '-ms-transform: rotate(' + ang + 'rad);'  
            + 'position: absolute;'
            + 'top: ' + y + 'px;'
            + 'left: ' + x + 'px;'
}

function noShow(now){
    hide[now] = true;
    if (arr[now].down != 0) noShow(arr[now].down);
    if (arr[now].right != 0) noShow(arr[now].right);
}

function show(now){
    hide[now] = false;
    if (arr[now].right != 0) show(arr[now].right);
}

function drawProject(){
    parent = document.getElementById('projects');
    parent.innerHTML = "";
    drawLine(1, 0);
    drawRect();
}

function drawRect(){
    for (let i = 1; i <= len; i++){
        if (hide[i]) continue;
        let tag = document.createElement('div');
        if (arr[i].down == 0) tag.className = "project";
        else tag.className = "folder";
        let x = pos[i].x - (S/2 + B), y = pos[i].y - (S/2 + B);
        tag.setAttribute('style', margStyle(x,y,i));
        tag.title = arr[i].name + " | " + arr[i].desc;
        if (arr[i].down == 0){
            tag.onclick = function(t){
                location.href = arr[i].link;
            }
        }
        else{
            tag.onclick = function(t){
                if (hide[arr[i].down]) show(arr[i].down);
                else noShow(arr[i].down);
                drawProject();
            }
        }

        let div = document.createElement('div');
        div.innerHTML = arr[i].symb;
        x = pos[i].x - (S/2 + B), y = pos[i].y - (S/2 + B);
        div.setAttribute('style', rectStyle(x,y));
        tag.appendChild(div);

        parent.appendChild(tag);
    }
}

function drawLine(now, par){
    if (arr[now].down != 0) drawLine(arr[now].down, now);
    if (arr[now].right != 0) drawLine(arr[now].right, par);
    if (par != 0){
        if (hide[now] || hide[par]) return;
        let ax = pos[now].x, ay = pos[now].y;
        let bx = pos[par].x, by = pos[par].y;
        let dx = ax-bx, dy = ay-by;
        let dis = Math.sqrt(dx*dx + dy*dy);
        let sx = (ax+bx)/2, sy = (ay+by)/2;
        let x = sx - dis/2, y = sy;
        let ang = Math.PI - Math.atan2(-dy, dx);
        let div = document.createElement('div');
        div.setAttribute('style', lineStyle(dis,ang,x,y));
        parent.appendChild(div);
    }
}

function findPos(now, depth){
    if (depth > deep) deep = depth;
    let lst = cnt+1;
    if (arr[now].down != 0) findPos(arr[now].down, depth+1);
    else cnt += 1;
    let ctn = cnt;
    if (arr[now].right != 0) findPos(arr[now].right, depth);
    // [lst, cnt]
    arr[now].start = lst;
    arr[now].end = ctn;
    console.log(now, arr[now].start, arr[now].end);
    let count = ctn-lst+1;
    let avg = (lst+ctn)/2-1;
    let angle = 2*Math.PI*(avg+0.5) / num;
    pos[now] = {x: (Math.sin(angle)*R*depth), y: -(Math.cos(angle)*R*depth)};
}