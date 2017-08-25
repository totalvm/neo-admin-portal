import {ticketSchema} from "/imports/schema/tickets";

Tickets = new Meteor.Collection('tickets');
Tickets.attachSchema(ticketSchema);