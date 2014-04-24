class crawlAppStore
  constructor:() ->
    
    return
    
  showData:() ->
    return 1
    
  fetch:(targetURL,callback) ->
    request    = require('request')
    cheerio = require('cheerio')
    
    options =
      url:targetURL
      headers:{
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11'}
    request options,(error, response, body) ->
      if not error and response.statusCode is 200
        $ = cheerio.load(body)
        # console.log "title is #{$("title").html()}"
        result =
          title:$("title").html()
          
        callback result

  postToACS:(htmlData,callback) ->
    result =
      success:true
      
    return callback result        


    
exports.crawlAppStore = crawlAppStore    

