var createFuckShitUp = require('fuck-shit-up').create;
var async = require('async');
var queue = require('queue-async');
var probable = require('probable');
var shakesnippet = require('shakesnippet');

var fuckShitUp = createFuckShitUp({
  probable: probable,
  useAlternativeModifiers: probable.roll(3) > 0 // 2/3 chance
});

var maxNumberOfLines = 4;
// var linesInShakespeareFile = 122645;

function run(opts, done) {
  if (opts) {
    if (opts.maxNumberOfLines) {
      maxNumberOfLines = opts.maxNumberOfLines;
    }
  }

  async.waterfall([findLines, fuckUpEachLine, joinLines], done);
}

// function sampleLines(done) {
//   var lineOffsets = jsonfile.readFileSync(
//     __dirname + '/data/shakeslineoffsets.json'
//   );

//   var numberOfLines = probable.rollDie(maxNumberOfLines);
//   var startingLine = probable.roll(linesInShakespeareFile - numberOfLines);

//   lineChomper.chomp(
//     __dirname + '/data/shakespeare-pg100.txt',
//     {
//       lineOffsets: lineOffsets,
//       fromLine: startingLine,
//       lineCount: numberOfLines
//     },
//     function readDone(error, lines) {
//       if (error) {
//         done(error);
//       }
//       else if (!lines || !Array.isArray(lines) || lines.length < 1) {
//         done(new Error('Could not get valid line for offset ' +
//           startingLine + ' numberOfLines: ' + numberOfLines
//         ));
//       }
//       else {
//         done(error, lines);
//       }
//     }
//   );
// }

function findLines(done) {
  shakesnippet(
    {
      numberOfLines: probable.roll(2) === 0 ? maxNumberOfLines : 1
    },
    done
  );
}

function fuckUpEachLine(snippet, done) {
  var lines = snippet.split('\n');
  var q = queue();

  lines.forEach(queuefuckShitUp);

  function queuefuckShitUp(line) {
    q.defer(fuckShitUp, line);
  }

  q.awaitAll(done);
}

function joinLines(lines, done) {
  var joined = lines.join('\n');
  if (joined.indexOf(' ') === -1) {
    done(new Error('Single word result: ' + joined));
  } else {
    done(null, joined);
  }
}

module.exports = {
  run: run
};
