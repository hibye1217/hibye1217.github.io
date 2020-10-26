let projectArray = new Array();

projectArray.push({
    name: "Testing",
    nick: "TST",
    tag: [ "tag1", "tag2" ]
})

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
        td.innerHTML = "<a href='./Main.html'>Click</a>";
        tr.appendChild(td);

        td = document.createElement('td');
        td.className = "mainKor";
        td.innerHTML = "<a href='./Main.html'>Click</a>";
        tr.appendChild(td);

        table.appendChild(tr);
    }
}