inputCode = input("")
inputAttKeys = input("")
inputAttValues = input("")
inputAttTypes = input("")

inputAttKeys = inputAttKeys[1:-1].split(",")
inputAttValues = inputAttValues[1:-1].split(",")
inputAttTypes = inputAttTypes[1:-1].split(",")

for i in range(len(inputAttTypes)):
    if inputAttTypes[i] == '"int"':
        inputAttValues[i] = int(inputAttValues[i])

if len(inputAttKeys) != len(inputAttValues):
    print("input does not match")
else:
    att = dict(list(zip(inputAttKeys, inputAttValues)))
    exec(inputCode, att)
