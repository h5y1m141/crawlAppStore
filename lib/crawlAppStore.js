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
      var result;
      result = {
        title: "CraftBeerFan"
      };
      return callback(result);
    };

    return crawlAppStore;

  })();

  exports.crawlAppStore = crawlAppStore;

}).call(this);
