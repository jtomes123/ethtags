pragma solidity ^0.4.19;

contract Dogtags {
    struct Dogtag {
        string name;
        string content;
        bool verified;
        bool canVerify;
        bool isAdmin;

        address verifier;
    }
    
    mapping (address => Dogtag) dogtags;
    address owner;
    
    function Dogtags() public {
        owner = msg.sender;
    }

    //Getters
    function GetDogtagContent(address adr) public constant returns(string) {
        return dogtags[adr].content;
    }
    function GetDogtagName(address adr) public constant returns(string) {
        return dogtags[adr].name;
    }
    function GetVerifier(address adr) public constant returns(address) {
        return dogtags[adr].verifier;
    }
    function IsVerifier(address adr) public constant returns(bool) {
        return dogtags[adr].canVerify || dogtags[adr].isAdmin || (adr == owner);
    }
    function IsVerified(address adr) public constant returns(bool) {
        return dogtags[adr].verified;
    }
    function IsAdmin(address adr) public constant returns(bool) {
        return dogtags[adr].isAdmin || (adr == owner);
    }
    function IsOwner(address adr) public constant returns(bool) {
        return (adr == owner);
    }
    function GetContractBalance() public constant returns(uint) {
        return this.balance;
    }
    
    //Setters
    function SetDogtag(string name, string content) public payable {
        dogtags[msg.sender].name = name;
        dogtags[msg.sender].content = content;
        dogtags[msg.sender].verified = false;
    }
    function SetDogtagContent(string content) public payable {
        dogtags[msg.sender].content = content;
    }
    function SetDogtagName(string name) public payable {
        dogtags[msg.sender].name = name;
        dogtags[msg.sender].verified = false;
    }
    function SetNewOwner(address adr) public {
        if(msg.sender == owner) {
            owner = adr;
        }
    }
    function SetAdminStatus(address adr, bool status) public {
        if (msg.sender == owner) {
            if (dogtags[adr].isAdmin != status) {
                dogtags[adr].isAdmin = status;
            } else {
                revert();
            }
        } else {
            revert();
        }
    }
    function SetVerificationStatus(address adr, bool status) public {
        if (dogtags[msg.sender].canVerify || msg.sender == owner) {
            if (dogtags[adr].verified != status) {
                dogtags[adr].verified = status;
                dogtags[adr].verifier = msg.sender;
            } else {
                revert();
            }
        } else {
            revert();
        }
    }
    function SetVerifierStatus(address adr, bool status) public {
        if (msg.sender == owner || dogtags[msg.sender].isAdmin) {
            if (dogtags[adr].canVerify != status) {
                dogtags[adr].canVerify = status;
            } else {
                revert();
            }
        } else {
            revert();
        }
    }
    function Withdraw(uint amount) public {
        if (msg.sender == owner) {
            if (this.balance - amount > this.balance / 10) {
                owner.transfer(amount);
            }
        }
    }
    function Donate() payable {

    }
}