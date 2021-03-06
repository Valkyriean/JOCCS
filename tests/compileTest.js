let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

//use this for testing on docker
//let endPoint = "192.168.99.100:3000/api/compiler";

//use this for testing locally
let endPoint = "http://localhost:3000/api/compiler";

describe('Compile Test',() =>{
    it('Single input and single output', (done) => {
        chai.request(endPoint)
            .post('/compile')
            .send({
              "input":["test"],
              "language":"java",
              "code":"/**abc*/import java.util.Scanner;/*aaa*/public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();System.out.println(a);}}"})
            .end((err, res) => {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', ["test"]);
                done();
            });
          }).timeout(10000);

    it('Single input and double output', (done) => {
        chai.request(endPoint)
            .post('/compile')
            .send({
              "input":["test"],
              "language":"java",
              "code":"/**abc*/import java.util.Scanner;/*aaa*/public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();System.out.println(a);System.out.println(a+a);}}"})
            .end((err, res) => {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', ["test","testtest"]);
                done();
            });
          }).timeout(10000);

    it('Double input and single output', (done) => {
        chai.request(endPoint)
            .post('/compile')
            .send({
              "input":"test\r\naaa",
              "language":"java",
              "code":"/**abc*/import java.util.Scanner;/*aaa*/public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();String b = s.nextLine();System.out.println(a+b);}}"})
            .end((err, res) => {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', ["testaaa"]);
                done();
            });
          }).timeout(10000);

    it('Double input and double output', (done) => {
        chai.request(endPoint)
            .post('/compile')
            .send({
              "input":["test","aaa"],
              "language":"java",
              "code":"/**abc*/import java.util.Scanner;/*aaa*/public class test { public static void main(String[] args){Scanner s = new Scanner(System.in);String a = s.nextLine();String b = s.nextLine();System.out.println(a); System.out.println(b);}}"})
            .end((err, res) => {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', ["test","aaa"]);
                done();
            });
          }).timeout(10000);

      it('Single input and single output python', (done) => {
          chai.request(endPoint)
              .post('/compile')
              .send({
                "input": ["test"],
                "language": "python",
                "code": 'a=input("aaa")\r\nprint(a)'
              })
              .end((err, res) => {
                  res.body.should.have.status("success");
                  expect(res.body).to.have.deep.property('result', ["test"])
                  done();
              });
      }).timeout(10000)

      it('Single input and double output python', (done)=> {
          chai.request(endPoint)
              .post('/compile')
              .send({
                "input": "test",
                "language": "python",
                "code": 'a = input("aaa")\r\nprint(a)\r\nprint(a+a)'
              })
              .end((err,res) => {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', ["test","testtest"])
                done();
              })
      }).timeout(10000)

      it('Double input and single output python', (done)=> {
          chai.request(endPoint)
              .post('/compile')
              .send({
                "input": "test\raaa",
                "language": "python",
                "code": 'a=input("aaa")\r\nb=input("bbb")\r\nprint(a+b)'
              })
              .end((err,res)=> {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result',["testaaa"])
                done();
              })
      }).timeout(10000)

      it('Double input and double output python', (done)=> {
          chai.request(endPoint)
              .post('/compile')
              .send({
                "input": "test\r\naaa",
                "language": "python",
                "code": 'a=input("aaa")\r\nb=input("bbb")\r\nprint(a)\r\nprint(b)'
              })
              .end((err,res)=> {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result',["test","aaa"])
                done()
              })
      }).timeout(10000)

      it('blank output python', (done) => {
          chai.request(endPoint)
              .post('/compile')
              .send({
                "input": "",
                "language": "python",
                "code": 'print(" ")'
              })
              .end((err, res)=> {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', [" "])
                done()
              })
      }).timeout(10000)

      it('blank output java', (done) => {
          chai.request(endPoint)
              .post('/compile')
              .send({
                "input": "",
                "language": "java",
                "code": 'public class test{public static void main(String[] arg){System.out.println(" ");}}'
              })
              .end((err, res)=> {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', [" "])
                done()
              })
      }).timeout(10000)

      it('String null output python', (done) => {
          chai.request(endPoint)
              .post('/compile')
              .send({
                "input": "",
                "language": "python",
                "code": 'print("")\nprint("")'
              })
              .end((err, res) => {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', ["",""])
                done()
              })
      }).timeout(10000)

      it('String null output java', (done) => {
          chai.request(endPoint)
              .post('/compile')
              .send({
                "input": "",
                "language": "java",
                "code": 'public class test { public static void main(String[] arg) {System.out.println("");System.out.println("");}}'
              })
              .end((err, res) => {
                res.body.should.have.status("success");
                expect(res.body).to.have.deep.property('result', ["",""])
                done()
              })
      }).timeout(10000)
});
