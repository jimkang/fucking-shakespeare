var fuckShakesUp = require('../fuckshakesup');
var config = require('../config');
var Twit = require('twit');

var twit = new Twit(config.twitter);

fuckShakesUp.run(
  {
    maxNumberOfLines: 2
  },
  postResult
);

function postResult(error, text) {
  if (error) {
    reportDone(error);
  }
  else {
    twit.post(
      'statuses/update',
      {
        status: text
      },
      reportDone
    );
  }
}

function reportDone(error, data, response) {
  if (error) {
    console.log('Error while trying to post to Twitter:', error);
  }
  else {
    console.log('Twitter post complete:', data.text);
  }
}
