import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Url } from '../../url/url';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Comments } from '../comments/comments';
import { Login } from '../../login/login';


@Component({
    selector: 'page-into',
    templateUrl: 'into_review.html'
  })
  export class Into_review {

      rows;
      id;

      constructor(public navCtrl: NavController,
                  private params : NavParams,
                  private url: Url,
                  private secureStorage: SecureStorage,
                  private http : Http,
                  private modalCtrl: ModalController){
    
       //home.ts에서 클릭하면 현재 ts모달이 띄워지는데, Home.ts에서 클릭하면서 리뷰 id값을 넘겨받는다.
       this.id = params.get('id')
      }

      
    //home.ts 함수를 그대로 들고왔다.
    showComments(id){
    const modal = this.modalCtrl.create(Comments,{id:id});
    modal.present();
    }

    //home.ts 함수를 그대로 들고왔다.
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
    //페이지오픈시 리뷰정보를 받아온다.
    ionViewDidEnter(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token,
          id:this.id
        }
        this.http.post(this.url.url+'/intopage',data).pipe(map(res=>res.json())).subscribe(response => {
            if(response.result){
                this.rows = response.result
            }if(response.login){
                this.navCtrl.push(Login)
            }
        })

      })
    })  
    }


  }