import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Login } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {

  constructor(public navCtrl: NavController,
              private secureStorage: SecureStorage) {

  }

  logout(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.set('token','')
    })
    this.navCtrl.push(Login);
  }


}
