import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic/ionic';
import {Http} from 'angular2/http';


@Injectable()
export class UserData {
  
  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {


      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('data/users.json').subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
    this.data=res.json();
        resolve(this.data);
      });
    });
  }
  
  getUsers() {

    return this.load().then(data => {
      return data.users;
    });
  }
  
  getUserByUsername(username) {
    return this.load().then(data => {
      return data.users.find(s => s.username === username);
    });
  }

  constructor(events: Events, http : Http) {
    this._favorites = [];
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.HAS_LOGGED_IN = 'hasLoggedIn';
    this.http=http;
    if(localStorage.getItem('session')==null){
      var session = {
      'users' : [],
      };
      session.users.push({"id":0,"firstname":"admin","lastname":"admin","login":"admin","password":"admin","description":" "});
      localStorage.setItem('session', JSON.stringify(session));
    }
    if(localStorage.getItem('matches')==null){
      matches= [];
      localStorage.setItem('matches', JSON.stringify(matches));
    }
  }

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName)
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username, password) {
    var session = JSON.parse(localStorage.getItem('session'));
    console.log(username);
    for(i=0;i<session.users.length;i++){
      if(username===session.users[i].login && password===session.users[i].password){
        var user = {"id":session.users[i].id,"firstname":session.users[i].firstname,"lastname":session.users[i].lastname,"login":session.users[i].login,"password":session.users[i].password};
        //user.push({"firstname":session.users[i].firstname,"lastname":session.users[i].lastname,"login":session.users[i].login,"password":session.users[i].password});
        localStorage.setItem('user', JSON.stringify(user));
        //localStorage.setItem('user', session.users[i]);
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.events.publish('user:login');
      }
    }
    
  }

  getLogged(){
    var user = JSON.parse(localStorage.getItem('user'));
    return user;

  }

  addMatch(idA, idB){
    var matches = JSON.parse(localStorage.getItem('matches'));
    if(matches==null){
      matches=[];
    }
    var finded = false;
    for(i=0;i<matches.length;i++){
      if(matches[i].idA==idB && matches[i].idB==idA){
        matches[i].status="confirmed";
        finded=true;
      }
    }
    if(finded==false){
      var match = {"idA":idA,"idB":idB,"status":"send"};
      matches.push(match);
    }
    
    localStorage.setItem('matches', JSON.stringify(matches));
  }

  addDislike(idA,idB){
    var matches = JSON.parse(localStorage.getItem('matches'));
    var finded=false;
    if(matches==null){
      matches=[];
    }
    for(i=0;i<matches.length;i++){
      if(matches[i].idA==idB && matches[i].idB==idA){
        matches[i].status="disliked";
        finded=true;
      }
    }

    if(finded==false){
      var match = {"idA":idA,"idB":idB,"status":"disliked"};
      matches.push(match);
    }
    
    localStorage.setItem('matches', JSON.stringify(matches));
  }

  findMatches(userId){
    var matches = JSON.parse(localStorage.getItem('matches'));
    var session = JSON.parse(localStorage.getItem('session'));
    var idMatches = [];
    var userMatches = [];
    for(i=0;i<matches.length;i++){
      if(matches[i].idA == userId && matches[i].status =="confirmed"){
        idMatches.push(matches[i].idB);
      }
      else if(matches[i].idB == userId && matches[i].status =="confirmed"){
        idMatches.push(matches[i].idA);
      }
    }

    for(i=0;i<session.users.length;i++){
      for(j=0;j<idMatches.length;j++){
        if(session.users[i].id==idMatches[j]){
          userMatches.push(session.users[i]);
        }
      }
    }
    return userMatches;
  }

  findUser(){
    var users = [];
    var usersMatched = [];
    var user = JSON.parse(localStorage.getItem('user'));
    var matches = JSON.parse(localStorage.getItem('matches'));
    var session = JSON.parse(localStorage.getItem('session'));
    usersMatched.push(user.id);
    for(i=0;i<matches.length;i++){
      if(matches[i].idA == user.id){
        usersMatched.push(matches[i].idB);
      }
      else if(matches[i].idB == user.id && matches[i].status != "send" ){
        usersMatched.push(matches[i].idA);
      }
    }

    for(i=0;i<session.users.length;i++){
      var isMatched = false;
      for(j=0;j<usersMatched.length;j++){
        if(session.users[i].id == usersMatched[j]){
          isMatched = true;
        }
      }
      if (isMatched==false) {
        users.push(session.users[i]);
      }
    }
       return users;
  }

  updateUser(newuser){
    var user = JSON.parse(localStorage.getItem('user'));
    var session = JSON.parse(localStorage.getItem('session'));
    for(i=0;i<session.users.length;i++){
      if(user.id === session.users[i].id){
        session.users[i]=newuser;
      }
    }
    localStorage.setItem('session', JSON.stringify(session));

    this.storage.remove('user');
    localStorage.setItem('user', JSON.stringify(newuser));

  }

  signup(firstname,lastname, username, password) {
    var session = JSON.parse(localStorage.getItem('session'));
    var user = {"id":session.users.length,"firstname":firstname,"lastname":lastname,"login":username,"password":password,"description":" "};
    session.users.push(user);
    localStorage.setItem('session', JSON.stringify(session));
    localStorage.setItem('user', JSON.stringify(user));
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user');
    this.events.publish('user:logout');
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
  
  
}