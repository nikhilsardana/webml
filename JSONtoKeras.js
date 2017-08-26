function toKeras(inp) {
    if(inp === true) {
        return "True";
    }
    if(inp === false) {
        return "False";
    }
    if(typeof inp === "number") {
        return inp;
    }
    if(typeof inp === "string") {
        return '"'+inp+'"';
    }
    if(inp instanceof Array) {
        var r = '(';
        for(var v=0; v<inp.length; v++) {
            r += toKeras(inp[v])+",";
        }
        return r+')';
    }
    // it's a dictionary
    if("type" in inp) { // it's a function call
        return dictToCall(inp);
    }
    var r = "{";
    for(var key in inp) {
        r += '"'+key+'":'+toKeras(inp[key])+",";
    }
    return r+"}";
}

function dictToCall(dct) {
    var first = true;
    var ret = dct["type"]+"(";
    for(var key in dct) {
        if(["type"].indexOf(key) >= 0) continue;
        if(!first) {
            ret += ",";
        } else {
            first = false;
        }
        ret += key+"="+toKeras(dct[key]);
    }
    return ret+")";
} 

function JSONtoKeras(json_str) {
    var input = JSON.parse(json_str);
    var layers = input["layers"]
    var ret = "";
    ret += "from keras.models import Sequential\n"
    ret += "from keras.layers import *\n";
    ret += "from keras.optimizers import *\n";
    ret += "\n";
    ret += "model = Sequential()\n";
    for(var x=0; x<layers.length; x++) {
        var layer = layers[x];
        ret += "model.add("+dictToCall(layer)+")\n";
    }
    var model = input["model"];
    for(var x=0; x<model.length; x++) {
        ret += "model."+dictToCall(model[x])+"\n";
    }
    return ret;
};
