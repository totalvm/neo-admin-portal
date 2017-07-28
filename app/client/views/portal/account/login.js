TemplateController('login', {
  events: {
    'click #login'(event) {
      Meteor.loginWithSlack({requestPermissions: ['identity.email', 'identity.basic', 'identity.team', 'identity.avatar']}, (res, err) => {
        Router.go('portal');
      })
    }
  }
});