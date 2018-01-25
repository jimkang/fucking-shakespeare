var test = require('tape');
var fuckShakesUp = require('../fuckshakesup');

test('Integration test', function integration(t) {
  t.plan(3);

  fuckShakesUp.run(
    {
      maxNumberOfLines: 4
    },
    checkResult
  );

  function checkResult(error, text) {
    t.ok(!error, 'No error occurred.');
    t.equal(typeof text, 'string', 'Returns a string.');
    t.ok(text.length > 0, "And it's not an empty string.");
    console.log(text);
  }
});
