console.clear()

var searchUser = $('#search');

function reload() {
    var user = searchUser.val();
        // get repos
        $.get('https://api.github.com/users/'+user+'/repos')
            .done(function(data){
                data.forEach( function(datum) {
                    $('#repos').append('<li class="list-group-item"><a href="'+datum.html_url+'">'+datum.name+'</li>')
                })
//                console.log(data);
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.log(errorThrown)
                });
}

$('#search-users').click(function(){
    reload();
})