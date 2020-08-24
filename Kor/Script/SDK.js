const dy = [-1, 0, 1, 0], dx = [0, 1, 0, -1];

let tagMap0, tagMap1, tagMap2;
let borderMap, borderCount;
let index, size;
let edit;

function main(){
    index = new Object();
    size = new Object();

    let str1 = prompt("Sudoku board's (width height)");
    let idx1 = str1.indexOf(' ');
    let width = parseInt(str1.substring(0, idx1));
    let height = parseInt(str1.substring(idx1+1, str1.length));

    console.log(width, height);

    let str2 = prompt("Hint's height, width (Up Right Down Left)");
    let idx21 = str2.indexOf(' ');
    let idx22 = str2.substring(idx21+1, str2.length).indexOf(' ') + idx21+1;
    let idx23 = str2.substring(idx22+1, str2.length).indexOf(' ') + idx22+1;
    let up = parseInt(str2.substring(0, idx21));
    let right = parseInt(str2.substring(idx21+1, idx22));
    let down = parseInt(str2.substring(idx22+1, idx23));
    let left = parseInt(str2.substring(idx23+1, str2.length));

    console.log(up, right, down, left);

    index.h1 = up; size.h1 = up;
    index.h2 = index.h1 + height; size.h2 = height;
    index.h3 = index.h2 + down; size.h3 = down;
    
    index.w1 = left; size.w1 = left;
    index.w2 = index.w1 + width; size.w2 = width;
    index.w3 = index.w2 + right; size.w3 = right;

    console.log(index.h1, index.h2, index.h3);
    console.log(index.w1, index.w2, index.w3);

    init();
}

function init(){
    edit = true;
    tagMap0 = new Array(index.h3);
    tagMap1 = new Array(index.h3);
    borderMap = new Array(index.h3);
    borderCount = 0;

    let board = document.getElementById('board');

    for (let i = 0; i < index.h3; i++){
        tagMap0[i] = new Array(index.w3);
        tagMap1[i] = new Array(index.w3);
        borderMap[i] = new Array(index.w3);

        let tr = document.createElement('tr');
        tr.className = "tr ";

        for (let j = 0; j < index.w3; j++){
            let td = document.createElement('td');
            td.className += "td ";
            if (index.h1 <= i && i < index.h2 && index.w1 <= j && j < index.w2){
                td.className += "map ";
                console.log(i, j, 'm');
            }
            else{
                td.className += "hint ";
                console.log(i, j, 'h');
            }

            let div1 = document.createElement('div');
            div1.className = "backTag ";

            tagMap0[i][j] = td;
            tagMap1[i][j] = div1;

            td.appendChild(div1);
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }

    let buttons = document.getElementById('buttonContainer'), button;
    button = document.createElement('button');
    button.onclick = function(){ makeBorder(); };
    button.innerText = "Make Border";
    buttons.appendChild(button);
}

function makeBorder(){
    let str = prompt("Input Coordinate (y,x y,x y,x ...)");
    MakeBorder(str);
}

function MakeBorder(str){
    borderCount += 1;
    let points = str.split(' ');
    console.log(points);
    for (let i = 0; i < points.length; i++){
        let point = points[i];
        console.log(point);
        let idx = point.indexOf(',');
        let y = parseInt(point.substring(0, idx)); y -= 1; y += size.h1;
        let x = parseInt(point.substring(idx+1, point.length)); x -= 1; x += size.w1;
        console.log(idx);
        console.log(y, x, "i");

        borderMap[y][x] = borderCount;
    }
    for (let i = 0; i < points.length; i++){
        let point = points[i];
        let idx = point.indexOf(',');
        let y = parseInt(point.substring(0, idx)); y -= 1; y += size.h1;
        let x = parseInt(point.substring(idx+1, point.length)); x -= 1; x += size.w1;

        for (let k = 0; k < 4; k++){
            let yy = y + dy[k], xx = x + dx[k];
            if (index.h1 > yy || yy >= index.h2 || index.w1 > xx || xx >= index.w2 || 
                borderMap[yy][xx] != borderCount){
                    if (k == 0) tagMap0[y][x].className += "borderUp ";
                    if (k == 1) tagMap0[y][x].className += "borderRight ";
                    if (k == 2) tagMap0[y][x].className += "borderDown ";
                    if (k == 3) tagMap0[y][x].className += "borderLeft ";
            }
        }
    }
}