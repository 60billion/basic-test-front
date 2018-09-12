import { Component } from '@angular/core';
import { NavController, AlertController, ModalController   } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Http } from '@angular/http';
import { Url } from '../url/url';
import { map } from 'rxjs/operators';
import { Login } from '../login/login';
import { Into_review } from '../home/into_review/into_review';




@Component({
  selector: 'page-hot',
  templateUrl: 'hot.html'
})
export class Hot {
  first;
  second;
  third;
  hello:string = "hello1"


  constructor(private secureStorage : SecureStorage, 
              private http: Http, 
              private url : Url, 
              public navCtrl: NavController,
              private modalCtrl: ModalController){

  }
  intoReview(id){
    const modal = this.modalCtrl.create(Into_review,{id:id});
    modal.present();
  }

  ionViewDidEnter(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token
        }
        this.http.post(this.url.url+'/gethots',data).pipe(map(res=>res.json())).subscribe(response => {
          if(response.result){
            this.first = response.result.first;
            this.second = response.result.second;
            this.third = response.result.third;
          }else if(response.login){
            this.navCtrl.push(Login)
          }

        })

      })
    })
  }


}
