import { Component } from '@angular/core';
import { NavController, AlertController   } from 'ionic-angular';
import { Http } from '@angular/http';
import { Url } from '../url/url';
import { map } from 'rxjs/operators';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Testt } from './testt/testt';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  username:string = "60billion"
  password:string = "123123"
  

  token:string;

  constructor(public navCtrl: NavController,
              public http: Http,
              public url: Url,
              private secureStorage: SecureStorage,
              public alertCtrl: AlertController) {
  }

  _login(){
    let data ={
      username:this.username,
      password:this.password
    }
    this.http.post(this.url.url+"/token",data).pipe(
      map(res=>res.json())
    ).subscribe(response=>{
      this.secureStorage.create("tokenStorage")
      .then((storage:SecureStorageObject)=>{
        storage.set('token',response.result).then(
        
        )
      })
    })
  }

  _getToken(){
    this.secureStorage.create("tokenStorage")
      .then((storage:SecureStorageObject)=>{
        storage.get('token').then(data=>{
          this.token = data;
        }
          
        )
      })
  }

  _checkWorking(){
    this.navCtrl.push(Testt)
  }

}
