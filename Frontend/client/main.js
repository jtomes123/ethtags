import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

function getContract() {
  var DogtagsContract = web3.eth.contract([
    {
      "constant": true,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "GetDogtagContent",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        },
        {
          "name": "status",
          "type": "bool"
        }
      ],
      "name": "SetAdminStatus",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "IsVerifier",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "GetDogtagName",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "content",
          "type": "string"
        }
      ],
      "name": "SetDogtagContent",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "IsVerified",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "string"
        }
      ],
      "name": "SetDogtagName",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "IsAdmin",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        },
        {
          "name": "status",
          "type": "bool"
        }
      ],
      "name": "SetVerificationStatus",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ],
      "name": "SetDogtag",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "SetNewOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "Donate",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "IsOwner",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        },
        {
          "name": "status",
          "type": "bool"
        }
      ],
      "name": "SetVerifierStatus",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "GetContractBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "adr",
          "type": "address"
        }
      ],
      "name": "GetVerifier",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ]);
  return DogtagsContract.at('0x0305c3463f4efd55466a4b09df63a3483da5fd00'); //Old address: 0x564b3d0a2453a93790c9726031b2a848cf7a2e6b, 0x0691b26ee7c91a1518b3e6b7adbefb31b402d951
}
//--------------------------------------------------------
//Main
//--------------------------------------------------------
Template.main.onCreated(function mainOnCreated() {
  //Check if web3 is installed
  if(typeof web3 === 'undefined')
    BlazeLayout.render('App_Body', {main: 'eth_miss'});

  EthBlocks.init();
  EthAccounts.init();
  this.nameAsync = new ReactiveVar("Retrieving...");
  this.contentAsync = new ReactiveVar("Retrieving...");
  this.address = new ReactiveVar("0xc000a000a000aa00a00a0a00a00aa0000a000000");
  this.link = new ReactiveVar("http://ethtags.herokuapp.com/0xc000a000a000aa00a00a0a00a00aa0000a000000/true/ffffff/000000");

  new Clipboard('#copyLinkBut');
  new Clipboard('#copyIframeBut');

  var Dogtags = getContract();
  console.log(Dogtags);
  this.dogtags = Dogtags;
  this.data.dogtags = Dogtags;
  var na = this.nameAsync;
  var ca = this.contentAsync;
  var adr = this.address;
  var lnk = this.link;
  Meteor.setTimeout(function() {
    console.log(web3.eth.accounts);
    adr.set(web3.eth.accounts[0]);
    Dogtags.GetDogtagName(web3.eth.accounts[0], function (error, result){
      if(!error)
        na.set(result);
      else
          console.error(error);
    });
    
    Dogtags.GetDogtagContent(web3.eth.accounts[0], function (error, result){
      if(!error)
      {
        ca.set(result);
      }
      else
          console.error(error);
    });
  } ,750);
  Meteor.setTimeout(function() {
    lnk.set("http://ethtags.herokuapp.com" + "/iframe/" + adr.get() + "/true/ffffff/000000");
  }, 1000);
});
Template.main.helpers({
  name() {
    var na = Template.instance().nameAsync;

    return na.get();
  },
  content() { 
    var ca = Template.instance().contentAsync;
    return ca.get();
  },
  link() {
    return Template.instance().link.get();
  },
  iframe() {
    return "<iframe src=\""+ Template.instance().link.get() +"\"></iframe>";
  }
});
Template.main.events({
  'submit .new-post'(event, instance) {
      event.preventDefault();
      $("#popupAdr").text("Address: " + web3.eth.accounts[0]);
      $("#popupName").text("Name: " + $("#dogtagName").get(0).value);
      $("#popupCon").text("Content: " + $('#dogtagContent').get(0).value);
      $("#confirmDogtagPopup").css("display", "block");
  },
  'change .style'(event, instance) {
    //console.log("Change: " + $("#bgc").val() + " " + $("#textc").val() + " " + $("#showqr").is(":checked"));
    instance.link.set("http://ethtags.herokuapp.com" + "/iframe/" + instance.address.get() + "/" + $("#showqr").is(":checked") + "/" + $("#bgc").val().replace("#", "") + "/" + $("#textc").val().replace("#", ""));
  },
});

//--------------------------------------------------------
//Menu
//--------------------------------------------------------
Template.title.events({
  'click .but_home'(event, instance) {
    FlowRouter.go('main');
  },
  'click .but_about'(event, instance) {
    FlowRouter.go('about');
  },
  'click .but_faq'(event, instance) {
    FlowRouter.go('faq');
  },
});
//--------------------------------------------------------
//Confirm dogtag popup
//--------------------------------------------------------
Template.confirmDogtagPopup.events({
  'click #cancel'(event, instance) {
    $("#confirmDogtagPopup").css("display", "none");
  },
  'click #confirm' (event, instance) {
    Template.parentData(2).data.dogtags.SetDogtag($("#dogtagName").get(0).value, $('#dogtagContent').get(0).value, {from: web3.eth.accounts[0], gas: 3000000, value: 1000000000000000000 * $("#ethDonateAmount").get(0).value}, function (error, result){
      if(!error)
          console.log(result)
      else
          console.error(error);
    });
    $("#confirmDogtagPopup").css("display", "none");
  }
});
//--------------------------------------------------------
//Withdraw
//--------------------------------------------------------
Template.withdraw.onCreated(function mainOnCreated() {
  //Check if web3 is installed
  if(typeof web3 === 'undefined')
    BlazeLayout.render('App_Body', {main: 'eth_miss'});

  var Dogtags = getContract();
  console.log(Dogtags);
  this.dogtags = Dogtags;
});
Template.withdraw.events({
  'click .previewbut'(event, instance) {
    instance.dogtags.Withdraw(1000000000000000000 * $("#ethWithdrawAmount").get(0).value ,function (error, result){
      if(!error)
          console.log(result)
      else
          console.error(error);
    });
  },
});
//--------------------------------------------------------
//Verification
//--------------------------------------------------------
Template.verification.events({
  'click #continueBut'(event, instance) {
    FlowRouter.go('/vercon/' + $("#address").val());
  },
});
Template.verification.onCreated(function mainOnCreated() {
  //Check if web3 is installed
  if(typeof web3 === 'undefined')
    BlazeLayout.render('App_Body', {main: 'eth_miss'});

  this.address = new ReactiveVar("0xc000a000a000aa00a00a0a00a00aa0000a000000");


  var Dogtags = getContract();
  console.log(Dogtags);
  this.dogtags = Dogtags;
  var adr = this.address;
  Meteor.setTimeout(function() {
    console.log(web3.eth.accounts);
    adr.set(web3.eth.accounts[0]);
    Dogtags.IsVerifier(web3.eth.accounts[0], function (error, result){
      if(!error)
      {
        if(!result)
          BlazeLayout.render('verificationNotAVerifier');
      }
      else
          console.error(error);
    });
  } ,750);
});

