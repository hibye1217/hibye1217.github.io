function Atom(num, sym, kor, eng){
    this.number = num;
    this.symbol = sym;
    this.korean = kor;
    this.english = eng;
}

var arr = new Array(150);
var count;
fillArray();

function Generate(){
    var input = document.getElementById('sentence').value;
    var len = input.length;
    var result = validate(input);
    document.getElementById('symbol').innerHTML = "";
    document.getElementById('english').innerHTML = "";
    document.getElementById('korean').innerHTML = "";
    document.getElementById('number').innerHTML = "";
    if (result == "-1"){
        alert("Non-English Character Detected.");
        return;
    }
    var found = find(new Array(), result, 0);
    if (found == false) alert("Nothing Found!");
}

function find(res, str, ptr){
    var len = str.length;
    if (len-ptr == 0){
        var symbol = document.getElementById('symbol');
        var english = document.getElementById('english');
        var korean = document.getElementById('korean');
        var number = document.getElementById('number');
        var l = res.length;
        for (let i = 0; i < l; i++){
            symbol.innerHTML += arr[ res[i] ].symbol + " ";
            english.innerHTML += arr[ res[i] ].english + " ";
            korean.innerHTML += arr[ res[i] ].korean + " ";
            number.innerHTML += arr[ res[i] ].number + " ";
        }
        symbol.innerHTML += "<br>";
        english.innerHTML += "<br>";
        korean.innerHTML += "<br>";
        number.innerHTML += "<br>";
        return true;
    }
    var found = false;
    for (let i = 1; i <= count; i++){
        var atom = arr[i].symbol;
        var alen = atom.length;

        if (len-ptr < alen) continue;

        if (alen == 1){
            var a1 = atom.charCodeAt(0);
            var s1 = str.charCodeAt(ptr);
            a1 += 32;

            if (a1 == s1){
                res.push(i);
                console.log(res, i);
                if (find(res, str, ptr+1) == true) found = true;
                res.pop();
            }
        }
        if (alen == 2){
            var a1 = atom.charCodeAt(0), a2 = atom.charCodeAt(1);
            var s1 = str.charCodeAt(ptr), s2 = str.charCodeAt(ptr+1);
            a1 += 32;

            if (a1 == s1 && a2 == s2){
                res.push(i);
                console.log(res, i);
                if (find(res, str, ptr+2) == true) found = true;
                res.pop();
            }
        }
    }
    return found;
}

function validate(string){
    var len = string.length;
    var result = "";
    var valid = true;
    for (let i = 0; i < len; i++){
        var char = string.charCodeAt(i);
        if (65 <= char && char <= 90) char += 32;
        if (97 <= char && char <= 122) result += String.fromCharCode(char);
        else if (char == 32) continue;
        else valid = false;
    }
    if (valid == false) return "-1";
    else return result;
}

