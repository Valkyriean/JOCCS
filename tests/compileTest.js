let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

let endPoint = "http://localhost:3000/api/compiler";

describe('Compile Test',() =>{
    it('student signup', (done) => {
        chai.request(endPoint)
            .post('/compile')
            .send({"input":"test", "language":"java", "code":"import java.util.Scanner;public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();System.out.println(a);System.out.println(a);}}"})
            .end((err, res) => {
                res.body.should.have.status("success");
                //res.body.result.should.have("test");
                //expect(res.body).to.have.a.property({'result': 'test'})
                done();
            });
    });
});
