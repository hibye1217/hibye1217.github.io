const starSize = 120 + 4*7, cardSize = 80 + 2*7;

let deckSize = 6, useDeckSize = 6;
let modular = 10, possibleCounts = [2];

let depth = 0, score = 0;
let totalSum = 0, ornamentSum = 0;
let drawCount = 0;

let result = [], deck = [];
let boardTag;

let ord = 0, maxDepth = 0;
function dfs(now, pre, dep){
	result[now].parent = pre;
	result[now].y = dep; maxDepth = Math.max(maxDepth, dep);
	let m = result[now].childs.length;
	if (m == 0){
		result[now].st = result[now].ed = result[now].x = ord*2; ord += 1;
	}
	else{
		result[now].childs.forEach(nxt => { dfs(nxt, now, dep+1); });
		result[now].st = result[ result[now].childs[0] ].st;
		result[now].ed = result[ result[now].childs[m-1] ].ed;
		if (m%2 == 1){
			result[now].x = result[ result[now].childs[parseInt(m/2)] ].x;
		}
		else{
			let l = result[ result[now].childs[parseInt(m/2)-1] ].ed, r = result[ result[now].childs[parseInt(m/2)] ].st;
			console.log(now, result[now].childs[parseInt(m/2)-1], r);
			result[now].x = parseInt((l+r)/2);
		}
	}
}

// function lineTag from https://stackoverflow.com/a/55963590
function lineTag(y1, x1, y2, x2) {
	if (x1 > x2){
		let tmp = x1; x1 = x2; x2 = tmp;
		    tmp = y1; y1 = y2; y2 = tmp;
	}
	let dx = x2-x1, dy = y2-y1;
	let len = Math.sqrt(dy*dy + dx*dx);
	let ang = Math.atan(dy/dx) * 180/Math.PI;
	
	const tag = document.createElement('div');
	tag.className = 'line';
	tag.style.transformOrigin = 'top left'; tag.style.transform = 'rotate(' + ang + 'deg)';
	tag.style.width = len + 'px'; tag.style.height = '1px';
	tag.style.backgroundColor = 'white';
	tag.style.position = 'absolute'; tag.style.top = y1+'px'; tag.style.left = x1+'px';
	return tag;
}

function draw(){
	ord = 0; maxDepth = 0; dfs(0, -1, 0);
	boardTag.innerHTML = "";
	boardTag.style.width = Math.max(starSize, cardSize*ord) + 'px';
	boardTag.style.height = starSize + cardSize*maxDepth + 'px';
	console.log(result)
	for (let i = 0; i < result.length; i++){
		const obj = result[i];
		const tag = document.createElement('img');
		if (obj.type == -1){
			tag.src = "./image/star.png";
			tag.className = "star" + (obj.childs.length == 0 ? "" : "-dead");
		}
		else{
			if (obj.type == 1){
				tag.src = "./image/lightbulb" + obj.target + ".png";
				tag.className = "lightbulb" + (obj.childs.length == 0 ? "" : "-dead");;
			}
			else{
				tag.src = "./image/ornament" + obj.target + ".png";
				tag.className = "ornament";
			}
		}
		tag.style.position = "absolute";
		let y = (obj.y == 0 ? 0 : (starSize + (obj.y-1)*cardSize));
		let x = obj.x * parseInt(cardSize/2);
		if (obj.type == -1){
			x -= parseInt((starSize-cardSize)/2);
			x = Math.max(x, 0);
		}
		
		console.log("ok", y, x);
		tag.style.top = y + 'px'; tag.style.left = x + 'px';
		obj.ypos = y + (obj.type == -1 ? parseInt(starSize/2) : parseInt(cardSize/2));
		obj.xpos = x + (obj.type == -1 ? parseInt(starSize/2) : parseInt(cardSize/2));
		if (obj.parent != -1){
			const boj = result[ obj.parent ];
			const tag = lineTag(boj.ypos, boj.xpos, obj.ypos, obj.xpos);
			tag.style.zIndex = -2;
			boardTag.appendChild(tag);
		}
		tag.dataset.index = i;
		tag.style.zIndex = 10;

		if (obj.type != 0 && obj.childs.length == 0){
			tag.onclick = function(){ showAlert(this.dataset.index); }
		}
		else{ tag.style.filter = 'brightness(80%)'; }
		console.log(i, tag);

		boardTag.appendChild(tag);
	}
}

function drawDeck(){
	document.getElementById('deck-count').innerHTML = "현재 가지고 있는 카드 (" + deck.length + "/" + deckSize + ")";
	const deckTag = document.getElementById('deck'); deckTag.innerHTML = "";
	for (let i = 0; i < Math.min(deckSize, deck.length); i++){
		if (i != 0){
			const tag = document.createElement('div');
			tag.style.width = '10px'; tag.style.display = 'inline-block';
			deckTag.appendChild(tag);
		}
		const obj = deck[i];
		const tag = document.createElement('img');
		tag.className = (obj.type == 1 ? "lightbulb-image" : "ornament-image");
		tag.src = "./image/" + (obj.type == 1 ? "lightbulb" : "ornament") + obj.target + ".png";
		deckTag.appendChild(tag);
	}
}

function Main(){
	boardTag = document.getElementById('game-board');
	result[0] = {
		type: -1, target: -1,
		y: -1, x: -1, st: -1, ed: -1,
		childs: [], parent: -1,
		ypos: -1, xpos: -1
	};

	deck[0] = { type: 1, target: 1, selected: false };
	deck[1] = { type: 1, target: 2, selected: false };
	deck[2] = { type: 1, target: 3, selected: false };
	deck[3] = { type: 1, target: 4, selected: false };
	deck[4] = { type: 1, target: 5, selected: false };
	deck[5] = { type: 1, target: 6, selected: false };
	
	draw(); drawDeck();
}

