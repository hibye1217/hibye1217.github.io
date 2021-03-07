let currentPage = 0;
let sectionList, pageCount;

function HidePage(section){ section.style.display = "none"; }
function ShowPage(section){ section.style.display = "flex"; }

function SetPage(){
    sectionList = Array.from( document.getElementsByClassName('body') );
    pageCount = sectionList.length;
    sectionList.forEach(section => {
        // console.log(sectionList);
        HidePage(section);
    });
    ShowPage(sectionList[currentPage]);
}

function MovePage(dir){
    let oldPage = currentPage;
    let newPage = currentPage;
    if (dir == "LL"){ newPage = 0; }
    if (dir == "L"){ newPage = oldPage - 1; }
    if (dir == "M"){ newPage = Math.floor( Math.random() * pageCount ); }
    if (dir == "R"){ newPage = oldPage + 1; }
    if (dir == "RR"){ newPage = pageCount-1; }

    if (newPage >= pageCount){ newPage = pageCount-1; }
    if (newPage < 0){ newPage = 0; }

    HidePage(sectionList[oldPage]);
    ShowPage(sectionList[newPage]);
    currentPage = newPage;
}