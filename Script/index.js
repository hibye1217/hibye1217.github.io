projectArray = new Array();

projectArray.push({
    name: "leonld94's Fibonacci Function",
    abbr: "LFF",
    tags: [ "Explain", "Math", "Interactive" ]
});

showArray = new Array();
projectArray.forEach(project => {
    showArray.push(project);
});

function LoadProject(){
    let count = showArray.length;
    const projectCounter = document.getElementById('projectCounter');
    projectCounter.innerHTML = "현재 " + count + "개의 글이 있습니다.";

    const projectContainer = document.getElementById('projectContainer');
    projectContainer.innerHTML = "";
    showArray.forEach(project => {
        let tr = document.createElement('tr');

        let nameTag = document.createElement('td');
        let linkTag = document.createElement('a');
        nameTag.className = "projectName";
        linkTag.innerHTML = project.name + " (" + project.abbr + ")";
        linkTag.href = "./Page/" + project.abbr + ".html";
        nameTag.appendChild(linkTag);
        tr.appendChild(nameTag);

        let categoryTag = document.createElement('td');
        categoryTag.className = "projectCategory"
        project.tags.forEach(tag => {
            // console.log(tag);
            categoryTag.innerHTML += tag + ", ";
        });
        categoryTag.innerHTML = categoryTag.innerHTML.substring(0, categoryTag.innerHTML.length - 2);
        tr.appendChild(categoryTag);

        projectContainer.appendChild(tr);
    });
}

function Search(){
    const str = document.getElementById('searchBar').value.toLowerCase();
    // console.log(str);
    showArray = new Array();
    projectArray.forEach(project => {
        let projectName = project.name.toLowerCase();
        if ( projectName.indexOf(str) != -1 ){
            showArray.push(project);
        }
    });
    LoadProject();
}