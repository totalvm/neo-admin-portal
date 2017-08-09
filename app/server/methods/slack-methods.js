import slackApiKey from '/imports/helpers/slack-api-key';

Meteor.methods({
  getGroupsList() {
    const groupId = Meteor.user().profile.identity.team.id;
    const apiKey = slackApiKey(groupId);
    console.log(apiKey);
    const groups = SlackAPI.groups.list(apiKey);
    console.log(groups);
    const filteredGroups = [];
    groups.groups.forEach((group) => {
      if(group.name.indexOf('__') === -1) {
        filteredGroups.push(group);
      }
    });
    return filteredGroups;
  }
});
