package controllers;

import java.util.List;

import com.avaje.ebean.Ebean;
import com.fasterxml.jackson.databind.JsonNode;

import controllers.Authentication.AuthenticatedUser;
import play.*;
import play.libs.Json;
import play.mvc.*;
import play.data.*;
import models.*;
import views.html.*;



public class Application extends Controller {

    public static Result index() {
    	
    	return ok(premierPage.render());
    }
    
	 //return 5 first Tweet
	 public static Result listTweetsInit(String userconnect)
	    {
		 		
		 		String username = request().queryString().get("userconnect")[0];
	           
		 		System.out.println(username);
	            
	            if(request().accepts("application/json"))
	            {
	            	List<Tweet> tweets = Tweet.ajoutTweetAmis(username);
	            	
	            	if (tweets.size() >= 5){
	            		
	            		int from = 0;
			            int to =  5;
			              
			            tweets=tweets.subList(from, to);
			             
			            return ok(Json.toJson(tweets));
	            	}else{
	            		 return ok(Json.toJson(tweets));
	            	}	            	 
	            }
	            
	            return badRequest();
	    }
	 
	 //return Tweets between from and to	 
	  public static Result listTweetsFromTo(String userconnect,Integer From,Integer To)
	  {
     
	            if(request().accepts("application/json"))
	            {	            		
		                List<Tweet> tweets = Tweet.ajoutTweetAmis(userconnect);
		                
		                List<Tweet>  Listtweet;
		                
		                if(tweets.size() >= To){
		                
		                	Listtweet = tweets.subList(From, To);
		                	
		                	return ok(Json.toJson(Listtweet));
		                
		                }else{

		                	return ok("");
		               
		                }

		                
	            }
	            
	            return badRequest();
	   }
	  
	  public static Result listTweetDb(String userconnect)
	    {
		 		
		 		String username = request().queryString().get("userconnect")[0];
	           
		 		System.out.println(username);
	            
	           // if(request().accepts("application/json"))
	           // {
	            	//List<Tweet> tweets = Tweet.ajoutTweetAmis(username);
	            	int count=Ebean.find(Tweet.class).where().eq("userconnect", username).findList().size();
	            	
	            		 return ok(Json.toJson(count));
	            		            	 
	          //  }
	            
	          //  return badRequest();
	    }

	 
	 public static Result  listComment(Long id){
		 	
		 if(request().accepts("application/json"))
         {
			 List<Commentaire> Comments = Commentaire.findByTweet(id);
			 return ok(Json.toJson(Comments));
         }else{
        	 return badRequest();
         }
	}
	   public static Result users(String term){

           //String termentre = request().queryString().get("term")[0];

           List<Utilisateur> users = Utilisateur.find(term);

           return ok(Json.toJson(users));

   }

}
