export default (teamId) => {
  
  if(Meteor.user() && Meteor.user().services.slack.accessToken) {
    return Meteor.user() && Meteor.user().services.slack.accessToken;
  }
  let team;
  if(teamId === undefined) {
    team = Teams.findOne({
      id: Meteor.user().profile.identity.team.id
    });
  } else {
    team = Teams.findOne({
      id: teamId
    });
  }
  return team.bot.app_token;
}