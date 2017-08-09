TemplateController('adminRequestsOverview', {
  state: {
    filter: 'pending',
    invites: []
  },
  private: {
    getStateFilter() {
      switch(this.state.filter) {
        case 'rejected':
          return {processed: true, approved: false};
        case 'successful':
          return {processed: true, approved: true};
        default:
          return {processed: false, approved: false};
      }
    }
  },
  onCreated() {
    this.autorun(() => {
      Meteor.subscribe('allInvites');
      Meteor.subscribe('users');
    });
  },
  helpers: {
    invites() {
      const filteredInvites = [];
      const invites = Invites.find(this.getStateFilter()).fetch();
      if(invites && invites.length > 0) {
        invites.forEach(invite => {
          const userId = invite.user;
          const user = Meteor.users.find({_id: userId}).fetch();
          if (user && user.length > 0) {
            invite.user = user[0];
            filteredInvites.push(invite);
          }
        });
      }
      
      return filteredInvites;
    }
  },
  events: {
    'click button.pending'() {
      console.log('pending')
        this.state.filter = 'pending';
    },
    'click button.rejected'() {
      this.state.filter = 'rejected';
    },
    'click button.successful'() {
      this.state.filter = 'successful';
    },
    'click .profile'(e) {
      const userId = $(e.currentTarget).data('user');
      Router.go('portal.account.view', {id: userId});
    },
    'click .approve'(e) {
      const userId = $(e.currentTarget).data('user');
      const groupId = $(e.currentTarget).data('group');
      const inviteId = $(e.currentTarget).data('id');
  
      Meteor.call('inviteUserToGroup', groupId, userId, inviteId, function(err, res)  {
        console.log(err, res);
        if(err || res.ok === false) {
          FlashMessages.sendError('<p class="text-center">There was an error inviting the user <br> ' + res.error + '</p>');
        } else {
          FlashMessages.sendSuccess('<p class="text-center">The user has been invited to the channel</p>');
        }
      });
    },
    'click .reject'(e) {
      const inviteId = $(e.currentTarget).data('id');
  
      Meteor.call('rejectUserInvite', inviteId, function(err, res)  {
        if(err) {
          FlashMessages.sendError('<p class="text-center">There was an error rejecting the user</p>');
        } else {
          FlashMessages.sendSuccess('<p class="text-center">The user has been rejected</p>');
        }
      });
    }
  }
});