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