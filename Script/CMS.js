let arr, n, nxt;
fillArray();

let input, output;
let str, len;

let ans = [], res;
function btk(idx){
    if (idx == len){
        let l = ans.length;
        for (let i = 0; i < l; i++){
            output.innerHTML += arr[ ans[i] ].sym;
            if (i+1 == l){ output.innerHTML += "<br>"; }
            else{ output.innerHTML += " "; }
        }
        res = true;
        return;
    }
    let c1 = atoi(str[idx]) - atoi('a') + 1;
    if (nxt[c1][0] != 0){ ans.push(nxt[c1][0]); btk(idx+1); ans.pop(); }
    if (idx+1 != len){
        let c2 = atoi(str[idx+1]) - atoi('a') + 1;
        if (nxt[c1][c2] != 0){ ans.push(nxt[c1][c2]); btk(idx+2); ans.pop(); }
    }
}

function Calculate(){
    input = document.getElementById('input');
    output = document.getElementById('output'); output.innerHTML = "";
    str = input.value; len = str.length;
    if ( !isAlphabetic(str) ){
        output.innerHTML = "<span style='color:#FF0000'>입력 오류</span>";
        return;
    }

    str = str.toLowerCase();
    res = false; btk(0);
    if (!res){
        output.innerHTML = "<span style='color:#0000FF'>맞는 경우가 없습니다.</span>";
    }
}

