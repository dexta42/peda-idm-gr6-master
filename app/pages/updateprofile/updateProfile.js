import {Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';
import {ProfilePage} from '../profile/profile';


@Page({
  templateUrl: 'build/pages/updateprofile/updateProfile.html'
})
export class UpdateProfilePage {
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;
    this.user =  this.userData.getLogged();
    this.update = {};
    this.update.firstname=this.user.firstname;
    this.update.lastname=this.user.lastname;
    this.update.username=this.user.login;
    this.update.password=this.user.password;
    this.update.description=this.user.description;
    });

 onUpdate(form,sessionData) {
    this.submitted = true;
   
    newuser = {
        id : this.user.id,
        firstname: this.update.firstname,
        lastname: this.update.lastname,
        login: this.update.username,
        password: this.update.password,
        description : this.update.description
      };
       console.log(newuser);
       this.userData.updateUser(newuser);
       this.nav.push(ProfilePage, sessionData);

    
    
  }



 
   
}