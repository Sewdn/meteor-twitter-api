Meteor Twitter API Package
==========================

meteor-twitter-api is a simple package to wrap the Twitter API using Meteor's Twitter Service OAuth1Binding class. 

Latest Version: **0.1.0**

Previous Version: 0.1.0

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

```javascript
if (Meteor.isServer) {
    var twitter = new Twitter();
}

...

Meteor.methods({
  followMe: function () {
    twitter.follow("mytwitterHandle");
  }
});

...


```