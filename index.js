let roots = []; let windowTag;

let childs = [], tag = [], flag = [];

function hide(now){
	tag[now].style.display = "none"; flag[now] = false;
	let isFolder = (tag[now].getElementsByClassName('icon')[0].innerHTML != "📄");
	if (isFolder){ tag[now].getElementsByClassName('icon')[0].innerHTML = "📁"; }
	childs[now].forEach(nxt => { hide(nxt); })
}

let cnt = 0;
function dfs(obj, depth, before, last){
	let now = cnt; cnt += 1;
	let isFolder = (obj.childs !== undefined);
	console.log(now, obj, depth, last, isFolder);
	flag[now] = false; childs[now] = [];
	tag[now] = document.createElement('div');
	tag[now].style.display = (depth==0 ? "block" : "none");
	tag[now].innerHTML = before;
	if (depth > 0){ tag[now].innerHTML += (last ? "└ " : "├ "); }
	tag[now].innerHTML += "<a class='noCursor'" + (isFolder ? "" : " href='" + obj.link + "'") + "><span class='icon'>" + (isFolder ? "📁" : "📄") + "</span> " + obj.name + "</a>";
	if (isFolder){
		tag[now].children[0].onclick = function(){
			flag[now] = !flag[now];
			tag[now].getElementsByClassName('icon')[0].innerHTML = (flag[now] ? "📂" : "📁")
			childs[now].forEach(nxt => {
				if (flag[now]){ tag[nxt].style.display = "block"; }
				else{ hide(nxt); }
				console.log(flag[now], now, nxt, tag[nxt]);
			});
		}
	}
	tag[now].title = obj.helper;
	windowTag.appendChild(tag[now]);
	if (isFolder){
		const childCount = obj.childs.length;
		for (let i = 0; i < childCount; i++){
			childs[now].push(cnt);
			dfs(obj.childs[i], depth+1, before + (depth == 0 ? "" : (last ? "　 " : "│ ")), i+1 == childCount);
		}
		console.log(now, childs[now]);
	}
}

function Main(){
	windowTag = document.getElementById('file-window');
	
	roots.push({
		name: "solved.ac 이벤트 모음",
		helper: "이미 종료된 solved.ac의 이벤트를 즐기고 싶은 사람들을 위해.",
		childs: [{
			name: "트리 만들기",
			helper: "2022년도 크리스마스 기념 이벤트 (2022.12.16 ~ 2022.12.25)",
			link: "./solvedac-event/221215/"
		}]
	});

	roots.forEach(root => { dfs(root, 0, "", false); });
}