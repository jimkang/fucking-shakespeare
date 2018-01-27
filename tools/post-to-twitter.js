var fuckShakesUp = require('../fuckshakesup');
var config = require('../config');
var Twit = require('twit');

var StaticWebArchiveOnGit = require('static-web-archive-on-git');
var queue = require('d3-queue').queue;
var randomId = require('idmaker').randomId;

var staticWebStream = StaticWebArchiveOnGit({
  config: config.github,
  title: config.archiveName,
  footerScript: `<script type="text/javascript">
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-49491163-1', 'jimkang.com');
  ga('send', 'pageview');
</script>`,
  maxEntriesPerPage: 50
});

var twit = new Twit(config.twitter);

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
    postToTargets(text, reportDone);
  }
}

function postToTargets(text, done) {
  // if (dryRun) {
  //   console.log('Would have tweeted:', text);
  // } else {
  var q = queue();
  q.defer(postTweet, text);
  q.defer(postToArchive, text);
  q.await(done);
  // }
}

function postTweet(text, done) {
  var body = {
    status: text
  };
  twit.post('statuses/update', body, done);
}

function postToArchive(text, done) {
  var id = 'quote-' + randomId(8);
  staticWebStream.write({
    id,
    date: new Date().toISOString(),
    caption: text
  });
  staticWebStream.end(done);
}

function reportDone(error, data) {
  if (error) {
    console.log('Error while trying to post to Twitter:', error);
  } else {
    console.log('Twitter post complete:', data.text);
  }
}
