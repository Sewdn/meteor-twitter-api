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
  console.log(url + " " + params);
  return this.call('POST',url,params);
};

Twitter.prototype.call = function(method, url, params){
  //this.unblock();

  oauthBinding = this.getOauthBindingForCurrentUser();

console.log(oauthBinding);
  result = oauthBinding.call(method,
    this._getUrl(url),
    params
  );

  return result;
};

Twitter.prototype.getOauthBinding = function() {
  var config = Accounts.loginServiceConfiguration.findOne({service: 'twitter'});
 // var urls = Accounts.twitter._urls;
var urls = {
  requestToken: "https://api.twitter.com/oauth/request_token",
  authorize: "https://api.twitter.com/oauth/authorize",
  accessToken: "https://api.twitter.com/oauth/access_token",
  authenticate: "https://api.twitter.com/oauth/authenticate"
};

  return new OAuth1Binding(config, urls);
};

Twitter.prototype.getOauthBindingForCurrentUser = function(){
  var oauthBinding = this.getOauthBinding();

  var user = Meteor.user();
  oauthBinding.accessToken = user.services.twitter.accessToken;
  oauthBinding.accessTokenSecret = user.services.twitter.accessTokenSecret;

  console.log('oauthBinding is' + oauthBinding);
  return oauthBinding;
};

Twitter.prototype.publicTimeline = function() {
  return this.get('statuses/public_timeline.json');
};
Twitter.prototype.get_credentials = function(credentials) {  
	
	
 var oauthBinding = this.getOauthBinding();
      oauthBinding.accessToken=credentials.oauth_token;
       oauthBinding.accessTokenSecret = credentials.oauth_secret; 
 url = 'account/verify_credentials.json';

result = oauthBinding.call('GET',
    this._getUrl(url),
    {include_entities:true}
  );

var servicedata = {
    id: result.data.id_str,
    screenName: result.data.screen_name,
    accessToken: credentials.oauth_token,
    accessTokenSecret: credentials.oauth_secret,
    profile_image_url : result.data.profile_image_url,
    profile_image_url_https: result.data.profile_image_url_https,
    lang:result.data.lang
  };                  

var twitter_data = {  
	serviceData: servicedata,
    	 options: {
	      profile: {
	        name: result.data.name
	      }
	    }
	
};                  
                            
 return Accounts.updateOrCreateUserFromExternalService('twitter', twitter_data.serviceData, twitter_data.options);




/*
if(result)
return result.data.id_str;
//return JSON.stringify(result);
else
return 'Error';
  */     
};
Twitter.prototype.postTweet = function(text){
  return this.post('statuses/update.json', {status: text});
};
Twitter.prototype.postReply = function(text,status_id){

   tweet = { status: text, in_reply_to_status_id : status_id };
   
   console.log(tweet);
  return this.post('statuses/update.json', tweet);
};

Twitter.prototype.retweet = function(status_id){

  return this.post('statuses/retweet/'+status_id+'.json');
}

Twitter.prototype.favorite = function(status_id){

  return this.post('favorites/create.json',{id:status_id});
}

Twitter.prototype.follow = function(screenName){
  return this.post('friendships/create.json',{screen_name: screenName, follow: true});
};