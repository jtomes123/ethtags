pragma solidity ^0.4.19;
/*
This contract was created by Jakub Tomeš and is licensed under MIT license
Github: https://github.com/jtomes123/ethtags
*/

/*
A contract that stores data of the main contract.
This allows the main contract to be more easily updated.
*/
contract DogtagsDataStorage {
    //Address of the owner, initially the person that deploys the contract
    address owner;
    //Address of the main contract
    address currentContract;

    //The constructor
    function DogtagsDataStorage(address newContract) public {
        owner = msg.sender;
        currentContract = newContract;
    }

    //Modifier that checks if the sender is authorised to make any changes
    modifier onlyAuthorized {
        require(msg.sender == owner || msg.sender == currentContract);
        _;
    }
    //Modifier that checks if the sender is owner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //Setters for the owner and contract
    function setOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
    function setContract(address newContract) public onlyAuthorized {
        currentContract = newContract;
    }

    //Storage for strings
    mapping (address => mapping(string => string)) strings;
    function getString(address user, string key) view public returns(string) {
        return strings[user][key];
    }
    function setString(address user, string key, string value) public onlyAuthorized {
        strings[user][key] = value;
    }

    //Storage for bools
    mapping (address => mapping(string => bool)) bools;
    function getBool(address user, string key) view public returns(bool) {
        return bools[user][key];
    }
    function setBool(address user, string key, bool value) public onlyAuthorized {
        bools[user][key] = value;
    }

    //Storage for addresses
    mapping (address => mapping(string => address)) addresses;
    function getAddress(address user, string key) view public returns(address) {
        return addresses[user][key];
    }
    function setAddress(address user, string key, address value) public onlyAuthorized {
        addresses[user][key] = value;
    }

    //Storage for uints
    mapping (address => mapping(string => uint)) ints;
    function getInt(address user, string key) view public returns(uint) {
        return ints[user][key];
    }
    function setInt(address user, string key, uint value) public onlyAuthorized {
        ints[user][key] = value;
    }
}
/* Main Contract */
contract Dogtags {
    DogtagsDataStorage data;
    address owner;
    
    function Dogtags() public {
        owner = msg.sender;
    }

    //Modifier that checks if the sender is owner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    //Modifier that checks if the sender is owner or admin
    modifier onlyAdmin {
        require(msg.sender == owner || data.getBool(msg.sender, "isAdmin"));
        _;
    }
    //Modifier that checks if the sender can verify
    modifier onlyVerifier {
        require(msg.sender == owner || data.getBool(msg.sender, "isAdmin") || data.getBool(msg.sender, "isVerifier"));
        _;
    }

    //Sets the address of DataStorageContract this is necessary for the contract to function
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

    /*
    These functions set the content of the dogtag
    */
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

    //Set new owner of the contract
    function SetNewOwner(address adr) public onlyOwner {
        owner = adr;
    }

    //Set if the address is admin
    function SetAdminStatus(address adr, bool status) public onlyOwner {
        data.setBool(adr, "isAdmin", status);
    }

    //Set if dogtag is verified or not
    function SetVerificationStatus(address adr, bool status) public onlyVerifier {
        data.setBool(adr, "isVerified", status);
        data.setAddress(adr, "verifier", msg.sender);
    }

    //Gives address the ability to verify users
    function SetVerifierStatus(address adr, bool status) public onlyAdmin {
        if (data.getBool(msg.sender, "isVerifier") != status) {
            data.setBool(adr, "isVerifier", status);
        } else {
            revert();
        }
    }
    function Withdraw(uint amount) public onlyOwner {
        if (address(this).balance - amount > address(this).balance / 10) {
            owner.transfer(amount);
        }
    }
    function Donate() public payable {

    }
}