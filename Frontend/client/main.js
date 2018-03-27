import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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

Template.faqitem.events({
  'click'(event, instance) {
      event.preventDefault();
      var x = instance.$(".content");
      x.toggle();
  },
});
Template.faqitem.helpers({
  title() {
    return this.title;
  },
  content() {
    return this.content;
  },
});