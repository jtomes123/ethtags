pragma solidity ^0.4.19;

contract Dogtags {
    struct Dogtag {
        string name;
        string content;
        bool verified;
        bool canVerify;
    }
    
    mapping (address => Dogtag) dogtags;
    
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
    function Verify(address adr) public returns(string) {
        if(dogtags[msg.sender].canVerify) {
            dogtags[adr].verified = true;
        }
    }
    function UnVerify(address adr) public returns(string) {
        if(dogtags[msg.sender].canVerify) {
            dogtags[adr].verified = false;
        }
    }
}