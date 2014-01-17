$(document).ready(function() {
	bindEventsOnReady();
});





function bindEventsOnReady() 
{

	var username;

	$('#Loadmore').click(function() {
		username=$(this);
		LoadMore(username);
	});
	
	BindInitailTweets();
	
		
		
}

function LoadMore(username){
	console.log(username.val());
	console.log("loadMore");  
    var From = $(".box_1").children().length;
    console.log("From"+From);
    var To = From+1;
    console.log("TO"+To);
    
    $.get('/moretweets',
    		
    		{'userconnect': username.val(),
    	
			'From': From,
			
			'To': To },
			
			function(data){
				
				if(data != "")
				{				
					$.each(data, function(key, val) 
						{
						
						if(val.user.images !=""){
							var html = '<div class="box_2"> <img width="100" height="100" src="/assets/bootstrap/img/aa.jpeg" alt=""  class="main_img_2" /><div class="text"'+val.id+'><h6>'+val.user.username+'</h6><br/><h5>'+val.creationDate+'</h5><br/><p>';
							}else{
							var html = '<div class="box_2"> <img width="100" height="100" src="@routes.Pageperso.getImage('+val.user.images.idimage+')" alt=""  class="main_img_2" /><div class="text"'+val.id+'><h6>'+val.user.username+'</h6><br/><h5>'+val.creationDate+'</h5><br/><p>';
						}
						if(val.sujet != "") {
							
							html = html +val.label+'<a href="@routes.Sujets.affSujet('+val.sujet+')">#'+val.sujet+'</a>'+val.Taguser+'<br/><br />';
							
						}else{
							
							html = html + val.label+" "+val.Taguser+'<br /><br />';
						}
						
						html = html + '<div class="box_comm'+val.id+'  ">'
		
						
						$.get('/CommentTweet',
								
								{'IDtweet': val.id},
								
								function(data2){
									
									if(data2 != "")
									{
										var html2 = 'Les commentaires : <br/>';
										
										$(".box_comm"+val.id).prepend(html2)
									}
									$.each(data2, function(key2, val2) 
											{
												var html3 = "<b>" + val2.user.username + "</b>  : <b>" + val2.label + "</b> <br/>";
												console.log(val2.user.username + " : " + val2.label + ":" + val2.tweet.id);
												$(".box_comm"+val2.tweet.id).append(html3);
											});						
								});
						
						
						html = html + '</div><input type="hidden" name="idTweet" value="'+val.id+'">'
						html = html + '<input type="hidden" name="username" value="'+val.user.username+'">'
						html = html + '<textarea cols="50" rows="3" name="commentaire" placeholder="Mettre un commentaire"></textarea>'
						html = html + '<input  type="submit" class="button gray medium" value="Publier"></p></div></div>'
						
						$(".box_1").prepend(html);
							});
				}else{
					$("#Loadmore").remove();
					$(".errormessage").append('<b> il n\'y a pas d\'autre Tweet à afficher</b>');
				}
			});
    
    
  
}

	
function BindInitailTweets(){
	var userconnect = $('#userconnect').val();
	
	//console.log(userconnect);
	//console.log("BindInitailTweets");
	
	$.get('/tweetsInit',			
			{'userconnect': userconnect},
			function(data){
					$.each(data, function(key, val) 
							{
						if(data.length != 0){
							if(val.user.images !=""){
								var myDate = new Date( val.creationDate );
						        var strDate = "";
						        strDate += myDate.getUTCDate()+"/"+(myDate.getMonth()+1)+"/"+myDate.getFullYear();
						        strDate += " A "+myDate.getHours()+":"+myDate.getMinutes();
							var html = '<div class="box_2"> <img width="100" height="100" src="/assets/bootstrap/img/aa.jpeg" alt=""  class="main_img_2" /><div class="text"'+val.id+'><h6>'+val.user.username+'</h6><br/><h5>'+strDate+'</h5><br/><p>';
							}else{
							var html = '<div class="box_2"> <img width="100" height="100" src="@routes.Pageperso.getImage('+val.user.images.idimage+')" alt=""  class="main_img_2" /><div class="text"'+val.id+'><h6>'+val.user.username+'</h6><br/><h5>'+strDate+'</h5><br/><p>';
							}
							if(val.sujet != "") {
							
								html = html +val.label+'<a href="@routes.Sujets.affSujet('+val.sujet+')">#'+val.sujet+'</a><br/><br />';
								if(val.Taguser !=null){
									
									html =html +" @"+val.Taguser+'<br />';
									
								}else{
									
									html=html;
								}
								
							}else{
							
								html = html + val.label+'<br /><br />';
								
								if(val.Taguser !=null){
									
									html =html +" @"+val.Taguser+'<br />';
									
								}else{
									
									html=html;
								}
							}
							
						
							html = html + '<div class="box_comm'+val.id+'  ">'
		
						
							$.get('/CommentTweet',
								
								{'IDtweet': val.id},
								
								function(data2){
									
									if(data2 != "")
									{
										var html2 = 'Les commentaires : <br/>';
										
										$(".box_comm"+val.id).prepend(html2)
									}
									$.each(data2, function(key2, val2) 
											{
												var html3 = "<b>" + val2.user.username + "</b>  : <b>" + val2.label + "</b> <br/>";
												console.log(val2.user.username + " : " + val2.label + ":" + val2.tweet.id);
												$(".box_comm"+val2.tweet.id).prepend(html3);
											});						
								});
						
						
						html = html + '</div><input type="hidden" name="idTweet" value="'+val.id+'">'
						html = html + '<input type="hidden" name="username" value="'+val.user.username+'">'
						html = html + '<textarea cols="50" rows="3" name="commentaire" placeholder="Mettre un commentaire"></textarea>'
						html = html + '<input  type="submit" class="button gray medium" value="Publier"></p></div></div>'
						
						$(".box_1").prepend(html);
						}else{
							$("#Loadmore").remove();
							$(".errormessage").append('<b> Vous n\'avez pas encore Tweeter!!</b>');
								}
							});
			});
	} 