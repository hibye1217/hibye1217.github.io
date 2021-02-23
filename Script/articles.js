let articleList = new Array();

let showArray = new Array();

function PushArticle(name, abbr, type, cate){
    articleList.push({
        name: name,
        link: abbr,
        type: type,
        cate: cate
    });
}

function ShowAllArticle(folder){
    articleList.forEach(project => {
        showArray.push(project);
    });
    LoadArticle(folder);
}

function LoadArticle(folder){
    let count = showArray.length;
    const countTag = document.getElementById('counter');
    countTag.innerHTML = "현재 " + count + "개의 글이 있습니다.";

    const conatiner = document.getElementById('container');
    conatiner.innerHTML = "";
    showArray.forEach(project => {
        let tr = document.createElement('tr');

        let nameTag = document.createElement('td');
        let linkTag = document.createElement('a');
        nameTag.className = "name";
        linkTag.innerHTML = project.name + " [" + project.link + "]";
        linkTag.href = "./" + folder + "/" + project.link + ".html";
        nameTag.appendChild(linkTag);
        tr.appendChild(nameTag);

        let typeTag = document.createElement('td');
        typeTag.className = "type";
        typeTag.innerHTML = project.type;
        tr.append(typeTag);

        let categoryTag = document.createElement('td');
        categoryTag.className = "category";
        project.cate.forEach(category => {
            // console.log(tag);
            categoryTag.innerHTML += category + ", ";
        });
        categoryTag.innerHTML = categoryTag.innerHTML.substring(0, categoryTag.innerHTML.length - 2);
        tr.appendChild(categoryTag);

        conatiner.appendChild(tr);
    });
}

function SearchArticle(folder){
    const str = document.getElementById('searchBar').value.toLowerCase();
    // console.log(str);
    showArray = new Array();
    articleList.forEach(project => {
        let projectName = project.name.toLowerCase();
        if ( projectName.indexOf(str) != -1 ){
            showArray.push(project);
        }
    });
    LoadArticle(folder);
}