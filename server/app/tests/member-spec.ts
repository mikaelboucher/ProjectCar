import { expect } from 'chai';
import { Member } from '../objects/member';
import 'mocha';

describe('Class Member', () => {
    let member = new Member("Donald", "Trump");
    
    describe("constructor, getFirstName() and getLastName()", function() {
        it("should create a member and store and return its first name and last name", ()=> {
            expect(member.getFirstName()).to.equal("Donald");
            expect(member.getLastName()).to.equal("Trump");
        }); 
    });

    describe("addTwitterAccount()", ()=> {
        it("should add a twitter account to the member's list", function() {
            member.addTwitterAccount("SashaGrey");
            member.addTwitterAccount("KimJongUn");
            member.addTwitterAccount("Kevin_T21");
            expect(member.getTwitterAccounts()[0]).to.equal("SashaGrey");
            expect(member.getTwitterAccounts().indexOf("Kevin_T21")).to.equal(2);
            expect(member.getTwitterAccounts().indexOf("abcdef")).to.equal(-1);
        });
    }); 

    describe("addTwitterHashtag()", ()=> {
        it("should add an hashtag to the member's list", function() {
            member.addTwitterHashtag("covfefe");
            member.addTwitterHashtag("vaporwave");
            member.addTwitterHashtag("bacon");
            expect(member.getHashtags()[0]).to.equal("covfefe");
            expect(member.getHashtags().indexOf("bacon")).to.equal(2);
            expect(member.getHashtags().indexOf("abcdef")).to.equal(-1);
        });
    }); 

    describe("removeTwitterAccount()", ()=> {
        it("should remove a twitter account to the member's list", function() {
            member.removeTwitterAccount("KimJongUn");
            expect(member.getTwitterAccounts().indexOf("KimJongUn")).to.equal(-1);
            expect(member.getTwitterAccounts()[1]).to.equal("Kevin_T21"); //splice moved it up 1 index
        });
    });

    describe("removeTwitterHashtag()", ()=> {
        it("should remove an hashtag to the member's list", function() {
            member.removeTwitterHashtag("vaporwave");
            expect(member.getHashtags().indexOf("vaporwave")).to.equal(-1);
            expect(member.getHashtags()[1]).to.equal("bacon"); //splice moved it up 1 index
        });
    });
});
