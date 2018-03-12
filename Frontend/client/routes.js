FlowRouter.route('/iframe/:_id', {
    name: 'iframe',
    action() {
      BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id')});
    }
  });
  FlowRouter.route('/iframe/:_id/:_showqr', {
    name: 'iframe',
    action() {
      BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id'), 
        hideqr: FlowRouter.getParam('_showqr')});
    }
  });
  FlowRouter.route('/iframe/:_id/:_showqr/:_bgc', {
    name: 'iframe',
    action() {
      BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id'), 
        hideqr: FlowRouter.getParam('_showqr')});
    }
  });
  FlowRouter.route('/iframe/:_id/:_showqr/:_bgc/:_textc', {
    name: 'iframe',
    action() {
      BlazeLayout.render('App_Body', {main: 'iframe', address: FlowRouter.getParam('_id'), 
        hideqr: FlowRouter.getParam('_showqr')});
    }
  });
  FlowRouter.route('/', {
    name: 'main',
    action() {
      BlazeLayout.render('App_Body', {main: 'main'});
    }
  });
  FlowRouter.route('/about', {
    name: 'about',
    action() {
      BlazeLayout.render('App_Body', {main: 'about'});
    }
  });
  FlowRouter.route('/faq', {
    name: 'faq',
    action() {
      BlazeLayout.render('App_Body', {main: 'faq'});
    }
  });
  FlowRouter.route('/ver', {
    name: 'verification',
    action() {
      BlazeLayout.render('App_Body', {main: 'verification'});
    }
  });
  FlowRouter.route('/vercon/:_id', {
    name: 'verification-confirm',
    action() {
      BlazeLayout.render('App_Body', {main: 'verificationConfirm', id: FlowRouter.getParam("_id")});
    }
  });
  FlowRouter.route('/withdraw', {
    name: 'withdraw',
    action() {
      BlazeLayout.render('App_Body', {main: 'withdraw'});
    }
  });