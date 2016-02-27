import {Page} from 'ionic/ionic';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {MapPage} from '../map/map';
import {AboutPage} from '../about/about';
import {FindPage} from '../find/find';
import {MatchesPage} from '../matches/matches';
import {Input} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // set the root pages for each tab
    this.tab1Root = SchedulePage;
    this.tab2Root = SpeakerListPage;
    this.tab4Root = AboutPage;
    this.tab5Root = FindPage;
    this.tab6Root = MatchesPage;
  }
}
