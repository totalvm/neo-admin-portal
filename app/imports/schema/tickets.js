const reply = new SimpleSchema({
  userId: {
    label: "User ID",
    type: String
  },
  dateAnswered: {
    label: "Date",
    type: Date
  },
  content: {
    label: "Content",
    type: String
  }
});

export default new SimpleSchema({
  userId: {
    label: "User ID",
    type: String,
  },
  title: {
    label: "Title",
    type: String
  },
  type: {
    label: "Type",
    allowedValues: ['bug', 'request', 'question', 'help'],
    type: String
  },
  priority: {
    label: "Priority",
    allowedValues: ['minor', 'normal', 'high', 'critical'],
    type: String,
    defaultValue: 'normal'
  },
  solved: {
    label: "Solved",
    type: Boolean,
    defaultValue: false
  },
  closed: {
    label: "Closed",
    type: Boolean,
    defaultValue: false
  },
  dateOpened: {
    label: "Date opened",
    type: Date
  },
  dateClosed: {
    label: "Date closed",
    type: Date,
    optional: true
  },
  replies: {
    label: "Replies",
    type: [reply],
  }
});