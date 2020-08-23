let index, size;

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
    let board = document.getElementById('board');

    for (let i = 0; i < index.h3; i++){
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
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
}