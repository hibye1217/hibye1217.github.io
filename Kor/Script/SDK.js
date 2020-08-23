function main(){
    loadNewSudokuBoard(9, 9, 3, 3);
}

function loadNewSudokuBoard(w, h, n, m){
    let board = document.getElementById('board');
    board.innerHTML = "";

    for (let i = 0; i < w; i++){
        let tr = document.createElement('tr');
        for (let j = 0; j < h; j++){
            let td = document.createElement('td');
            if (i % n == 0) td.className += "borderUp ";
            if (i % n == n-1) td.className += "borderDown ";
            if (j % m == 0) td.className += "borderLeft ";
            if (j % m == m-1) td.className += "borderRight ";
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }
}