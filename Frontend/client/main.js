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
  } ,2500);
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
    return "ethtags.herokuapp.com/iframe/"+Template.instance().address.get();
  },
  iframe() {
    return "<iframe src=\"ethtags.herokuapp.com/iframe/"+Template.instance().address.get()+"\"></iframe>";
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
  $('#code').qrcode({
    size: 150,
    text: adr,
    radius: 0.5,
    quiet: 1,
    exLevel: 'H',
    mode: 2,
    label: 'Address',
    fontname: 'sans',
    fontcolor: '#000',
  });
});
Template.iframe.onCreated(function iframeOnCreated() {
  if(typeof web3 === 'undefined')
    BlazeLayout.render('App_Body', {main: 'eth_miss'});

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
} ,1500);
});

FlowRouter.route('/iframe/:_id', {
  name: 'iframe',
  action() {
    BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id')});
  }
});
FlowRouter.route('/', {
  name: 'main',
  action() {
    BlazeLayout.render('App_Body', {main: 'main'});
  }
});
