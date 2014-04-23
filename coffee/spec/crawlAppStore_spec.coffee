path = require "path"
modulePath = path.resolve(__dirname, "../lib/crawlAppStore.js")
crawlAppStore = require(modulePath).crawlAppStore

describe "Crawl", () ->
  beforeEach ->
    @crawller = new crawlAppStore()

  it 'should be init Class', () ->
    expect(typeof @crawller).toEqual "object"  

  it 'should be return 1 ', () ->
    expect(@crawller.showData()).toEqual 1

  it 'should be fetch AppStore Data from iTunes', (done) ->
    targetURL = "https://itunes.apple.com/us/app/craftbeerfan/id687522439?mt=8"
    @crawller.fetch targetURL,(result) ->
      console.log result
      expect(result.title).toEqual "CraftBeerFan on the App Store on iTunes"
      done()
      
  , 8000    
  
