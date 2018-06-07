var compare = require('../../prototype/utils/functions').isEqual;

exports.compare = function(req, res) {
   var result = compare(req.result, req.output);
   res.json({
     'result': req.result,
     'status': result
   });
   next();
}
