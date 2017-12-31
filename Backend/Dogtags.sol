pragma solidity ^0.4.19;

contract Dogtags {
    struct Dogtag {
        string name;
        string content;
    }
    
    mapping (address => Dogtag) dogtags;
    
    //Getters
    function GetDogtagContent(address adr) public constant returns(string) {
        return dogtags[adr].content;
    }
    function GetDogtagName(address adr) public constant returns(string) {
        return dogtags[adr].name;
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
    
}