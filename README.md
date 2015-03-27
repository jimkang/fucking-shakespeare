fucking-shakespeare
===================

Shakespeare enhancement bot.

Installation
------------

Clone this repo.

    npm install

Then, create a config.js file in the project root that contains your Twitter API keys and your Tumblr API keys. Example:

    module.exports = {
      twitter: {
        consumer_key: 'asdfkljqwerjasdfalpsdfjas',
        consumer_secret: 'asdfasdjfbkjqwhbefubvskjhfbgasdjfhgaksjdhfgaksdxvc',
        access_token: '9999999999-zxcvkljhpoiuqwerkjhmnb,mnzxcvasdklfhwer',
        access_token_secret: 'opoijkljsadfbzxcnvkmokwertlknfgmoskdfgossodrh'
      },
      tumblr: {
        consumerKey: 'asdfkljqwerjasdfalpsdfjas',
        consumerSecret: 'asdfasdjfbkjqwhbefubvskjhfbgasdjfhgaksjdhfgaksdxvc',
        accessToken: 'zxcvkljhpoiuqwerkjhmnb',
        accessSecret: 'opoijkljsadfbzxcnvkmokwertlknfgmoskdfgossodrh',
        blog: 'some-tumblr.tumblr.com'
      }
    };

Usage
-----

    var someFactory = require('fucking-shakespeare');
    var thing = someFactory();
    thing.use();

Success!

Tests
-----

Run tests with `make test`.

License
-------

MIT.
