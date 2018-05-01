pragma solidity ^0.4.19;

contract DogtagsDataStorage {
    address owner;
    address currentContract;

    function DogtagsDataStorage(address newContract) public {
        owner = msg.sender;
        currentContract = newContract;
    }

    modifier onlyAuthorized {
        require(msg.sender == owner || msg.sender == currentContract);
        _;
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
    function setContract(address newContract) public onlyAuthorized {
        currentContract = newContract;
    }

    struct Dogtag {
        string name;
        string content;
        bool verified;
        bool canVerify;
        bool isAdmin;

        address verifier;
    }

    mapping (address => mapping(string => string)) strings;
    function getString(address user, string key) view public returns(string) {
        return strings[user][key];
    }
    function setString(address user, string key, string value) public onlyAuthorized {
        strings[user][key] = value;
    }

    mapping (address => mapping(string => bool)) bools;
    function getBool(address user, string key) view public returns(bool) {
        return bools[user][key];
    }
    function setBool(address user, string key, bool value) public onlyAuthorized {
        bools[user][key] = value;
    }

    mapping (address => mapping(string => address)) addresses;
    function getAddress(address user, string key) view public returns(address) {
        return addresses[user][key];
    }
    function setAddress(address user, string key, address value) public onlyAuthorized {
        addresses[user][key] = value;
    }

    mapping (address => mapping(string => uint)) ints;
    function getInt(address user, string key) view public returns(uint) {
        return ints[user][key];
    }
    function setInt(address user, string key, uint value) public onlyAuthorized {
        ints[user][key] = value;
    }
}
contract Dogtags {
    DogtagsDataStorage data;
    address owner;
    
    function Dogtags() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function setDataStorageContract(address newContract) public onlyOwner {
        data = DogtagsDataStorage(newContract);
    }
    //Getters
    function GetDogtagContent(address adr) public constant returns(string) {
        return data.getString(adr, "content");
    }
    function GetDogtagName(address adr) public constant returns(string) {
        return data.getString(adr, "name");
    }
    function GetVerifier(address adr) public constant returns(address) {
        return data.getAddress(adr, "verifier");
    }
    function IsVerifier(address adr) public constant returns(bool) {
        return data.getBool(adr, "isVerifier") || data.getBool(adr, "isAdmin") || (adr == owner);
    }
    function IsVerified(address adr) public constant returns(bool) {
        return data.getBool(adr, "isVerified");
    }
    function IsAdmin(address adr) public constant returns(bool) {
        return data.getBool(adr, "isAdmin") || (adr == owner);
    }
    function IsOwner(address adr) public constant returns(bool) {
        return (adr == owner);
    }
    function GetContractBalance() public constant returns(uint) {
        return address(this).balance;
    }
    
    //Setters
    function SetDogtag(string name, string content) public payable {
        data.setString(msg.sender, "name", name);
        data.setString(msg.sender, "content", content);
        data.setBool(msg.sender, "isVerified", false);
    }
    function SetDogtagContent(string content) public payable {
        data.setString(msg.sender, "content", content);
    }
    function SetDogtagName(string name) public payable {
        data.setString(msg.sender, "name", name);
        data.setBool(msg.sender, "isVerified", false);
    }
    function SetNewOwner(address adr) public {
        if(msg.sender == owner) {
            owner = adr;
        }
    }
    function SetAdminStatus(address adr, bool status) public {
        if (msg.sender == owner) {
            if (data.getBool(adr, "isAdmin") != status) {
                data.setBool(adr, "isAdmin", status);
            } else {
                revert();
            }
        } else {
            revert();
        }
    }
    function SetVerificationStatus(address adr, bool status) public {
        if (data.getBool(msg.sender, "isVerifier") || msg.sender == owner) {
            data.setBool(adr, "isVerified", status);
            data.setAddress(adr, "verifier", msg.sender);
        } else {
            revert();
        }
    }
    function SetVerifierStatus(address adr, bool status) public {
        if (msg.sender == owner || data.getBool(msg.sender, "isAdmin")) {
            if (data.getBool(msg.sender, "isVerifier") != status) {
                data.setBool(adr, "isVerifier", status);
            } else {
                revert();
            }
        } else {
            revert();
        }
    }
    function Withdraw(uint amount) public {
        if (msg.sender == owner) {
            if (address(this).balance - amount > address(this).balance / 10) {
                owner.transfer(amount);
            }
        }
    }
    function Donate() payable {

    }
}