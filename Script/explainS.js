let sectionList, pageCount;
let foldedCheck;

function HidePage(flexTag, idx){
    let foldTag = flexTag.children[1];
    let descTag = flexTag.children[2];
    foldedCheck[idx] = true;
    foldTag.innerHTML = "--- 펼치기 ---";
    descTag.style.display = "none";
}
function ShowPage(flexTag, idx){
    let foldTag = flexTag.children[1];
    let descTag = flexTag.children[2];
    foldedCheck[idx] = false;
    foldTag.innerHTML = "--- 접기 ---";
    descTag.style.display = "inline-block";
}

function SetPage(){
    sectionList = Array.from( document.getElementsByClassName('body') );
    foldedCheck = Array(sectionList.length).fill(true);
    pageCount = sectionList.length;
    for (let i = 1; i < pageCount; i++){
        let section = sectionList[i];
        let flexTag = section.children[0];

        let foldTag = document.createElement('div');
        foldTag.className = "folder";
        foldTag.onclick = function(){
            if (foldedCheck[i]){ ShowPage(flexTag, i); }
            else{ HidePage(flexTag, i); }
        }
        flexTag.insertBefore(foldTag, flexTag.children[1]);

        HidePage(flexTag);
    }
}