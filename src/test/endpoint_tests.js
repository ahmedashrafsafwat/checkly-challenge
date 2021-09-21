const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");

let Server = require("../server");

let serverClassUser = new Server("user",8081);
let serverClassCheck = new Server("check",8082);

let serverUser = serverClassUser.start()
let serverCheck = serverClassCheck.start()

chai.use(chaiHttp);
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);

// get tables
const  Check  = require('../models/check');

var token = "",checkid="";

/**
 * Reports Tests
 */
describe("Endpoint Tests", function() {

  /* 
  * Clean Up the reports used for tests
  * as we have only one database and no test database
  * so lets change the tested upon doucment to make it go back to OPEN state before each test
  */
  before(async function(){ 
    await Check.deleteOne({"title": "This is a test title.","description":"This is a test description"})
  });


  describe("Testing check services", function() {
    it("Should be able to add new check", done => {
      chai
        .request(serverCheck)
        .post("/checks")
        .set("x-access-token",token)
        .send({
          "checkType": "string",
          "name": "string",
          "frequency": 10,
          "activated": true,
          "muted": true,
          "doubleCheck": "string",
          "script": "asd"  
        })
        .end((err, res) => {
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.have.all.keys(
            "_id",
            "checkType",
            "name",
            "frequency",
            "activated",
            "muted",
            "doubleCheck",
            "script"
          );
          checkid = res.body.data._id

          done();
        });
    });
    it("Should be able to get all checks", done => {
      chai
        .request(serverCheck)
        .get("/checks")
        .set("x-access-token",token)
        .set("Content-Type", "application/json")
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.be.an('array')

          done();
        });
    });
    it("Should be able to get all checks with pagination too", done => {
      chai
        .request(serverCheck)
        .get("/checks?perPage=6&page=0")
        .set("x-access-token",token)
        .set("Content-Type", "application/json")
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.be.an('array')

          done();
        });
    });
    it("Should be able to edit a checks", done => {
      chai
        .request(serverCheck)
        .put("/checks/" + checkid)
        .set("Content-Type", "application/json")
        .set("x-access-token",token)
        .send({
            "title": "1234",
            "description": "1234",
            "deadline": "Fri Sep 05 2021 06:13:20 GMT+0200" ,
            "reminderTime": "Fri Sep 05 2021 06:13:20 GMT+0200",
            "isCompleted": true
        })
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.have.property('nModified', 1);

          done();
        });
    });
    it("Should be able to delete a check", done => {
      chai
        .request(serverCheck)
        .delete("/check/delete/" + checkid)
        .set("Content-Type", "application/json")
        .set("x-access-token",token)
        .end((err, res) => {
          
          // Check for returned result
          expect(res.body).to.have.all.keys('code','message','data');
          expect(res.body).to.have.property('code', 200);
          expect(res.body.data).to.have.property('deletedCount', 1);

          done();
        });
    });
  })

});


