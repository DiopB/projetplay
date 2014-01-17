package models;

import java.util.Date;
import java.util.List;

import play.data.format.*;

import javax.persistence.*;
import javax.validation.Valid;

import controllers.MD5Password;
import play.data.validation.Constraints;
import play.data.validation.Constraints.Email;
import play.db.ebean.Model;

@Entity
@Table(uniqueConstraints=@UniqueConstraint(columnNames = {"email"})) 
public class Utilisateur extends Model {
	
	@Id
	@Constraints.Required
    @Constraints.MaxLength(10)
	public String username;
	
	@Constraints.Required
	@Email
	public String email;
	
	public String sexe;
	
	@Formats.DateTime(pattern="MM/dd/yy")
	public Date date_inscription;
	
	@Constraints.MinLength(5)
	@Constraints.Required
	public String password;
	
	@Constraints.Required
    @Constraints.MaxLength(200)
	public String description;
	
	@OneToMany(mappedBy="user")  //un User pour plusieurs tweet, "mappedBy" qui référence le nom de l'attribut User dans la classe Event
	private List<Tweet> TweetList;
	
	@Valid
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="images", referencedColumnName="idimage")
	public Image images;
	
	public Utilisateur(){		
	}
	
	  public Utilisateur(String username, String password, String sexe,
			String adresseemail, Date date_inscription, String desc,Image images) {
		super();
		this.username = username;
		this.password = password;
		this.sexe = sexe;
		this.email = adresseemail;
		this.date_inscription = date_inscription;
		this.description = desc;
		this.images = images;
	}
	  
	public static Finder<String, Utilisateur> find = new Finder<String, Utilisateur>(String.class, Utilisateur.class);
	
	public static List<Utilisateur> findall(){
		return find.all();
	}
	public static Utilisateur findByEmail(String email) {
        return find.where().eq("email", email).findUnique();
    }
	
	public static Utilisateur findByusername(String username){
		return find.where().eq("username", username).findUnique();
	}
	public static Utilisateur findByusernameUnique(String username){
		return find.where().eq("username", username).findUnique();
	}
	public static Utilisateur authenticate(String email, String password) {
		 String passwordhashe = MD5Password.getEncodedPassword(password);
          return find.where()
              .eq("email", email)
              .eq("password", passwordhashe)
              .findUnique();
      }
	public static List<Utilisateur> find(String term){
        return find.where().like("username", "%"+term+"%").findList();
}

}
