import { Component,Input, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { Url } from '../../url/url';


@Component({
  selector:'comments-page',
  templateUrl: 'comments.html'
})
export class Comments {
  @ViewChild('input') myInput ;    
  comment:string;

  constructor(public navCtrl: NavController,
              public http : Http, 
              private url:Url, 
              private secureStorage: SecureStorage) {

  }
  ionViewDidEnter() {

    setTimeout(() => {
      this.myInput.setFocus();
    },150);

 }

 //댓글작성시 서버로 댓글내용 보내는장치
 writeComment(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
            tokens:token,
            comment:this.comment
        }
        this.http.post(this.url.url+'/comment',data).pipe(map(res=>res.json())).subscribe(response => {
          if(response.result == "comment"){
            this.comment="";
          }
        })

      })
    })  
    
 }

  writeUnderComment(){
  }
  writeInUnderComment(){
  }
  

}
