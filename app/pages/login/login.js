import {IonicApp, Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;

    this.login = {};
    this.submitted = false;

    this.user;

    userData.getUserByUsername('login').then(user => {
      this.user = user;
    });
  
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username,this.login.password);
      this.nav.push(TabsPage);
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }

 
}
