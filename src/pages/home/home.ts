import { Component } from '@angular/core';
import { NavController, Refresher, AlertController,ModalController } from 'ionic-angular';
import { Upload } from './upload/upload';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { Url } from '../url/url';
import { Login } from '../login/login';
import { Comments } from './comments/comments';
import { Into_review } from './into_review/into_review';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items=[];

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
              this.secureStorage.create("tokenStorage")
              .then((storage:SecureStorageObject)=>{
                storage.get('token').then(token=>{
                  
                  let data={
                    tokens:token
                  }
                  this.http.post(this.url.url+'/getall',data).pipe(map(res=>res.json())).subscribe(response => {
                      if(response.reviews){
                        this.reviews = response.reviews.reverse();
                        for (let i = 0; i < 10; i++) {
                          this.items.push( this.reviews[this.items.length] );
                        }
                      }else if(response.login){
                        this.navCtrl.push(Login);
                      }
                  })
          
                })
              }) 
  } 
  
  intoReview(id){
    const modal = this.modalCtrl.create(Into_review,{id:id});
    modal.present();
  }

  goToUploadPage(){
    const modal = this.modalCtrl.create(Upload);
    modal.present();
  }

  
  showComments(id){
    const modal = this.modalCtrl.create(Comments,{id:id});
    modal.present();
  }

  

  wantitClick(id,count,i){
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
      //this.navCtrl.setRoot(this.navCtrl.getActive().component);
      this.ionViewDidEnter();
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
              this.items = this.reviews.slice(0,this.items.length); 
            }else if(response.login){
              this.navCtrl.push(Login);
            }
        })

      })
    })  
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      if(this.reviews.length == this.items.length+1 || this.reviews.length < this.items.length+1 ){
        infiniteScroll.enable(false);
      }
      for (let i = 0; i < 1; i++) {
        this.items.push( this.reviews[this.items.length] );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
