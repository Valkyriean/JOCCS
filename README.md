# JOCCS
#Java (&Python) Online Compile & Compare System

Documentation：

Endpoints:

http://localhost:3000/api/compare
Get {input, output, code, language}
post {status, result}
status: <True> when students output same as preset Output
        <False> when failed to compile or output are different
result: The output of code if success

http://localhost:3000/api/compile
Get {input, code, language}
post {status, result(Output to string)}
status: "success" when compiled successfully
        "taking too much time"
        "Unsupported language"
result: The output of code if success

<> for Boolean
"" for String

Made by Group Akiraku (あきらく)
