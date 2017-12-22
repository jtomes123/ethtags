import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  EthBlocks.init();
  EthAccounts.init();
  this.nameAsync = new ReactiveVar("Retrieving...");
  this.contentAsync = new ReactiveVar("Retrieving...");
  this.address = new ReactiveVar("Address");
  var CoursetroContract = web3.eth.contract([
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

  var Coursetro = CoursetroContract.at('0x564b3d0a2453a93790c9726031b2a848cf7a2e6b');
  console.log(Coursetro);
  this.dogtags = Coursetro;
  var na = this.nameAsync;
  var ca = this.contentAsync;
  var adr = this.address;
  Meteor.setTimeout(function() {
    console.log(web3.eth.accounts);
    adr.set(web3.eth.accounts[0]);
    Coursetro.GetDogtagName(web3.eth.accounts[0], function (error, result){
      if(!error)
        na.set(result);
      else
          console.error(error);
    });
    
    Coursetro.GetDogtagContent(web3.eth.accounts[0], function (error, result){
      if(!error)
      {
        ca.set(result);
      }
      else
          console.error(error);
    });
  } ,2500);
});

Template.hello.helpers({
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

Template.hello.events({
  'submit .new-post'(event, instance) {
    event.preventDefault();
    // increment the counter when button is clicked
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

Template.iframe.onCreated(function helloOnCreated() {
  this.nameAsync = new ReactiveVar("Retrieving...");
  this.contentAsync = new ReactiveVar("Retrieving...");
  this.address = FlowRouter.getParam("_id");
  var CoursetroContract = web3.eth.contract([
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

var Coursetro = CoursetroContract.at('0x564b3d0a2453a93790c9726031b2a848cf7a2e6b');
console.log(Coursetro);
this.dogtags = Coursetro;
var na = this.nameAsync;
var ca = this.contentAsync;
Meteor.setTimeout(function() {
  console.log(web3.eth.accounts);
  console.log(typeof(this.address));
  Coursetro.GetDogtagName(FlowRouter.getParam("_id"), function (error, result){
    if(!error)
      na.set(result);
    else
        console.error(error);
  });
  
  Coursetro.GetDogtagContent(FlowRouter.getParam("_id"), function (error, result){
    if(!error)
    {
      ca.set(result);
    }
    else
        console.error(error);
  });
} ,2500);
});

async function getPost(id, instance)
{
  /*var title =null;
  var content=null;
  var channel=null;
  instance.subspaceContract.getPostTitle(0, function(error, result){
    if(!error)
        title = result;
    else
        console.error(error);
  });
  instance.subspaceContract.getPostBody(0, function(error, result){
    if(!error)
        content = result;
    else
        console.error(error);
  });
  instance.subspaceContract.getPostChannel(0, function(error, result){
    if(!error)
    {
        channel = result;
    }
    else
        console.error(error);
  });*/

  var title = await instance.subspaceContract.getPostTitle(0);

  return title;
}

FlowRouter.route('/iframe/:_id', {
  name: 'iframe',
  action() {
    BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id')});
  }
});
FlowRouter.route('/', {
  name: 'main',
  action() {
    BlazeLayout.render('App_Body', {main: 'hello'});
  }
});
