let randomValue = new Uint32Array(1);
function randInt(st, ed){
	let len = ed-st+1;
	let maxInt = 4294967296; maxInt = parseInt(maxInt/len)*len;
	do{ window.crypto.getRandomValues(randomValue); } while (randomValue[0] >= maxInt);
	return randomValue[0] % len + st;
}