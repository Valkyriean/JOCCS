let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let endPoint = "http://localhost:3000/api";

describe('Test',() =>{
    it('student signup', (done) => {
        chai.request(endPoint)
            // .post('/users/signup')
            // .send({"email":"student@email.com","type":"student","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
            // .end((err, res) => {
            //     res.body.should.have.status("success");
            //     done();
            // });
    });
});