function fillArray(){
    n = 118;
    arr = new Array(120); nxt = new Array(30);
    for (let i = 0; i <= 26; i++){ nxt[i] = new Array(30); nxt[i].fill(0); }
    arr[1] = { id: 1, sym: 'H', eng: 'Hydrogen', kor: '수소' }; nxt[8][0] = 1;
	arr[2] = { id: 2, sym: 'He', eng: 'Helium', kor: '헬륨' }; nxt[8][5] = 2;
	arr[3] = { id: 3, sym: 'Li', eng: 'Lithium', kor: '리튬' }; nxt[12][9] = 3;
	arr[4] = { id: 4, sym: 'Be', eng: 'Beryllium', kor: '베릴륨' }; nxt[2][5] = 4;
	arr[5] = { id: 5, sym: 'B', eng: 'Boron', kor: '붕소' }; nxt[2][0] = 5;
	arr[6] = { id: 6, sym: 'C', eng: 'Carbon', kor: '탄소' }; nxt[3][0] = 6;
	arr[7] = { id: 7, sym: 'N', eng: 'Nitrogen', kor: '질소' }; nxt[14][0] = 7;
	arr[8] = { id: 8, sym: 'O', eng: 'Oxygen', kor: '산소' }; nxt[15][0] = 8;
	arr[9] = { id: 9, sym: 'F', eng: 'Fluorine', kor: '플루오린' }; nxt[6][0] = 9;
	arr[10] = { id: 10, sym: 'Ne', eng: 'Neon', kor: '네온' }; nxt[14][5] = 10;
	arr[11] = { id: 11, sym: 'Na', eng: 'Sodium', kor: '나트륨' }; nxt[14][1] = 11;
	arr[12] = { id: 12, sym: 'Mg', eng: 'Magnesium', kor: '마그네슘' }; nxt[13][7] = 12;
	arr[13] = { id: 13, sym: 'Al', eng: 'Aluminium', kor: '알루미늄' }; nxt[1][12] = 13;
	arr[14] = { id: 14, sym: 'Si', eng: 'Silicon', kor: '규소' }; nxt[19][9] = 14;
	arr[15] = { id: 15, sym: 'P', eng: 'Phosphorus', kor: '인' }; nxt[16][0] = 15;
	arr[16] = { id: 16, sym: 'S', eng: 'Sulfur', kor: '황' }; nxt[19][0] = 16;
	arr[17] = { id: 17, sym: 'Cl', eng: 'Chlorine', kor: '염소' }; nxt[3][12] = 17;
	arr[18] = { id: 18, sym: 'Ar', eng: 'Argon', kor: '아르곤' }; nxt[1][18] = 18;
	arr[19] = { id: 19, sym: 'K', eng: 'Potassium', kor: '칼륨' }; nxt[11][0] = 19;
	arr[20] = { id: 20, sym: 'Ca', eng: 'Calcium', kor: '칼슘' }; nxt[3][1] = 20;
	arr[21] = { id: 21, sym: 'Sc', eng: 'Scandium', kor: '스칸듐' }; nxt[19][3] = 21;
	arr[22] = { id: 22, sym: 'Ti', eng: 'Titanium', kor: '티타늄' }; nxt[20][9] = 22;
	arr[23] = { id: 23, sym: 'V', eng: 'Vanadium', kor: '바나듐' }; nxt[22][0] = 23;
	arr[24] = { id: 24, sym: 'Cr', eng: 'Chromium', kor: '크롬' }; nxt[3][18] = 24;
	arr[25] = { id: 25, sym: 'Mn', eng: 'Manganese', kor: '망가니즈' }; nxt[13][14] = 25;
	arr[26] = { id: 26, sym: 'Fe', eng: 'Iron', kor: '철' }; nxt[6][5] = 26;
	arr[27] = { id: 27, sym: 'Co', eng: 'Cobalt', kor: '코발트' }; nxt[3][15] = 27;
	arr[28] = { id: 28, sym: 'Ni', eng: 'Nickel', kor: '니켈' }; nxt[14][9] = 28;
	arr[29] = { id: 29, sym: 'Cu', eng: 'Copper', kor: '구리' }; nxt[3][21] = 29;
	arr[30] = { id: 30, sym: 'Zn', eng: 'Zinc', kor: '아연' }; nxt[26][14] = 30;
	arr[31] = { id: 31, sym: 'Ga', eng: 'Gallium', kor: '갈륨' }; nxt[7][1] = 31;
	arr[32] = { id: 32, sym: 'Ge', eng: 'Germanium', kor: '게르마늄' }; nxt[7][5] = 32;
	arr[33] = { id: 33, sym: 'As', eng: 'Arsenic', kor: '비소' }; nxt[1][19] = 33;
	arr[34] = { id: 34, sym: 'Se', eng: 'Selenium', kor: '셀레늄' }; nxt[19][5] = 34;
	arr[35] = { id: 35, sym: 'Br', eng: 'Bromine', kor: '브로민' }; nxt[2][18] = 35;
	arr[36] = { id: 36, sym: 'Kr', eng: 'Krypton', kor: '크립톤' }; nxt[11][18] = 36;
	arr[37] = { id: 37, sym: 'Rb', eng: 'Rubidium', kor: '루비듐' }; nxt[18][2] = 37;
	arr[38] = { id: 38, sym: 'Sr', eng: 'Strontium', kor: '스트론튬' }; nxt[19][18] = 38;
	arr[39] = { id: 39, sym: 'Y', eng: 'Yttrium', kor: '이트륨' }; nxt[25][0] = 39;
	arr[40] = { id: 40, sym: 'Zr', eng: 'Zirconium', kor: '지르코늄' }; nxt[26][18] = 40;
	arr[41] = { id: 41, sym: 'Nb', eng: 'Niobium', kor: '나이오븀' }; nxt[14][2] = 41;
	arr[42] = { id: 42, sym: 'Mo', eng: 'Molybdenum', kor: '몰리브데넘' }; nxt[13][15] = 42;
	arr[43] = { id: 43, sym: 'Tc', eng: 'Technetium', kor: '테크네튬' }; nxt[20][3] = 43;
	arr[44] = { id: 44, sym: 'Ru', eng: 'Ruthenium', kor: '루테늄' }; nxt[18][21] = 44;
	arr[45] = { id: 45, sym: 'Rh', eng: 'Rhodium', kor: '로듐' }; nxt[18][8] = 45;
	arr[46] = { id: 46, sym: 'Pd', eng: 'Palladium', kor: '팔라듐' }; nxt[16][4] = 46;
	arr[47] = { id: 47, sym: 'Ag', eng: 'Silver', kor: '은' }; nxt[1][7] = 47;
	arr[48] = { id: 48, sym: 'Cd', eng: 'Cadmium', kor: '카드뮴' }; nxt[3][4] = 48;
	arr[49] = { id: 49, sym: 'In', eng: 'Indium', kor: '인듐' }; nxt[9][14] = 49;
	arr[50] = { id: 50, sym: 'Sn', eng: 'Tin', kor: '주석' }; nxt[19][14] = 50;
	arr[51] = { id: 51, sym: 'Sb', eng: 'Antimony', kor: '안티모니' }; nxt[19][2] = 51;
	arr[52] = { id: 52, sym: 'Te', eng: 'Tellurium', kor: '텔루륨' }; nxt[20][5] = 52;
	arr[53] = { id: 53, sym: 'I', eng: 'Iodine', kor: '아이오딘' }; nxt[9][0] = 53;
	arr[54] = { id: 54, sym: 'Xe', eng: 'Xenon', kor: '제논' }; nxt[24][5] = 54;
	arr[55] = { id: 55, sym: 'Cs', eng: 'Caesium', kor: '세슘' }; nxt[3][19] = 55;
	arr[56] = { id: 56, sym: 'Ba', eng: 'Barium', kor: '바륨' }; nxt[2][1] = 56;
	arr[57] = { id: 57, sym: 'La', eng: 'Lanthanum', kor: '란타넘' }; nxt[12][1] = 57;
	arr[58] = { id: 58, sym: 'Ce', eng: 'Cerium', kor: '세륨' }; nxt[3][5] = 58;
	arr[59] = { id: 59, sym: 'Pr', eng: 'Praseodymium', kor: '프라세오디뮴' }; nxt[16][18] = 59;
	arr[60] = { id: 60, sym: 'Nd', eng: 'Neodymium', kor: '네오디뮴' }; nxt[14][4] = 60;
	arr[61] = { id: 61, sym: 'Pm', eng: 'Promethium', kor: '프로메튬' }; nxt[16][13] = 61;
	arr[62] = { id: 62, sym: 'Sm', eng: 'Samarium', kor: '사마륨' }; nxt[19][13] = 62;
	arr[63] = { id: 63, sym: 'Eu', eng: 'Europium', kor: '유로퓸' }; nxt[5][21] = 63;
	arr[64] = { id: 64, sym: 'Gd', eng: 'Gadolinium', kor: '가돌리늄' }; nxt[7][4] = 64;
	arr[65] = { id: 65, sym: 'Tb', eng: 'Terbium', kor: '터븀' }; nxt[20][2] = 65;
	arr[66] = { id: 66, sym: 'Dy', eng: 'Dysprosium', kor: '디스프로슘' }; nxt[4][25] = 66;
	arr[67] = { id: 67, sym: 'Ho', eng: 'Holmium', kor: '홀뮴' }; nxt[8][15] = 67;
	arr[68] = { id: 68, sym: 'Er', eng: 'Erbium', kor: '어븀' }; nxt[5][18] = 68;
	arr[69] = { id: 69, sym: 'Tm', eng: 'Thulium', kor: '툴륨' }; nxt[20][13] = 69;
	arr[70] = { id: 70, sym: 'Yb', eng: 'Ytterbium', kor: '이터븀' }; nxt[25][2] = 70;
	arr[71] = { id: 71, sym: 'Lu', eng: 'Lutetium', kor: '루테튬' }; nxt[12][21] = 71;
	arr[72] = { id: 72, sym: 'Hf', eng: 'Hafnium', kor: '하프늄' }; nxt[8][6] = 72;
	arr[73] = { id: 73, sym: 'Ta', eng: 'Tantalum', kor: '탄탈럼' }; nxt[20][1] = 73;
	arr[74] = { id: 74, sym: 'W', eng: 'Tungsten', kor: '텅스텐' }; nxt[23][0] = 74;
	arr[75] = { id: 75, sym: 'Re', eng: 'Rhenium', kor: '레늄' }; nxt[18][5] = 75;
	arr[76] = { id: 76, sym: 'Os', eng: 'Osmium', kor: '오스뮴' }; nxt[15][19] = 76;
	arr[77] = { id: 77, sym: 'Ir', eng: 'Iridium', kor: '이리듐' }; nxt[9][18] = 77;
	arr[78] = { id: 78, sym: 'Pt', eng: 'Platinum', kor: '백금' }; nxt[16][20] = 78;
	arr[79] = { id: 79, sym: 'Au', eng: 'Gold', kor: '금' }; nxt[1][21] = 79;
	arr[80] = { id: 80, sym: 'Hg', eng: 'Mercury', kor: '수은' }; nxt[8][7] = 80;
	arr[81] = { id: 81, sym: 'Tl', eng: 'Thallium', kor: '탈륨' }; nxt[20][12] = 81;
	arr[82] = { id: 82, sym: 'Pb', eng: 'Lead', kor: '납' }; nxt[16][2] = 82;
	arr[83] = { id: 83, sym: 'Bi', eng: 'Bismuth', kor: '비스무트' }; nxt[2][9] = 83;
	arr[84] = { id: 84, sym: 'Po', eng: 'Polonium', kor: '폴로늄' }; nxt[16][15] = 84;
	arr[85] = { id: 85, sym: 'At', eng: 'Astatine', kor: '아스타틴' }; nxt[1][20] = 85;
	arr[86] = { id: 86, sym: 'Rn', eng: 'Radon', kor: '라돈' }; nxt[18][14] = 86;
	arr[87] = { id: 87, sym: 'Fr', eng: 'Francium', kor: '프랑슘' }; nxt[6][18] = 87;
	arr[88] = { id: 88, sym: 'Ra', eng: 'Radium', kor: '라듐' }; nxt[18][1] = 88;
	arr[89] = { id: 89, sym: 'Ac', eng: 'Actinium', kor: '악티늄' }; nxt[1][3] = 89;
	arr[90] = { id: 90, sym: 'Th', eng: 'Thorium', kor: '토륨' }; nxt[20][8] = 90;
	arr[91] = { id: 91, sym: 'Pa', eng: 'Protactinium', kor: '프로트악티늄' }; nxt[16][1] = 91;
	arr[92] = { id: 92, sym: 'U', eng: 'Uranium', kor: '우라늄' }; nxt[21][0] = 92;
	arr[93] = { id: 93, sym: 'Np', eng: 'Neptunium', kor: '넵투늄' }; nxt[14][16] = 93;
	arr[94] = { id: 94, sym: 'Pu', eng: 'Plutonium', kor: '플루토늄' }; nxt[16][21] = 94;
	arr[95] = { id: 95, sym: 'Am', eng: 'Americium', kor: '아메리슘' }; nxt[1][13] = 95;
	arr[96] = { id: 96, sym: 'Cm', eng: 'Curium', kor: '퀴륨' }; nxt[3][13] = 96;
	arr[97] = { id: 97, sym: 'Bk', eng: 'Berkelium', kor: '버클륨' }; nxt[2][11] = 97;
	arr[98] = { id: 98, sym: 'Cf', eng: 'Californium', kor: '캘리포늄' }; nxt[3][6] = 98;
	arr[99] = { id: 99, sym: 'Es', eng: 'Einsteinium', kor: '아인슈타이늄' }; nxt[5][19] = 99;
	arr[100] = { id: 100, sym: 'Fm', eng: 'Fermium', kor: '페르뮴' }; nxt[6][13] = 100;
	arr[101] = { id: 101, sym: 'Md', eng: 'Mendelevium', kor: '멘델레븀' }; nxt[13][4] = 101;
	arr[102] = { id: 102, sym: 'No', eng: 'Nobelium', kor: '노벨륨' }; nxt[14][15] = 102;
	arr[103] = { id: 103, sym: 'Lr', eng: 'Lawrencium', kor: '로렌슘' }; nxt[12][18] = 103;
	arr[104] = { id: 104, sym: 'Rf', eng: 'Rutherfordium', kor: '러더포듐' }; nxt[18][6] = 104;
	arr[105] = { id: 105, sym: 'Db', eng: 'Dubnium', kor: '더브늄' }; nxt[4][2] = 105;
	arr[106] = { id: 106, sym: 'Sg', eng: 'Seaborgium', kor: '시보귬' }; nxt[19][7] = 106;
	arr[107] = { id: 107, sym: 'Bh', eng: 'Bohrium', kor: '보륨' }; nxt[2][8] = 107;
	arr[108] = { id: 108, sym: 'Hs', eng: 'Hassium', kor: '하슘' }; nxt[8][19] = 108;
	arr[109] = { id: 109, sym: 'Mt', eng: 'Meitnerium', kor: '마이트너륨' }; nxt[13][20] = 109;
	arr[110] = { id: 110, sym: 'Ds', eng: 'Darmstadtium', kor: '다름슈타튬' }; nxt[4][19] = 110;
	arr[111] = { id: 111, sym: 'Rg', eng: 'Roentgenium', kor: '뢴트게늄' }; nxt[18][7] = 111;
	arr[112] = { id: 112, sym: 'Cn', eng: 'Copernicium', kor: '코페르니슘' }; nxt[3][14] = 112;
	arr[113] = { id: 113, sym: 'Nh', eng: 'Nihonium', kor: '니호늄' }; nxt[14][8] = 113;
	arr[114] = { id: 114, sym: 'Fl', eng: 'Flerovium', kor: '플레로븀' }; nxt[6][12] = 114;
	arr[115] = { id: 115, sym: 'Mc', eng: 'Moscovium', kor: '모스코븀' }; nxt[13][3] = 115;
	arr[116] = { id: 116, sym: 'Lv', eng: 'Livermorium', kor: '리버모륨' }; nxt[12][22] = 116;
	arr[117] = { id: 117, sym: 'Ts', eng: 'Tennessine', kor: '테네신' }; nxt[20][19] = 117;
	arr[118] = { id: 118, sym: 'Og', eng: 'Oganesson', kor: '오가네손' }; nxt[15][7] = 118;
}