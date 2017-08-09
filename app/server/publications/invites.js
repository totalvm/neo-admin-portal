import checkRole from '/imports/helpers/check-role.js';

Meteor.publish('invites', function() {
  return Invites.find({"user": this.userId});
});

Meteor.publish('allInvites', function() {
  if (checkRole('admin')) {
    return Invites.find({});
  }
  return null;
});