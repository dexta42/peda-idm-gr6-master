import {Page, NavParams} from 'ionic/ionic';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/session-detail/session-detail.html'
})
export class SessionDetailPage {
  constructor(navParams: NavParams, userData: UserData) {
    this.navParams = navParams;
    this.session = navParams.data;

    this.userData = userData;
	 this.user;

    this.userData.getUserByUsername('login').then(user => {
      this.user = user;
    });
  }
}
