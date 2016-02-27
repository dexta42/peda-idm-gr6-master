import {Page, NavController} from 'ionic/ionic';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/find/find.html'
})
export class FindPage {
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;
    this.session;
    //this.session = this.userData.findUser();
    //console.log(this.session.users);
    this.users = this.userData.findUser();
   
    });

Match(idB){
  idA = this.userData.getLogged().id;
  this.userData.addMatch(idA,idB);
  

}

Dislike(idB){
  idA = this.userData.getLogged().id;
  this.userData.addDislike(idA,idB);

}


