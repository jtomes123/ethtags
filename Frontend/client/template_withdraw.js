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
  