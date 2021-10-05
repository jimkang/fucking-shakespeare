/* global process */

var fuckShakesUp = require('./fuckshakesup');
var config = require('./config');
var postIt = require('@jimkang/post-it');
var randomId = require('idmaker').randomId;

var dry = false;

if (process.argv.length > 2) {
  dry = (process.argv[2] === '--dry');
}

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
    if (dry) {
      console.log(text);
      return;
    }
    postToTargets(text, reportDone);
  }
}

function postToTargets(text, done) {
  postIt(
    {
      id: 'quote-' + randomId(8),
      text,
      targets: [
        {
          type: 'noteTaker',
          config: config.noteTaker
        }
      ]
    },
    done
  );
}

function reportDone(error) {
  if (error) {
    console.log('Error while trying to post:', error);
  } else {
    console.log('Post complete.');
  }
}
