# Java (&Python) Online Compile & Compare System

Documentation：

Endpoints:

http://localhost:3000/api/compare<br />
Get {input, output, code, language}<br />
post {status, result}<br />

status: <br />
<True> when students output same as preset Output<br />
<False> when failed to compile or output are different<br />

result: <br />
The output of code if success<br />
<br />

http://localhost:3000/api/compile<br />
Get {input, code, language}<br />
post {status, result(Output to string)}<br />

status: <br />
"success" when compiled successfully<br />
"taking too much time"<br />
"Unsupported language"<br />

result: <br />
The output of code if success<br />

<> for Boolean<br />
"" for String<br />

Made by Group Akiraku (あきらく)