Template.verificationConfirm.events({
  'click #verifyBut'(event, instance) {
    instance.data.dogtags.SetVerificationStatus(instance.address, true, function (error, result){
      if(!error)
        FlowRouter.go("/ver");
      else
          console.error(error);
    });
  },
});
Template.verificationConfirm.helpers({
  content(){
    return Template.instance().contentAsync.get();
  },
  signature(){

    return Template.instance().nameAsync.get();
  },
  address(){
    return FlowRouter.getParam("_id");
  },
});
Template.verificationConfirm.onCreated(function verconOnCreated() {
  //TODO: Change to mainnet when published
  if(typeof web3 === 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

  this.nameAsync = new ReactiveVar("Retrieving...");
  this.contentAsync = new ReactiveVar("Retrieving...");
  this.address = FlowRouter.getParam("_id");

  //Gets the instance of Dogtags contract
  var Dogtags = getContract();
  console.log(Dogtags);
  this.data.dogtags = Dogtags;
  var na = this.nameAsync;
  var ca = this.contentAsync;

  //Wait for web3 to be injected, to be replaced in future with more efficient logic
  Meteor.setTimeout(function() {
    Dogtags.GetDogtagName(FlowRouter.getParam("_id"), function (error, result){
      if(!error)
        na.set(result);
      else
          console.error(error);
    });
    
    Dogtags.GetDogtagContent(FlowRouter.getParam("_id"), function (error, result){
      if(!error)
      {
        ca.set(result);
      }
      else
          console.error(error);
    });

    Dogtags.IsVerified(FlowRouter.getParam("_id"), function(error, result){
      if(!error)
      {
        if(!result)
        {
          // User is not verified, hide the checkmark
          $(".checkmark").hide();
        }
      }
      else
          console.error(error);
    });
  } ,750);
});

//--------------------------------------------------------
//Iframe
//--------------------------------------------------------
Template.iframe.helpers({
  content(){
    return Template.instance().contentAsync.get();
  },
  signature(){

    return Template.instance().nameAsync.get();
  },
  address(){
    return FlowRouter.getParam("_id");
  },
});
Template.iframe.onRendered(function () {
  var adr = FlowRouter.getParam("_id");
  var bgc = FlowRouter.getParam('_bgc');
  var textc = FlowRouter.getParam('_textc');
  var qrcodec = '000000';
  if(typeof(textc) != 'undefined')
    qrcodec = textc;
  if(FlowRouter.getParam("_showqr") != "false")
  {
    $('#code').qrcode({
      size: 150,
      text: adr,
      radius: 0.5,
      quiet: 1,
      exLevel: 'H',
      mode: 2,
      label: 'Ethereum',
      fontname: 'sans',
      fontcolor: '#' + qrcodec,
      fill: '#' + qrcodec,
    });
  }
  else
  {
    $('#code').hide();
  }

  if(typeof(bgc) != 'undefined')
    $('body').css('background', '#' + bgc);
  else
    $('body').css('background', '#FFFFFF');
  if(typeof(textc) != 'undefined')
  {
    $('body').css('color', '#' + textc);
    $(".checkmark g path").css("fill", "#" + textc);
  }
});
Template.iframe.onCreated(function iframeOnCreated() {
  //TODO: Change to mainnet when published
  if(typeof web3 === 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

  this.nameAsync = new ReactiveVar("Retrieving...");
  this.contentAsync = new ReactiveVar("Retrieving...");
  this.address = FlowRouter.getParam("_id");

  //Gets the instance of Dogtags contract
  var Dogtags = getContract();
  console.log(Dogtags);
  this.dogtags = Dogtags;
  var na = this.nameAsync;
  var ca = this.contentAsync;

  //Wait for web3 to be injected, to be replaced in future with more efficient logic
  Meteor.setTimeout(function() {
    Dogtags.GetDogtagName(FlowRouter.getParam("_id"), function (error, result){
      if(!error)
        na.set(result);
      else
          console.error(error);
    });
    
    Dogtags.GetDogtagContent(FlowRouter.getParam("_id"), function (error, result){
      if(!error)
      {
        ca.set(result);
      }
      else
          console.error(error);
    });

    Dogtags.IsVerified(FlowRouter.getParam("_id"), function(error, result){
      if(!error)
      {
        if(!result)
        {
          // User is not verified, hide the checkmark
          $(".checkmark").hide();
        }
      }
      else
          console.error(error);
    });
  } ,750);
});



