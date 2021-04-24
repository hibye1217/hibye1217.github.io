function isInt(x){
    return !( isNaN(x) || x.length == 0 || x.indexOf('.') != -1 || x.indexOf('e') != -1 )
}

function getParamsFromLink(){
    let link = location.href;
    let str = link.substring( link.indexOf('?')+1 );
    let url = new URLSearchParams(str);
    let params = [];
    for (const [key, val] of url){
        params.push({
            key: key,
            val: val
        });
    }
    return params;
}