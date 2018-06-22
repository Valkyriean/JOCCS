let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

let endPoint = "192.168.99.100:3000/api";

describe('Test',() =>{
    it('Basic connectivity', (done) => {
        chai.request(endPoint)
            .post('/test')
            .end((err, res) => {
                res.body.should.have.status("success");
                done();
            });
    });
});
