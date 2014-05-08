Meteor Twitter API Package
==========================

meteor-twitter-api is a simple package to wrap the Twitter API using Meteor's Twitter Service OAuth1Binding class.

Latest Version: **0.1.2**

## Install

To install in a new project:
```bash
> mrt add twitter-api
```

To update an existing project:
```bash
> mrt update twitter-api
```

## Run the Example
```bash
> git clone https://github.com/sewdn/meteor-twitter-api.git twitter-api
> cd twitter-api/examples/basic
> mrt
```

## Run Tests
no tests for now

## Get Started

First, define the Twitter API on the *server* of your Meteor application.
```javascript
if (Meteor.isServer) {
    var twitter = new TwitterApi();
}
```

After that, define some `Meteor.methods` that you can `call` from the client side of your application.

Server side method:
```
Meteor.methods({
    searchTwitter: function(term) {
        return twitter.search(term);
    }
});
```

Client side call:

```
'click #search': function() {
    var term = "test";
    Meteor.call('searchTwitter', term, function(err, result){
        if(!err){
            if (result.statusCode === 200) // This checks if we got a good response
                console.log(result.data); // This is the actual data
        }
    });
}
```

## Using the Data

The package basically [Check out the Twitter documentation here.](https://dev.twitter.com/docs/api/1.1)

The package's methods do not use a callback, and instead just return the `content`, `headers`, `statusCode` and `data` in JSON from Twitter. You can use the `statusCode` to react to specific responses from Twitter. [Here are the Twitter response codes.](https://dev.twitter.com/docs/error-codes-responses)
```