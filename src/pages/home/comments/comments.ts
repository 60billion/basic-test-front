import { Component,Input, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { Url } from '../../url/url';
import { Login } from '../../login/login';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
  selector:'comments-page',
  templateUrl: 'comments.html'
})
export class Comments {
  @ViewChild('input') myInput ;    
  @ViewChild('input1') myInput1 ; 
  @ViewChild('input2') myInput2 ; 
  comment:string;
  reviewId;
  underComment:boolean=false;
  inUnderComment:boolean=false;
  sunderComment:string;
  sinUnderComment:string;
  topComments;
  underComments;
  statusComments:boolean=false;
  nowUnderComment;
  towho;

  constructor(public navCtrl: NavController,
              public http : Http, 
              private url:Url, 
              private secureStorage: SecureStorage,
              private params : NavParams,
              private alert:AlertController,
              private keyboard: Keyboard) {

    this.reviewId = params.get('id')

  }
  ionViewDidEnter() {
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
            tokens:token,
            reviewId:this.reviewId
        }
        this.http.post(this.url.url+'/getcomments',data).pipe(map(res=>res.json())).subscribe(response => {
          if(response.result){
            this.topComments = response.result.topComments;
            this.underComments = response.result.underComments;

          }else if(response.noComments){
            this.statusComments = !this.statusComments;
          }else if(response.login){
            this.navCtrl.push(Login);
          }

        })

      })
    })  

    // setTimeout(() => {
    //   this.myInput.setFocus();
    // },150);

 }

 writeUnderComment(ucmt,towho){
  this.nowUnderComment = ucmt;
  this.towho=towho;
  this.underComment=!this.underComment;


  // setTimeout(() => {
  //   this.myInput1.setFocus();
  // },250);
  

 }

 //댓글작성시 서버로 댓글내용 보내는장치
 writeComment(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
            tokens:token,
            comment:this.comment,
            reviewId:this.reviewId
        }
        this.http.post(this.url.url+'/comment',data).pipe(map(res=>res.json())).subscribe(response => {
          if(response.result == "comment"){
            this.statusComments=false;
            this.ionViewDidEnter();
            this.comment = "";
          }
        })

      })
    })  
    
 }
  sendUnderComment(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
            tokens:token,
            comment:this.sunderComment,
            underComment:this.nowUnderComment,
            reviewId:this.reviewId
        }
        this.http.post(this.url.url+'/undercomment',data).pipe(map(res=>res.json())).subscribe(response => {
          if(response.result == "comment"){
            this.statusComments=false;
            this.underComment = !this.underComment;
            this.ionViewDidEnter();
            // this.nowUnderComment="";
            this.sunderComment = "";
          }
        })

      })
    })  

  }

  deleteComment(underComment,username){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
            tokens:token,
            underComment:underComment,
            username:username
        }
        this.http.post(this.url.url+'/deletecomment',data).pipe(map(res=>res.json())).subscribe(response => {
          if(response.result){            
            this.ionViewDidEnter();          
          }else if(response.noOwner){
            this.deleteAlert();
          }
        })

      })
    })  
  }
  deleteUnderComment(id,username){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
            tokens:token,
            id:id,
            username:username,
        }
        this.http.post(this.url.url+'/deleteundercomment',data).pipe(map(res=>res.json())).subscribe(response => {
          if(response.result){
            this.ionViewDidEnter();
          }else if(response.noOwner){
            this.deleteAlert();
          }
        })

      })
    })  
  }

  deleteAlert(){
    let alert = this.alert.create({
      title:'삭제실패',
      subTitle:'다른사용자의 댓글입니다.',
      buttons:['돌아가기']
    })
    alert.present();
  }
}
