import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.main.onCreated(function mainOnCreated() {
  //Check if web3 is installed
  if(typeof web3 === 'undefined')
    BlazeLayout.render('App_Body', {main: 'eth_miss'});

  EthBlocks.init();
  EthAccounts.init();
  this.nameAsync = new ReactiveVar("Retrieving...");
  this.contentAsync = new ReactiveVar("Retrieving...");
  this.address = new ReactiveVar("Address");
  this.link = new ReactiveVar("#");
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
          }
        ],
        "name": "SetDogtagName",
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
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
  ]);

  var Dogtags = DogtagsContract.at('0x564b3d0a2453a93790c9726031b2a848cf7a2e6b');
  console.log(Dogtags);
  this.dogtags = Dogtags;
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
    lnk.set("http://ethtags.herokuapp.com" + "/iframe/" + adr.get());
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
      instance.dogtags.SetDogtag(event.target.name.value, $('textarea').get(0).value, function (error, result){
        if(!error)
            console.log(result)
        else
            console.error(error);
      });
  },
  'change .style'(event, instance) {
    //console.log("Change: " + $("#bgc").val() + " " + $("#textc").val() + " " + $("#showqr").is(":checked"));
    instance.link.set("http://ethtags.herokuapp.com" + "/iframe/" + instance.address.get() + "/" + $("#showqr").is(":checked") + "/" + $("#bgc").val().replace("#", "") + "/" + $("#textc").val().replace("#", ""));
  },
});

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
    $('body').css('background-color', '#' + bgc);
  if(typeof(textc) != 'undefined')
    $('body').css('color', '#' + textc);
});
Template.iframe.onCreated(function iframeOnCreated() {
  //TODO: Change to mainnet when published
  if(typeof web3 === 'undefined')
    web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));

  this.nameAsync = new ReactiveVar("Retrieving...");
  this.contentAsync = new ReactiveVar("Retrieving...");
  this.address = FlowRouter.getParam("_id");

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
        }
      ],
      "name": "SetDogtagName",
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
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
]);

var Dogtags = DogtagsContract.at('0x564b3d0a2453a93790c9726031b2a848cf7a2e6b');
console.log(Dogtags);
this.dogtags = Dogtags;
var na = this.nameAsync;
var ca = this.contentAsync;
Meteor.setTimeout(function() {
  console.log(web3.eth.accounts);
  console.log(typeof(this.address));
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
} ,750);
});

FlowRouter.route('/iframe/:_id', {
  name: 'iframe',
  action() {
    BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id')});
  }
});
FlowRouter.route('/iframe/:_id/:_showqr', {
  name: 'iframe',
  action() {
    BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id'), 
      hideqr: FlowRouter.getParam('_showqr')});
  }
});
FlowRouter.route('/iframe/:_id/:_showqr/:_bgc', {
  name: 'iframe',
  action() {
    BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id'), 
      hideqr: FlowRouter.getParam('_showqr')});
  }
});
FlowRouter.route('/iframe/:_id/:_showqr/:_bgc/:_textc', {
  name: 'iframe',
  action() {
    BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id'), 
      hideqr: FlowRouter.getParam('_showqr')});
  }
});
FlowRouter.route('/', {
  name: 'main',
  action() {
    BlazeLayout.render('App_Body', {main: 'main'});
  }
});
