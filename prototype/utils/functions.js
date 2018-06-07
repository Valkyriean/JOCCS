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

exports.isEqual = isEqual;
