if (Meteor.isClient) {
  Template.basic.events({
    'click .followme' : function () {
      Meteor.call('followMe');
    }
  });
}

if (Meteor.isServer) {
  var twitter = new Twitter();
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    followMe: function () {
      twitter.follow("Sewdn");
    }
  });
}
