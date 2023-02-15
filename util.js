let randomValue_ = new Uint32Array(1);
function randInt(st, ed){
	let len = ed-st+1;
	let maxInt = 4294967296; maxInt = parseInt(maxInt/len)*len;
	do{ window.crypto.getRandomValues(randomValue_); } while (randomValue_[0] >= maxInt);
	return randomValue_[0] % len + st;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function callAPI(time, link, param={}){
	link += "?";
	for (let key of Object.keys(param)){ link += key + "=" + param[key] + '&'; }
	link = link.substring( 0, link.length - 1 );

	console.info("API Called:", link); await sleep(time);
	const res = await( await fetch(link) ).json();
	console.info("API Returned:", res);

	return res;
}

function loadMathJax(){ MathJax.typeset(); }