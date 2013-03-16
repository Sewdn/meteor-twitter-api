Twitter = function(options) {
  this._url = "https://api.twitter.com";
  this._version = "1.1";
  if (options) _.extend(this, options);
};

Twitter.prototype._getUrl = function(url){
  return [this._url, this._version, url].join('/');
};

Twitter.prototype.get = function(url,params){
  return this.call('GET',url,params);
};

Twitter.prototype.post = function(url, params){
  return this.call('POST',url,params);
};

Twitter.prototype.call = function(method, url, params){
  //this.unblock();

  oauthBinding = this.getOauthBindingForCurrentUser();

  result = oauthBinding.call(method,
    this._getUrl(url),
    params
  );

  return result;
};

Twitter.prototype.getOauthBinding = function() {
  var config = Accounts.loginServiceConfiguration.findOne({service: 'twitter'});
  var urls = Accounts.twitter._urls;
  return new OAuth1Binding(config.consumerKey, config.secret, urls);
};

Twitter.prototype.getOauthBindingForCurrentUser = function(){
  var oauthBinding = this.getOauthBinding();

  var user = Meteor.user();
  oauthBinding.accessToken = user.services.twitter.accessToken;
  oauthBinding.accessTokenSecret = user.services.twitter.accessTokenSecret;

  return oauthBinding;
};

Twitter.prototype.publicTimeline = function() {
  return this.get('statuses/sample.json');
};

Twitter.prototype.userTimeline = function() {
  return this.get('statuses/user_timeline.json');
};

Twitter.prototype.postTweet = function(text){
  return this.post('statuses/update.json', {status: text});
};

Twitter.prototype.follow = function(screenName){
  return this.post('friendships/create.json',{screen_name: screenName, follow: true});
};

Twitter.prototype.getLists = function(user) {
  if (user) {
    return this.get("lists/list.json", {
      screen_name: user
    });
  } else {
    return this.get("lists/list.json");
  }
};

Twitter.prototype.getListMembers = function(listId, cursor) {
  if (cursor === null) {
    cursor = "-1";
  }
  return this.get("lists/members.json", {
    list_id: listId,
    cursor: cursor
  });
};

Twitter.prototype.usersSearch = function(query, page, count, includeEntities) {
  if (page === null) {
    page = 0;
  }
  if (count === null) {
    count = 10;
  }
  if (includeEntities === null) {
    includeEntities = true;
  }
  return this.get("users/search.json", {
    q: query,
    page: page,
    count: count,
    include_entities: includeEntities
  });
};
