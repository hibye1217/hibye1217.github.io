function isInt(x){
    return !( isNaN(x) || x.length == 0 || x.indexOf('.') != -1 || x.indexOf('e') != -1 )
}

function isAlphabetic(s){
    let len = s.length;
    for (let i = 0; i < len; i++){
        if ('a' <= s[i] && s[i] <= 'z' || 
            'A' <= s[i] && s[i] <= 'Z'){ continue; }
        return false;
    }
    return true;
}

function atoi(c){
    return c.charCodeAt(0);
}

function getParamsFromLink(){
    let link = location.href;
    if (link.indexOf('?') == -1){ return new Object(); }
    let str = link.substring( link.indexOf('?')+1 );
    let url = new URLSearchParams(str);
    let params = new Object();
    for (const [key, val] of url){
        params[key] = val;
    }
    return params;
}