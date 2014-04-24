(function() {
  var crawlAppStore;

  crawlAppStore = (function() {
    function crawlAppStore() {
      var conf;
      conf = require('config');
      this.ACS = require('acs-node');
      this.loginID = conf.acs.user.id;
      this.loginPasswd = conf.acs.user.password;
      this.ACS.init(conf.acs.development);
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
      this._login((function(_this) {
        return function(session_id) {
          return _this.ACS.Objects.create({
            classname: "appStoreData",
            session_id: session_id,
            fields: {
              htmlData: htmlData,
              storeCategory: "iTunes"
            }
          }, function(e) {
            return callback(e);
          });
        };
      })(this));
      result = {
        success: true
      };
      return callback(result);
    };

    crawlAppStore.prototype._login = function(callback) {
      var data;
      data = {
        login: this.loginID,
        password: this.loginPasswd
      };
      return this.ACS.Users.login(data, (function(_this) {
        return function(response) {
          if (response.success) {
            return callback(response.meta.session_id);
          } else {
            return _this.loggerRequest.info("Error to login: " + response.message);
          }
        };
      })(this));
    };

    return crawlAppStore;

  })();

  exports.crawlAppStore = crawlAppStore;

}).call(this);
