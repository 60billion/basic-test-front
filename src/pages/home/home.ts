import { Component } from '@angular/core';
import { NavController, Refresher, AlertController } from 'ionic-angular';
import { Upload } from './upload/upload';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { Url } from '../url/url';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //wantit 증가 게이지 보이기용도
  wantit:number = 0;
  wantitString:string = "0";
  reviews;
  

  constructor(public navCtrl: NavController, public http : Http, private url:Url, private alertCtrl: AlertController) {
  
  }

  goToUploadPage(){
    this.navCtrl.push(Upload);
  }

  //wantit 증가 게이지 보여주기 용도
  wantitClick(){
    if(this.wantit < 99){
      this.wantit++;
      this.wantitString = this.wantit.toString();
    }else{
      this.wantit=100;
      this.wantitString="100"
    }
    
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
    let data ={};
    this.http.post( this.url.url+'/getall',data).pipe(
      map(res => res.json())
    ).subscribe(response => {//getall 대응내용     
      this.reviews = response.reviews.reverse();
    })
  }

}
