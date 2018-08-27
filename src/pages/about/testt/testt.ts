import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Url } from '../../url/url';
import { map } from 'rxjs/operators';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Http } from '@angular/http';
import { Login } from '../../login/login';


@Component({
  selector: 'page-testt',
  templateUrl: 'testt.html'
})
export class Testt {

    status:string = "Not working"
    storeCheck:string;

  constructor(public navCtrl: NavController,
                public http: Http,
                private secureStorage: SecureStorage,
                public url: Url) {
  }

  checkTokenWorking(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token=>{
        
        let data={
          tokens:token
        }
        this.http.post(this.url.url+'/ver',data).pipe(map(res=>res.json())).subscribe(response => {
            if(response.one){
              this.status = response.one
            }else if(response.login){
              this.navCtrl.push(Login);
            }
        })

      })
    })  
  }

  



  


 }
