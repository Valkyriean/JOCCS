var isEqual = function(arg_1, arg_2) {
  if(typeof(arg_1) == 'string' & typeof(arg_2) == 'string') return arg_1 == arg_2;
  if(typeof(arg_1) != typeof(arg_2)) return false;
  if(arg_1.length != arg_2.length) return false;
  if(typeof(arg_1[0]) == 'string' & typeof(arg_2[0]) == 'string') {
    for(var i = 0; i < arg_1.length; i ++) {
      if(arg_1[i] != arg_2[i]) return false;
    }
    return true;
  } else {
      for(var i = 0; i < arg_1.length; i ++) {a = isEqual(arg_1[i],arg_2[i])};
      return a;
  };
}

var 　toSingleArray = function(arr, result) {
    if(typeof(arr) == 'object') {
      arr.forEach(function(item) {
        if(typeof(item) != 'object') result.push(item);
        else toSingleArray(item, result);
      })
    }
    return result
}

var trimSpace = function(str) {
    return str.replace(/\s/, "");
}

exports.isEqual = isEqual;
exports.trimSpace = trimSpace;
exports.toSingle = toSingleArray;