function fillArray(){
    arr[1] = { number: "1", symbol: "H", korean: "수소", english: "Hydrogen" };
    arr[2] = { number: "2", symbol: "He", korean: "헬륨", english: "Helium" };
    arr[3] = { number: "3", symbol: "Li", korean: "리튬", english: "Lithium" };
    arr[4] = { number: "4", symbol: "Be", korean: "베릴륨", english: "Beryllium" };
    arr[5] = { number: "5", symbol: "B", korean: "붕소", english: "Boron" };
    arr[6] = { number: "6", symbol: "C", korean: "탄소", english: "Carbon" };
    arr[7] = { number: "7", symbol: "N", korean: "질소", english: "Nitrogen" };
    arr[8] = { number: "8", symbol: "O", korean: "산소", english: "Oxygen" };
    arr[9] = { number: "9", symbol: "F", korean: "플루오린", english: "Fluorine" };
    arr[10] = { number: "10", symbol: "Ne", korean: "네온", english: "Neon" };
    arr[11] = { number: "11", symbol: "Na", korean: "나트륨", english: "Sodium" };
    arr[12] = { number: "12", symbol: "Mg", korean: "마그네슘", english: "Magnesium" };
    arr[13] = { number: "13", symbol: "Al", korean: "알루미늄", english: "Aluminium" };
    arr[14] = { number: "14", symbol: "Si", korean: "규소", english: "Silicon" };
    arr[15] = { number: "15", symbol: "P", korean: "인", english: "Phosphorus" };
    arr[16] = { number: "16", symbol: "S", korean: "황", english: "Sulfur" };
    arr[17] = { number: "17", symbol: "Cl", korean: "염소", english: "Chlorine" };
    arr[18] = { number: "18", symbol: "Ar", korean: "아르곤", english: "Argon" };
    arr[19] = { number: "19", symbol: "K", korean: "칼륨", english: "Potassium" };
    arr[20] = { number: "20", symbol: "Ca", korean: "칼슘", english: "Calcium" };
    arr[21] = { number: "21", symbol: "Sc", korean: "스칸듐", english: "Scandium" };
    arr[22] = { number: "22", symbol: "Ti", korean: "티타늄", english: "Titanium" };
    arr[23] = { number: "23", symbol: "V", korean: "바나듐", english: "Vanadium" };
    arr[24] = { number: "24", symbol: "Cr", korean: "크롬", english: "Chromium" };
    arr[25] = { number: "25", symbol: "Mn", korean: "망가니즈", english: "Manganese" };
    arr[26] = { number: "26", symbol: "Fe", korean: "철", english: "Iron" };
    arr[27] = { number: "27", symbol: "Co", korean: "코발트", english: "Cobalt" };
    arr[28] = { number: "28", symbol: "Ni", korean: "니켈", english: "Nickel" };
    arr[29] = { number: "29", symbol: "Cu", korean: "구리", english: "Copper" };
    arr[30] = { number: "30", symbol: "Zn", korean: "아연", english: "Zinc" };
    arr[31] = { number: "31", symbol: "Ga", korean: "갈륨", english: "Gallium" };
    arr[32] = { number: "32", symbol: "Ge", korean: "게르마늄", english: "Germanium" };
    arr[33] = { number: "33", symbol: "As", korean: "비소", english: "Arsenic" };
    arr[34] = { number: "34", symbol: "Se", korean: "셀레늄", english: "Selenium" };
    arr[35] = { number: "35", symbol: "Br", korean: "브로민", english: "Bromine" };
    arr[36] = { number: "36", symbol: "Kr", korean: "크립톤", english: "Krypton" };
    arr[37] = { number: "37", symbol: "Rb", korean: "루비듐", english: "Rubidium" };
    arr[38] = { number: "38", symbol: "Sr", korean: "스트론튬", english: "Strontium" };
    arr[39] = { number: "39", symbol: "Y", korean: "이트륨", english: "Yttrium" };
    arr[40] = { number: "40", symbol: "Zr", korean: "지르코늄", english: "Zirconium" };
    arr[41] = { number: "41", symbol: "Nb", korean: "나이오븀", english: "Niobium" };
    arr[42] = { number: "42", symbol: "Mo", korean: "몰리브데넘", english: "Molybdenum" };
    arr[43] = { number: "43", symbol: "Tc", korean: "테크네튬", english: "Technetium" };
    arr[44] = { number: "44", symbol: "Ru", korean: "루테늄", english: "Ruthenium" };
    arr[45] = { number: "45", symbol: "Rh", korean: "로듐", english: "Rhodium" };
    arr[46] = { number: "46", symbol: "Pd", korean: "팔라듐", english: "Palladium" };
    arr[47] = { number: "47", symbol: "Ag", korean: "은", english: "Silver" };
    arr[48] = { number: "48", symbol: "Cd", korean: "카드뮴", english: "Cadmium" };
    arr[49] = { number: "49", symbol: "In", korean: "인듐", english: "Indium" };
    arr[50] = { number: "50", symbol: "Sn", korean: "주석", english: "Tin" };
    arr[51] = { number: "51", symbol: "Sb", korean: "안티모니", english: "Antimony" };
    arr[52] = { number: "52", symbol: "Te", korean: "텔루륨", english: "Tellurium" };
    arr[53] = { number: "53", symbol: "I", korean: "아이오딘", english: "Iodine" };
    arr[54] = { number: "54", symbol: "Xe", korean: "제논", english: "Xenon" };
    arr[55] = { number: "55", symbol: "Cs", korean: "세슘", english: "Caesium" };
    arr[56] = { number: "56", symbol: "Ba", korean: "바륨", english: "Barium" };
    arr[57] = { number: "57", symbol: "La", korean: "란타넘", english: "Lanthanum" };
    arr[58] = { number: "58", symbol: "Ce", korean: "세륨", english: "Cerium" };
    arr[59] = { number: "59", symbol: "Pr", korean: "프라세오디뮴", english: "Praseodymium" };
    arr[60] = { number: "60", symbol: "Nd", korean: "네오디뮴", english: "Neodymium" };
    arr[61] = { number: "61", symbol: "Pm", korean: "프로메튬", english: "Promethium" };
    arr[62] = { number: "62", symbol: "Sm", korean: "사마륨", english: "Samarium" };
    arr[63] = { number: "63", symbol: "Eu", korean: "유로퓸", english: "Europium" };
    arr[64] = { number: "64", symbol: "Gd", korean: "가돌리늄", english: "Gadolinium" };
    arr[65] = { number: "65", symbol: "Tb", korean: "터븀", english: "Terbium" };
    arr[66] = { number: "66", symbol: "Dy", korean: "디스프로슘", english: "Dysprosium" };
    arr[67] = { number: "67", symbol: "Ho", korean: "홀뮴", english: "Holmium" };
    arr[68] = { number: "68", symbol: "Er", korean: "어븀", english: "Erbium" };
    arr[69] = { number: "69", symbol: "Tm", korean: "툴륨", english: "Thulium" };
    arr[70] = { number: "70", symbol: "Yb", korean: "이터븀", english: "Ytterbium" };
    arr[71] = { number: "71", symbol: "Lu", korean: "루테튬", english: "Lutetium" };
    arr[72] = { number: "72", symbol: "Hf", korean: "하프늄", english: "Hafnium" };
    arr[73] = { number: "73", symbol: "Ta", korean: "탄탈럼", english: "Tantalum" };
    arr[74] = { number: "74", symbol: "W", korean: "텅스텐", english: "Tungsten" };
    arr[75] = { number: "75", symbol: "Re", korean: "레늄", english: "Rhenium" };
    arr[76] = { number: "76", symbol: "Os", korean: "오스뮴", english: "Osmium" };
    arr[77] = { number: "77", symbol: "Ir", korean: "이리듐", english: "Iridium" };
    arr[78] = { number: "78", symbol: "Pt", korean: "백금", english: "Platinum" };
    arr[79] = { number: "79", symbol: "Au", korean: "금", english: "Gold" };
    arr[80] = { number: "80", symbol: "Hg", korean: "수은", english: "Mercury" };
    arr[81] = { number: "81", symbol: "Tl", korean: "탈륨", english: "Thallium" };
    arr[82] = { number: "82", symbol: "Pb", korean: "납", english: "Lead" };
    arr[83] = { number: "83", symbol: "Bi", korean: "비스무트", english: "Bismuth" };
    arr[84] = { number: "84", symbol: "Po", korean: "폴로늄", english: "Polonium" };
    arr[85] = { number: "85", symbol: "At", korean: "아스타틴", english: "Astatine" };
    arr[86] = { number: "86", symbol: "Rn", korean: "라돈", english: "Radon" };
    arr[87] = { number: "87", symbol: "Fr", korean: "프랑슘", english: "Francium" };
    arr[88] = { number: "88", symbol: "Ra", korean: "라듐", english: "Radium" };
    arr[89] = { number: "89", symbol: "Ac", korean: "악티늄", english: "Actinium" };
    arr[90] = { number: "90", symbol: "Th", korean: "토륨", english: "Thorium" };
    arr[91] = { number: "91", symbol: "Pa", korean: "프로트악티늄", english: "Protactinium" };
    arr[92] = { number: "92", symbol: "U", korean: "우라늄", english: "Uranium" };
    arr[93] = { number: "93", symbol: "Np", korean: "넵투늄", english: "Neptunium" };
    arr[94] = { number: "94", symbol: "Pu", korean: "플루토늄", english: "Plutonium" };
    arr[95] = { number: "95", symbol: "Am", korean: "아메리슘", english: "Americium" };
    arr[96] = { number: "96", symbol: "Cm", korean: "퀴륨", english: "Curium" };
    arr[97] = { number: "97", symbol: "Bk", korean: "버클륨", english: "Berkelium" };
    arr[98] = { number: "98", symbol: "Cf", korean: "캘리포늄", english: "Californium" };
    arr[99] = { number: "99", symbol: "Es", korean: "아인슈타이늄", english: "Einsteinium" };
    arr[100] = { number: "100", symbol: "Fm", korean: "페르뮴", english: "Fermium" };
    arr[101] = { number: "101", symbol: "Md", korean: "멘델레븀", english: "Mendelevium" };
    arr[102] = { number: "102", symbol: "No", korean: "노벨륨", english: "Nobelium" };
    arr[103] = { number: "103", symbol: "Lr", korean: "로렌슘", english: "Lawrencium" };
    arr[104] = { number: "104", symbol: "Rf", korean: "러더포듐", english: "Rutherfordium" };
    arr[105] = { number: "105", symbol: "Db", korean: "더브늄", english: "Dubnium" };
    arr[106] = { number: "106", symbol: "Sg", korean: "시보귬", english: "Seaborgium" };
    arr[107] = { number: "107", symbol: "Bh", korean: "보륨", english: "Bohrium" };
    arr[108] = { number: "108", symbol: "Hs", korean: "하슘", english: "Hassium" };
    arr[109] = { number: "109", symbol: "Mt", korean: "마이트너륨", english: "Meitnerium" };
    arr[110] = { number: "110", symbol: "Ds", korean: "다름슈타튬", english: "Darmstadtium" };
    arr[111] = { number: "111", symbol: "Rg", korean: "뢴트게늄", english: "Roentgenium" };
    arr[112] = { number: "112", symbol: "Cn", korean: "코페르니슘", english: "Copernicium" };
    arr[113] = { number: "113", symbol: "Nh", korean: "니호늄", english: "Nihonium" };
    arr[114] = { number: "114", symbol: "Fl", korean: "플레로븀", english: "Flerovium" };
    arr[115] = { number: "115", symbol: "Mc", korean: "모스코븀", english: "Moscovium" };
    arr[116] = { number: "116", symbol: "Lv", korean: "리버모륨", english: "Livermorium" };
    arr[117] = { number: "117", symbol: "Ts", korean: "테네신", english: "Tennessine" };
    arr[118] = { number: "118", symbol: "Og", korean: "오가네손", english: "Oganesson" };
    count = 118;
}