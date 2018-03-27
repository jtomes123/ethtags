//--------------------------------------------------------
//Home
//--------------------------------------------------------
Template.home.events({
    'click #search'(event, instance) {
      FlowRouter.go("/preview/" + $("#searchAddress").val());
  },
  });