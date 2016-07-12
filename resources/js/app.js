console.clear()

//$('#search').click(function(){
//    window.location.reload();
//})

var searchUser = $('#search');

function reload() {
    var user = searchUser.val();
        if ($( "#repos, #commits:has(li)" )) {
             $('#repos, #commits').empty();
        }
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
            $('#create-date').html('<strong>Created at: <span>'+data.created_at+'</span></strong>');
            $('#update-date').html('<strong>Updated at: <span>'+data.updated_at+'</span></strong>');
        })
        
        // Get activity count
        $.get('https://api.github.com/users/'+user+'/events')     .done(function(data){
            $('#activity-count').html(''+data.length+' <br/>Commits');
            
            data.forEach( function(datum) {
                    $('#commits').append('<li class="list-group-item">'+datum.repo.name+' | <span><small>'+datum.payload.commits[0].message+'</small></span></li>')
                })   
        })
}

$('#search-users').click(function(){
    reload();
})

$('#new-user, #new-user1, #octodash').click(function(){
    window.location.reload();
})