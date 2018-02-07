pragma solidity ^0.4.19;

contract Dogtags {
    struct Dogtag {
        string name;
        string content;
        bool verified;
        bool canVerify;
        bool isAdmin;
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
    function IsVerifier(address adr) public constant returns(bool) {
        return dogtags[adr].canVerify;
    }
    function IsVerified(address adr) public constant returns(bool) {
        return dogtags[adr].verified;
    }
    function IsAdmin(address adr) public constant returns(bool) {
        return dogtags[adr].isAdmin;
    }
    function IsOwner(address adr) public constant returns(bool) {
        return (adr == owner);
    }
    
    
    //Setters
    function SetDogtag(string name, string content) public {
        dogtags[msg.sender].name = name;
        dogtags[msg.sender].content = content;
    }
    function SetDogtagContent(string content) public {
        dogtags[msg.sender].content = content;
    }
    function SetDogtagName(string name) public {
        dogtags[msg.sender].name = name;
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
}