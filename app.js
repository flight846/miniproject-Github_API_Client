console.clear()

//$('#search').click(function(){
//    window.location.reload();
//})

var searchUser = $('#search');

function reload() {
    var user = searchUser.val();
        // get repos
        $.get('https://api.github.com/users/'+user+'/repos')
            .done(function(data){
                data.forEach( function(datum) {
                    $('#repos').append('<li class="list-group-item"><a href="'+datum.html_url+'" target="_blank">'+datum.name+'</li>')
                })
//                console.log(data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                alert('Failed to load resource: the server responded with a status of 404 ('+textStatus+')')
                });
    
        // Get user stats
        $.get('https://api.github.com/users/'+user+'')
            .done(function(data){
            $('.profile-pic').remove();
            $('#avatar').append('<img class="profile-pic" src="'+data.avatar_url+'">');
            $('#repo-count').html(''+data.public_repos+' <br/>Repos');
        })
}

$('#search-users').click(function(){
//    window.location.reload();
    reload();
})