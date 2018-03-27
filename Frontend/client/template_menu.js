//--------------------------------------------------------
//Menu
//--------------------------------------------------------
Template.title.events({
    'click .logo' (event, instance) {
      FlowRouter.go('home');
    },
    'click .but_home'(event, instance) {
      FlowRouter.go('main');
    },
    'click .but_about'(event, instance) {
      FlowRouter.go('about');
    },
    'click .but_faq'(event, instance) {
      FlowRouter.go('faq');
    },
  });