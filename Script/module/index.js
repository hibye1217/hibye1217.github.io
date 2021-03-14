function isInt(x){
    return !( isNaN(x) || x.length == 0 || x.indexOf('.') != -1 || x.indexOf('e') != -1 )
}