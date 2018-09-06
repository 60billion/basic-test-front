import { Component } from '@angular/core';
import { NavController, Refresher, AlertController,ModalController } from 'ionic-angular';
import { Upload } from './upload/upload';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { Url } from '../url/url';
import { Login } from '../login/login';
import { Comments } from './comments/comments';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  wantitString:string;
  wantitUp:boolean = false;
  reviews;
  reviewsPlus:boolean = true;
  

  

  constructor(public navCtrl: NavController, 
              public http : Http, 
              private url:Url, 
              private alertCtrl: AlertController,
              private secureStorage: SecureStorage,
              public modalCtrl: ModalController) {
  
  }

  goToUploadPage(){
    this.navCtrl.push(Upload);
  }

  
  showComments(){
    const modal = this.modalCtrl.create(Comments);
    modal.present();
  }

  

  wantitClick(id,count){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token,
          id:id,
          count:count
        }
        this.http.post(this.url.url+'/wantit',data).pipe(map(res=>res.json())).subscribe(response => {
            if(response.result){
              this.ionViewDidEnter();
            }
        })

      })
    })  
  }

  //리프래시
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      //아래기능이 중요함(리프래시해줌)
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      refresher.complete();
    }, 2000);
  }
 
  //다시 홈으로 돌아오면 리프래시를 하기 위함이다.
  ionViewDidEnter() {
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token
        }
        this.http.post(this.url.url+'/getall',data).pipe(map(res=>res.json())).subscribe(response => {
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
