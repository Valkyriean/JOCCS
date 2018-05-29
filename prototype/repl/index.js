const ReplitClient=require("replit-client");
const REPLIT_TOKEN={
		msg_mac:"zvBhhevgu57mvLXNTiwx15yu8c/Tk82M2gZd0VdH4X0=",
		time_created:1483394497000};

var repl = new ReplitClient('api.repl.it', 80, 'java', REPLIT_TOKEN);


repl.connect().then(
  function() { console.log('connected'); },
  function(err) { console.log(err); }
);