Package.describe({
  summary: "Twitter API wrapper using OAuth1Binding of Meteor Twitter Service"
});

Package.on_use(function (api, where) {
  api.use([
    'accounts-twitter'
  ], 'server');

  api.add_files(['lib/twitter.js'], 'server');
});

Package.on_test(function (api) {
});