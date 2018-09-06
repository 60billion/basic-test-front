import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
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
  likeOddList;
  likeEvenList;
  isAndroid: boolean = false;
  profileOddList;
  profileEvenList;

  constructor(public navCtrl: NavController,
              private secureStorage: SecureStorage,
              private http : Http,
              private url : Url,
              public platform: Platform) {
                this.isAndroid = platform.is('android');

  }

  logout(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.set('token','')
      this.navCtrl.popToRoot ();
      this.navCtrl.setRoot (Login);
    })
    
  }

  //ionViewDidEnter를 통해 profile tab 으로 들어올시에 자동 리프레쉬 되도록 하였다.
  ionViewDidEnter() {
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token
        }
        this.http.post(this.url.url+'/profileMain',data).pipe(map(res=>res.json())).subscribe(response => {
            if(response.result){
              this.profileOddList = response.result.even;//화면에서 뿌려줄때, 그리드를 위해서 정보를 두개로 나누어서 받아왔다. 그 기준은 홀수 짝수 이다.
              this.profileEvenList = response.result.odd;
            }else if(response.login){
              this.navCtrl.push(Login);
            }
        })

      })
    })  
  }

  showLikes(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token
        }
        this.http.post(this.url.url+'/showLikes',data).pipe(map(res=>res.json())).subscribe(response => {
          if(response.result){
            this.likeOddList = response.result.even;
            this.likeEvenList = response.result.odd;
          }else if(response.login){
            this.navCtrl.push(Login)
          }
          
        })

      })
    }) 
  }




}
