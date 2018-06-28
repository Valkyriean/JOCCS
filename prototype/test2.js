

var a = [1,"",2,"","",4]
var counter = 0;

a.forEach(function(item) {
    if(item == ""){
        counter += 1;
    };
});

while(counter > 0) {
    a.splice(a.indexOf(""),1);
    counter -= 1;
};
