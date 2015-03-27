var createFuckShitUp = require('fuck-shit-up').create;
var _ = require('lodash');
var lineChomper = require('line-chomper');
var probable = require('probable');
var jsonfile = require('jsonfile');
var callBackOnNextTick = require('conform-async').callBackOnNextTick;
var async = require('async');
var queue = require('queue-async');
var probable = require('probable');

var fuckShitUp = createFuckShitUp({
  probable: probable
});

var maxNumberOfLines = 4;
var linesInShakespeareFile = 122645;

function sampleLines(done) {
  var lineOffsets = jsonfile.readFileSync(
    __dirname + '/data/shakeslineoffsets.json'
  );

  var numberOfLines = probable.rollDie(maxNumberOfLines);
  var startingLine = probable.roll(linesInShakespeareFile - numberOfLines);

  lineChomper.chomp(
    __dirname + '/data/shakespeare-pg100.txt',
    {
      lineOffsets: lineOffsets,
      fromLine: startingLine,
      lineCount: numberOfLines
    },
    function readDone(error, lines) {
      if (error) {
        done(error);
      }
      else if (!lines || !Array.isArray(lines) || lines.length < 1) {
        done(new Error('Could not get valid line for offset ' + 
          startingLine + ' numberOfLines: ' + numberOfLines
        ));
      }
      else {
        done(error, lines);
      }
    }
  );  
}

function findLines(done) {
  sampleLines(setUpCheckLines);

  function setUpCheckLines(error, lines) {
    checkLines(error, lines, done);
  }
}

function checkLines(error, lines, done) {
  if (error) {
    done(error);
  }
  else if (lines.length < 1 || lines.every(lineIsNoGood)) {
    console.log('Lines were bad. Trying again.', lines);
    callBackOnNextTick(findLines, done);
  }
  else {
    done(null, lines);
  }
}

function lineIsNoGood(line) {
  return !line || line.length < 1 || !(line.match(/[A-Za-z]/));
}

function cleanLines(lines, done) {
  done(null, lines.map(cleanLine));
}

function cleanLine(line) {
  return line.replace('\\\'', '\'');
}

function fuckUpEachLine(lines, done) {
  var q = queue();

  lines.forEach(queuefuckShitUp);

  function queuefuckShitUp(line) {
    q.defer(fuckShitUp, line);
  }

  q.awaitAll(done);
}

function joinLines(lines, done) {
  done(null, lines.join('\n'));
}

function postModifiedText(text) {
  console.log(text);
}

function run(opts, done) {
  if (opts) {
    if (opts.maxNumberOfLines) {
      maxNumberOfLines = opts.maxNumberOfLines;
    }
  }

  async.waterfall(
    [
      findLines,
      cleanLines,
      fuckUpEachLine,
      joinLines      
    ],
    done
  );
}

module.exports = {
  run: run
};
