class crawlAppStore
  constructor:() ->
    conf = require('config')
    @ACS = require('acs-node')
    @loginID = conf.acs.user.id
    @loginPasswd = conf.acs.user.password
    @ACS.init(conf.acs.development)        
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
    @_login (session_id) =>
      @ACS.Objects.create
        classname:"appStoreData"
        session_id:session_id
        fields:
          htmlData:htmlData
          storeCategory:"iTunes" # iTunes or Google Play
      , (e) ->
        callback e

    result =
      success:true
      
    return callback result        

  _login:(callback) ->
    data =
      login: @loginID
      password: @loginPasswd
    
    @ACS.Users.login data, (response) =>
      if response.success
        # @loggerRequest.info(response.meta.session_id)
        callback(response.meta.session_id)
      else
        @loggerRequest.info "Error to login: " + response.message

exports.crawlAppStore = crawlAppStore    
