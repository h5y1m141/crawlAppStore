(function() {
  var crawlAppStore, modulePath, path;

  path = require("path");

  modulePath = path.resolve(__dirname, "../lib/crawlAppStore.js");

  crawlAppStore = require(modulePath).crawlAppStore;

  describe("Crawl", function() {
    beforeEach(function() {
      return this.crawller = new crawlAppStore();
    });
    it('should be init Class', function() {
      return expect(typeof this.crawller).toEqual("object");
    });
    it('should be return 1 ', function() {
      return expect(this.crawller.showData()).toEqual(1);
    });
    return it('should be fetch AppStore Data from iTunes', function(done) {
      var targetURL;
      targetURL = "https://itunes.apple.com/us/app/craftbeerfan/id687522439?mt=8";
      return this.crawller.fetch(targetURL, function(result) {
        console.log(result);
        expect(result.title).toEqual("CraftBeerFan");
        return done();
      });
    }, 8000);
  });

}).call(this);
