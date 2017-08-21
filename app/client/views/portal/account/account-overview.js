TemplateController('accountOverview', {
  helpers: {
    addresses() {
      return Meteor.user().profile.walletAddresses;
    }
  }
});