let projectArray = new Array();

projectArray.push({
    name: "leonld94's Fibonacci Function",
    nick: "LFF",
    tag: [ "MathJax" ]
});

projectArray.push({
    name: "18789",
    nick: "GNA",
    tag: [ "Personal" ]
});

projectArray.push({
    name: "Scoreboard",
    nick: "SB",
    tag: [ "Personal" ]
});

function appendProjects(){
    const table = document.getElementById('projectContainer');
    console.log(projectArray);
    for (let i = 0; i < projectArray.length; i++){
        let project = projectArray[i];
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.className = "mainName";
        td.innerHTML = project.name + " (" + project.nick + ")";
        tr.appendChild(td);

        td = document.createElement('td');
        td.className = "mainTag";
        td.innerHTML = project.tag.join(', ');
        tr.appendChild(td);

        td = document.createElement('td');
        td.className = "mainEng";
        td.innerHTML = "<a href='./Eng/" + project.nick + ".html'>Link</a>";
        tr.appendChild(td);

        td = document.createElement('td');
        td.className = "mainKor";
        td.innerHTML = "<a href='./Kor/" + project.nick + ".html'>Link</a>";
        tr.appendChild(td);

        table.appendChild(tr);
    }

    const tag = document.getElementById('proCounter');
    tag.innerHTML = "Currently, there are " + projectArray.length + " projects.";
}