function init(){
    arr = new Array(2);
    arr[1] = {
        symb: "HP",
        name: "hibye1217's Projects",
        desc: "Project Count : 0",
        down: 0,
        right: 0,
        start: 0,
        end: 0,
        link: "NULL"
    }
    len = 1;
    pos = new Array(2);
    hide = new Array(2);
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