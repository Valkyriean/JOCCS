var compare = require('../../prototype/utils/functions').isEqual;

exports.compare = function(req, res) {
   var output = [""];
   if(typeof(req.body.output) == 'string') {
      if(req.body.output.match(/[\[\]\(\)\{\}]/) == null) output = [req.body.output];
   } else if(typeof(req.body.output) != 'object') output = [req.body.output.toString()];
   else {
     req.body.output.forEach(function(item) {
        output.push(item.toString().replace(/[\'\"\\\/\b\f\n\r\t]/g, ''));
     })
     output.splice(0,1);
   }
   var result = compare(req.result, output);
   console.log(req.result);
   res.json({
     'result': req.result,
     'status': result
   });
}