let currentSum = 0, currentCount = 0, target = 0, targetIndex = 0;
function showAlert(idx){
	const obj = result[idx]; targetIndex = idx;
	const imageTag = document.getElementById('put-target-image');
	if (obj.type == -1){
		imageTag.src = './image/star.png';
		imageTag.className = 'star-small';
	}
	else{
		if (obj.type == 1){
			imageTag.src = './image/lightbulb' + obj.target + '.png';
			imageTag.className = 'lightbulb-small';
		}
		else{
			imageTag.src = './image/ornament' + obj.target + '.png';
			imageTag.className = 'ornament-small';
		}
	}

	currentCount = 0; currentSum = 0; target = obj.target;
	const deckTag = document.getElementById('put-deck'); deckTag.innerHTML = "";
	for (let i = 0; i < Math.min(deckSize, deck.length); i++){
		if (i != 0){
			const tag = document.createElement('div');
			tag.style.width = '10px'; tag.style.display = 'inline-block';
			deckTag.appendChild(tag);
		}
		deck[i].selected = false;
		const obj = deck[i];
		const tag = document.createElement('img');
		tag.className = (obj.type == 1 ? "lightbulb-image" : "ornament-image") + " image-not-selected";
		tag.dataset.index = i;
		tag.onclick = function(){
			let now = this.dataset.index;
			deck[now].selected = !deck[now].selected;
			tag.className = (deck[i].type == 1 ? "lightbulb-image" : "ornament-image") + ' '
			              + (deck[i].selected ? "image-selected" : "image-not-selected");
			currentCount += (deck[i].selected ? +1 : -1);
			currentSum += (deck[i].selected ? +1 : -1) * deck[i].target;
			document.getElementById('put-info').innerHTML = "사용한 카드 수: " + currentCount + ", 합: " + currentSum;
			if (possibleCounts.includes(currentCount) && (currentSum % modular == target || target == -1)){
				document.getElementById('put-confirm').className = "possible";
			}
			else{
				document.getElementById('put-confirm').className = "impossible";
			}
		}
		tag.src = "./image/" + (obj.type == 1 ? "lightbulb" : "ornament") + obj.target + ".png";
		deckTag.appendChild(tag);
	}

	document.getElementById('put-info').innerHTML = "사용한 카드 수: " + currentCount + ", 합: " + currentSum;
	document.getElementById('put-confirm').className = "impossible";
	document.getElementById('alert-tag').style.display = 'block';
}

function showThrow(){
	const deckTag = document.getElementById('throw-deck'); deckTag.innerHTML = "";
	for (let i = 0; i < Math.min(deckSize, deck.length); i++){
		if (i != 0){
			const tag = document.createElement('div');
			tag.style.width = '10px'; tag.style.display = 'inline-block';
			deckTag.appendChild(tag);
		}
		deck[i].selected = false;
		const obj = deck[i];
		const tag = document.createElement('img');
		tag.className = (obj.type == 1 ? "lightbulb-image" : "ornament-image") + " image-not-selected";
		tag.dataset.index = i;
		tag.onclick = function(){
			let now = this.dataset.index;
			deck[now].selected = !deck[now].selected;
			tag.className = (deck[i].type == 1 ? "lightbulb-image" : "ornament-image") + ' '
			              + (deck[i].selected ? "image-selected" : "image-not-selected");
			currentCount += (deck[i].selected ? +1 : -1);
			currentSum += (deck[i].selected ? +1 : -1) * deck[i].target;
			if (possibleCounts.includes(currentCount) && (currentSum % modular == target || target == -1)){
				document.getElementById('put-confirm').className = "possible";
			}
			else{
				document.getElementById('put-confirm').className = "impossible";
			}
		}
		tag.src = "./image/" + (obj.type == 1 ? "lightbulb" : "ornament") + obj.target + ".png";
		deckTag.appendChild(tag);
	}

	document.getElementById('throw-tag').style.display = 'block';
}

function getCard(){
	deck.push({ type: randInt(0, 1), target: randInt(0, 9), selected: false });
	drawCount += 1;
	document.getElementById('total-card').innerHTML = drawCount+6 + '장';
	drawDeck();
}

function confirm(){
	const tag = document.getElementById('put-confirm');
	if (tag.className == "possible"){
		let n = Math.min(deckSize, deck.length);
		for (let i = 0; i < n; i++){
			if (deck[i].selected){
				result[targetIndex].childs.push(result.length);
				result.push({
					type: deck[i].type, target: deck[i].target,
					y: -1, x: -1, st: -1, ed: -1,
					childs: []
				});
				if (deck[i].type == 0){
					ornamentSum += deck[i].target;
					score = Math.max(score, result[targetIndex].y + 1);
				}
				totalSum += deck[i].target;
				deck.splice(i, 1);
				i -= 1; n -= 1;
			}
		}
		
		draw(); drawDeck();
		document.getElementById('deepest-ornament').innerHTML = score + '층';
		document.getElementById('ornament-sum').innerHTML = ornamentSum;
		document.getElementById('total-sum').innerHTML = totalSum;
		document.getElementById('alert-tag').style.display = 'none';
	}
}
function deny(){ document.getElementById('alert-tag').style.display = 'none'; }

function confirmThrow(){
	let n = Math.min(deckSize, deck.length);
	for (let i = 0; i < n; i++){
		if (deck[i].selected){
			deck.splice(i, 1);
			i -= 1; n -= 1;
		}
	}
	
	draw(); drawDeck();
	document.getElementById('throw-tag').style.display = 'none';
}
function denyThrow(){ document.getElementById('throw-tag').style.display = 'none'; }