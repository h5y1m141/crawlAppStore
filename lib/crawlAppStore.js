(function() {
  var crawlAppStore;

  crawlAppStore = (function() {
    function crawlAppStore() {
      return;
    }

    crawlAppStore.prototype.showData = function() {
      return 1;
    };

    crawlAppStore.prototype.fetch = function(targetURL, callback) {
      var cheerio, options, request;
      request = require('request');
      cheerio = require('cheerio');
      options = {
        url: targetURL,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11'
        }
      };
      return request(options, function(error, response, body) {
        var $, result;
        if (!error && response.statusCode === 200) {
          $ = cheerio.load(body);
          result = {
            title: $("title").html()
          };
          return callback(result);
        }
      });
    };

    crawlAppStore.prototype.postToACS = function(htmlData, callback) {
      var result;
      result = {
        success: true
      };
      return callback(result);
    };

    return crawlAppStore;

  })();

  exports.crawlAppStore = crawlAppStore;

}).call(this);
