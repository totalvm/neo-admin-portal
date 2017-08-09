import checkRole from '/imports/helpers/check-role.js';

Meteor.publish('userProfile', function(userId) {
  const user = Meteor.users.find({
    "profile.identity.user.id": userId
  }, {
    fields:{
      "profile.identity": 0,
      "profile.name": 0,
      "profile.walletAddress": 0
    }
  });
  
  return user;
});

Meteor.publish("loggedInUser", function () {
  return Meteor.users.find({_id: this.userId});
});

Meteor.publish('users', function() {
  return (checkRole('admin')) ? Meteor.users.find({}) : null;
});