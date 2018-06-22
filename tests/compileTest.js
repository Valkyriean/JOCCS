let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

//use this for testing on docker
let endPoint = "192.168.99.100:3000/api/compiler";

//use this for testing locally
// let endPoint = "http://localhost:3000/api/compiler";

describe('Compile Test',() =>{
    it('Compile', (done) => {
        chai.request(endPoint)
            .post('/compile')
            .send({
              "input":["test","aaa"],
              "language":"java",
              "code":"/**abc*/import java.util.Scanner;/*aaa*/public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();String b = s.nextLine();System.out.println(a); System.out.println(b);}}"})
            .end((err, res) => {
                res.body.should.have.status("success");
                //res.body.should.have.status({result: ["test","aaa"]});
                //expect(res.body).to.have.a.property("result");
                expect(res.body).to.have.deep.property('result', ["test","aaa"]);
                done();
            });
    });
});
