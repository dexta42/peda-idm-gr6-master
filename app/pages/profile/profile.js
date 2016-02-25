import {Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';
import {UpdateProfilePage} from '../updateprofile/updateProfile';


@Page({
  templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;
    this.user;
    // this.userData.getLogged().then(user => {
      this.user =  this.userData.getLogged();
    });

  goToUpdateProfile(sessionData) {
    // go to the session detail page
    // and pass in the session data
    this.nav.push(UpdateProfilePage, sessionData);
  }
   
}