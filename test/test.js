const {expect} =  require("chai");
const { ethers } = require("hardhat");
const testCase = require('mocha').describe;
testCase("Deployment",function(){
    let Token;
    let hardhatToken;
    let owner;
    let pat1;
    let doc1;
    

    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        [owner,pat1,doc1] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });
    testCase("Token Contract",function(){
        it("Deployment for Owner Info Check",async function(){
            console.log("Owner Address : ",owner.address);
            const ownerInfo = await hardhatToken.getOwnerInfo();
            console.log("Owner Info : ",ownerInfo);
            expect(await owner.address).to.equal(ownerInfo);
        });

        it("Deployment for Patient Register",async function(){
            console.log("pat1 address",pat1.address);
            await hardhatToken.connect(pat1).addPatient("Avi","25112000","7054416929","Male","9966789012349988");
            expect(await pat1.address).to.equal(pat1.address);
        });
        it("Display pat1 details",async function(){
    
            console.log("pat1 address",pat1.address);
            await hardhatToken.connect(pat1).addPatient("Avi","25112000","7054416929","Male","9966789012349988");
            const result =  await hardhatToken.connect(pat1).getPatientInfo();
            // const {0:na,1:dob,2:an,3:adrs,4:gen,5:con,6:fi,7:dl} = result;
            console.log("result : ",result);
            expect(await pat1.address).to.equal(result[5]);
        });
        it("Display doc details",async function(){
            console.log("doc1 address:",doc1.address);
            await hardhatToken.connect(doc1).addDoctor(doc1.address,"Dr.Sandeep","12345678","Heart","12334455667788991123");
            const result = await hardhatToken.connect(doc1).getDoctorInfo();
            console.log(result);
            console.log("result Doc address : ",result[4]);
            expect(await doc1.address).to.equal(result[4]);
        });
    });
    
});