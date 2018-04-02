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
            $(".checkmark").hide();
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
  