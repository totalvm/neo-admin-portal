import checkRole from '/imports/helpers/check-role.js';

Router.configure({
  loadingTemplate: 'loading'
});

// Initial route for letting customers subscribe to a client's page
Router.route('/', {
  name: "home",
  action() {
    this.layout('layout');
    this.render("askQuestion", {to: 'content'});
  }
});

Router.route('/portal/', {
  name: "portal",
  title: "Portal",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction() {
    if (checkRole('user|developer|admin')) {
      Router.go('portal.overview');
    } else {
      Router.go('portal.login');
    }
  },
  action: function (params, queryParams) {
  }
});

Router.route('/portal/login', {
  name: "portal.login",
  title: "Login",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction() {
    if (checkRole('user|developer|admin')) {
      Router.go('portal.overview');
    } else {
      this.next();
    }
  },
  action: function (params, queryParams) {
    this.render("layout");
    this.render('login', {to: 'content'});
  }
});

Router.route('/portal/overview', {
  name: "portal.overview",
  title: "Overview",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action: function (params, queryParams) {
    this.render("portalLayout");
    this.render('overview', {to: 'content'});
  }
});

/**
 * Phrases routes
 */
Router.route('/portal/phrases', {
  name: "portal.phrases",
  title: "Phrases overview",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("listQuestions", {to: 'content'});
  }
});

Router.route('/portal/phrases/edit/:id', {
  name: "portal.phrases.edit",
  title: "Edit phrase",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action(params, queryParams) {
    this.layout('portalLayout');
    this.render("editQuestion", {to: 'content'});
  }
});

Router.route('/portal/phrases/new', {
  name: "portal.phrases.new",
  title: "New phrase",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action(params, queryParams) {
    this.layout('portalLayout');
    this.render("newQuestion", {to: 'content'});
  }
});

/**
 * Slack request invite
 */
Router.route('/portal/requests', {
  name: "portal.requests",
  title: "Invite requests",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("adminRequestsOverview", {to: 'content'});
  }
});

Router.route('/portal/request', {
  name: "portal.request",
  title: "Requests",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("requestOverview", {to: 'content'});
  }
});

Router.route('/portal/request/invite', {
  name: "portal.request.invite",
  title: "Request invite",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("requestInvite", {to: 'content'});
  }
});

/**
 * Account details
 */
Router.route('/portal/account/edit', {
  name: "portal.account.edit",
  title: "Edit account",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    
    this.render("accountEdit", {to: 'content'});
  }
});

Router.route('/portal/account', {
  name: "portal.account",
  title: "Account overview",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("accountOverview", {to: 'content'});
  }
});

Router.route('/portal/account/view/:id', {
  name: "portal.account.view",
  title: "Account view",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("accountView", {to: 'content'});
  }
});

/**
 * Bot
 */

Router.route('/portal/bot', {
  name: "portal.bot",
  title: "Bot overview",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action() {
    this.layout('portalLayout');
    this.render("botOverview", {to: 'content'});
  }
});

/** Support **/
Router.route('/portal/support', {
  name: "support.overview",
  title: "Overview",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action: function (params, queryParams) {
    this.render("portalLayout");
    this.render('supportOverview', {to: 'content'});
  }
});

Router.route('/portal/support/request', {
  name: "support.request",
  title: "Overview",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action: function (params, queryParams) {
    this.render("portalLayout");
    this.render('supportRequest', {to: 'content'});
  }
});

Router.route('/portal/support/ticket/:id', {
  name: "support.ticket.view",
  title: "Overview",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('user|developer|admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action: function (params, queryParams) {
    this.render("portalLayout");
    this.render('supportTicketView', {to: 'content'});
  }
});

Router.route('/portal/support/admin', {
  name: "support.request",
  title: "Overview",
  waitOn: function () {
    return Meteor.subscribe('loggedInUser');
  },
  onBeforeAction: function () {
    if (!checkRole('admin')) {
      Router.go('portal.login');
    } else {
      this.next();
    }
  },
  action: function (params, queryParams) {
    this.render("portalLayout");
    this.render('supportAdmin', {to: 'content'});
  }
});

/**
 * Slack oauth
 */
Router.route('/portal/_slack/oauth',
  {
    name: "slack.oauth",
    action() {
      import('/imports/slack/slack-functions.js').then(slackApi => {
        const access = slackApi.getAccess(this.params.query);
        const identity = slackApi.getUserInfo(access.access_token);
        if (!identity) {
        } else {
          access.identity = identity;
          slackApi.oauth([access]);
        }
      });
    }
}, {where: 'server'});

Router.route('/portal/_slack/login', function() {
  import('/imports/slack/slack-functions.js').then(slackApi => {
    Router.go(slackApi.generateOauthUrl());
  })
});