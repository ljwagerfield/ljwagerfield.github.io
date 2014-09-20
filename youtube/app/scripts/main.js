(function(){
    var key = "AIzaSyC-KZfFnoEkCnytCIKCwry0xj24q8vKUYU"
    var baseUrl = "https://www.googleapis.com/youtube/v3/"

    function getCategories(categorySink) {
        var url = baseUrl + "guideCategories?part=snippet&regionCode=GB&key=" + key
        $.getJSON(url, function(data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                var categoryId = data.items[i].id
                var categoryTitle = data.items[i].snippet.title
                categorySink(categoryId, categoryTitle)
            };
        })
    }
    
    function getChannelsInCategory(categoryId, usernameSink) {
        var url = baseUrl + "channels?part=snippet&categoryId=" + categoryId + "&key=" + key
        $.getJSON(url, function(data) {
            for (var i = data.items.length - 1; i >= 0; i--) {
                var channelId = data.items[i].id
                var channelTitle = data.items[i].snippet.title
                usernameSink(channelId, channelTitle)
            };
        })    
    }

    getCategories(function(categoryId, categoryTitle) {
        $("#users").append("<h4>" + categoryTitle + "</h4>")
        $("#users").append("<ul id='"+categoryId+"'></ul>")
        getChannelsInCategory(categoryId, function(channelId, channelTitle) {
            $("#"+categoryId).append("<li><a target='_blank' href='https://www.youtube.com/channel/"+ channelId +"'>" + channelTitle + "</a></li>")    
        })
    })
})();
