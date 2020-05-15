function init(){
    arr = new Array(32);
    arr[1] = {
        symb: "HP",
        name: "hibye1217's Projects",
        desc: "Project Count : 9",
        down: 2,
        right: 0,
        link: "NULL"
    }
        arr[2] = {
            symb: "MJ",
            name: "Math with Jax",
            desc: "MathJax를 사용하여 Math를 설명하였음.",
            down: 13,
            right: 4,
            link: "NULL"
        }
            arr[13] = {
                symb: "FQ",
                name: "Friend's Question",
                desc: "친구의 수학적 질문에 답변하였음.",
                down: 12,
                right: 3,
                link: "NULL"
            }
                arr[12] = {
                    symb: "SC",
                    name: "Sqrt and Cbrt",
                    desc: "제곱근, 세제곱근.",
                    down: 0,
                    right: 15,
                    link: "./MJ/FQ/SC.html"
                }
                arr[15] = {
                    symb: "FP",
                    name: "Factor of Prime",
                    desc: "소수, 제곱수.",
                    down: 0,
                    right: 0,
                    link: "./MJ/FQ/FP.html"
                }
            arr[3] = {
                symb: "LFF",
                name: "leonld94's Fibonacci Function",
                desc: "leonld94님이 만든 피보나치 함수를 설명함.",
                down: 0,
                right: 9,
                link: "./MJ/LFF.html"
            }
            arr[9] = {
                symb: "SFL",
                name: "Special Function : Logic",
                desc: "Special Function의 로직을 설명함.",
                down: 0,
                right: 0,
                link: "./MJ/SFL.html"
            }
        arr[4] = {
            symb: "PP",
            name: "Private Project",
            desc: "만들고 싶어서 만들었어요.",
            down: 14,
            right: 7,
            link: "NULL"
        }
            arr[14] = {
                symb: "WP",
                name: "Word Play",
                desc: "단어를 가지고 놀아봤어요.",
                down: 5,
                right: 10,
                link: "NULL"
            }
                arr[5] = {
                    symb: "CS",
                    name: "Chemical Sentence",
                    desc: "화학 원소로 문장을 만들었어요.",
                    down: 0,
                    right: 0,
                    link: "./PP/WP/CS.html"
                }
            arr[10] = {
                symb: "18789",
                name: "18789",
                desc: "만들어봤어요.",
                down: 0,
                right: 6,
                link: "./PP/18789.html"
            }
            arr[6] = {
                symb: "SF",
                name: "Special Function",
                desc: "N개의 점을 지나는 함수를 만들었어요.",
                down: 0,
                right: 11,
                link: "./PP/SF.html"
            }
            arr[11] = {
                symb: "SB",
                name: "Scoreboard",
                desc: "점수판이 필요해서 만들었어요.",
                down: 0,
                right: 0,
                link: "./PP/SB.html"
            }
        arr[7] = {
            symb: "EG",
            name: "Existed Game",
            desc: "이미 있는 거지만 저퀄리티로 다시 만들었어요!",
            down: 8,
            right: 16,
            link: "NULL"
        }
            arr[8] = {
                symb: "TTT",
                name: "Tic Tac Toe",
                desc: "틱택토 만들었어요!",
                down: 0,
                right: 0,
                link: "./EG/TTT.html"
            }
        arr[16] = {
            symb: "PT",
            name: "Programming Talking",
            desc: "프로그래밍으로 대화하자!",
            down: 17,
            right: 0,
            link: "NULL"
        }
            arr[17] = {
                symb: "LRM",
                name: "leonld94's Recursive Multiplication",
                desc: "leonld94님의 구구단 재귀함수 설명해줄게!",
                down: 0,
                right: 0,
                link: "./PT/LRM.html"
            }
    len = 17;
    pos = new Array(32);
    hide = new Array(32);
    for (let i = 1; i <= len; i++){
        pos[i] = {x: 0, y: 0};
        hide[i] = (i != 1);
    }
}