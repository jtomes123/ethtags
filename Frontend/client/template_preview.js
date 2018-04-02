//--------------------------------------------------------
//Preview
//--------------------------------------------------------
Template.preview.onCreated(function verconOnCreated() {
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
        {
            console.error(error);
            FlowRouter.go("/error/101");
        }
      });
      
      Dogtags.GetDogtagContent(FlowRouter.getParam("_id"), function (error, result){
        if(!error)
        {
          ca.set(result);
        }
        else
        {
            console.error(error);
            FlowRouter.go("/error/101");
        }
      });
  
      Dogtags.IsVerified(FlowRouter.getParam("_id"), function(error, result){
        if(!error)
        {
          if(!result)
          {
            // User is not verified, hide the checkmark
            $("#verified").hide();
          }
        }
        else
        {
            console.error(error);
            FlowRouter.go("/error/101");
        }
      });
    } ,750);
  });
  Template.preview.helpers({
    info(){
      return Template.instance().contentAsync.get();
    },
    name(){
  
      return Template.instance().nameAsync.get();
    },
    address(){
      return FlowRouter.getParam("_id");
    },
  });
  Template.preview.events({
    'click #back'(event, instance) {
      FlowRouter.go("/");
  },
  });