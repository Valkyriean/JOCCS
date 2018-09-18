let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

//use this for testing on docker
//let endPoint = "192.168.99.100:3000/api/compiler";

//use this for testing locally
let endPoint = "http://localhost:3000/api/compiler";

describe('Compare Test',() =>{
    it('Single input with correct output', (done) => {
        chai.request(endPoint)
            .post('/compare')
            .send({
              "input": ["test"],
              "output": ["test"],
              "language": "java",
              "code": "/**abc*/import java.util.Scanner;/*aaa*/public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();System.out.println(a);}}"
            })
            .end((err, res) => {
              expect(res.body).to.have.deep.property('status', true)
              expect(res.body).to.have.deep.property('result', ["test"])
              done()
            })
    }).timeout(10000)

    it('Single input with wrong output', (done) => {
        chai.request(endPoint)
            .post('/compare')
            .send({
              "input": ["test"],
              "output": ["testtest"],
              "language": "java",
              "code": "/**abc*/import java.util.Scanner;/*aaa*/public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();System.out.println(a);}}"
            })
            .end((err, res) => {
              expect(res.body).to.have.deep.property('status', false)
              expect(res.body).to.have.deep.property('result', ["test"])
              done()
            })
    }).timeout(10000)

    it("Double input with correct output", (done) => {
        chai.request(endPoint)
            .post('/compare')
            .send({
              "input": "test\r\naaa",
              "output": ["testaaa"],
              "language": "java",
              "code": "/**abc*/import java.util.Scanner;/*aaa*/public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();String b = s.nextLine();System.out.println(a+b);}}"
            })
            .end((err,res) => {
              expect(res.body).to.have.deep.property('status', true)
              expect(res.body).to.have.deep.property('result', ["testaaa"])
              done()
            })
    }).timeout(10000)
})
