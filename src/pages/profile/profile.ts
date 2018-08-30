import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Login } from '../login/login';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Url } from '../url/url';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {

  reviews;
  profile: string = "myPage";

  constructor(public navCtrl: NavController,
              private secureStorage: SecureStorage,
              private http : Http,
              private url : Url) {

  }

  logout(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.set('token','')
    })
    this.navCtrl.push(Login);
  }
  _button(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token
        }
        this.http.post(this.url.url+'/profileMain',data).pipe(map(res=>res.json())).subscribe(response => {
            if(response.reviews){
              this.reviews = response.reviews.reverse();
            }else if(response.login){
              this.navCtrl.push(Login);
            }
        })

      })
    })  
  }

  ionViewDidEnter() {
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token
        }
        this.http.post(this.url.url+'/profileMain',data).pipe(map(res=>res.json())).subscribe(response => {
            if(response.reviews){
              this.reviews = response.reviews.reverse();
            }else if(response.login){
              this.navCtrl.push(Login);
            }
        })

      })
    })  
  }


}
