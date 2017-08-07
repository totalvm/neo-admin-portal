Accounts.onCreateUser(function (options, user) {

  const groups = options.profile.groups;

  if(groups && groups.length > 0) {
    groups.forEach(group => {
      Invites.insert({
        "user" : user._id,
        "reason" : "Already invited",
        "group" : group,
        "dateRequested" : new Date(),
        "processed" : true,
        "approved" : true
      });
    });
  }

  if (options.profile)
    user.profile = options.profile;

  return user;
});