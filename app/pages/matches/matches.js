import {Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/matches/matches.html'
})
export class MatchesPage {
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;
    this.session;
    this.user = this.userData.getLogged();
    this.matchs = this.userData.findMatches(this.user.id)
   	console.log("matches : "this.matches);
    });