import {Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;

    this.signup = {};
    this.submitted = false;
  }

  onSignup(form) {
    this.submitted = true;

    console.log(form);

    if (form.valid) {
      this.userData.signup(this.signup.firstname,this.signup.lastname,this.signup.username,this.signup.password);
      this.nav.push(TabsPage);
    }
  }
}
