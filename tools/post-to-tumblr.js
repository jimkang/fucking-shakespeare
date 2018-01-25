var fuckShakesUp = require('../fuckshakesup');
var config = require('../config');
var Tumblrwks = require('tumblrwks');

var tumblr = new Tumblrwks(config.tumblr, config.tumblr.blog);

fuckShakesUp.run(
  {
    maxNumberOfLines: 4
  },
  postResult
);

function postResult(error, text) {
  if (error) {
    reportDone(error);
  } else {
    // text = text.replace('\n', '<br /><br />\n');
    text = boldCharacterAttributions(text);
    var postOpts = {
      type: 'text',
      body: text
    };
    tumblr.post('/post', postOpts, reportDone);
  }
}

function boldCharacterAttributions(text) {
  return text.replace(/([A-Z][A-Z ]+\.)/g, '<strong>$1</strong>');
}

function reportDone(error, json) {
  if (error) {
    console.log('Error while trying to post to Tumblr:', error);
  } else {
    console.log('Tumblr post complete:', JSON.stringify(json, null, '  '));
  }
}
