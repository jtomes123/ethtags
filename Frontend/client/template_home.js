//--------------------------------------------------------
//Home
//--------------------------------------------------------
Template.home.events({
    'click #search'(event, instance) {
      if(checkAddress($("#searchAddress").val()))
      {
        FlowRouter.go("/preview/" + $("#searchAddress").val());
      }
      else
      {
        FlowRouter.go("/error/100");
      }
  },
  });