import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Signin } from './signin/signin';
import { Http } from '@angular/http';
import { Url } from '../url/url';
import { map } from 'rxjs/operators';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  username:string;
  password:string;

  constructor(public navCtrl: NavController,
              private http : Http,
              private url : Url,
              private alert: AlertController) {
              
  }

  goToMain(){
    //이메일에 공백이들어갔을때를 대비해서 만든 알고리즘
    var realname:string="";
    var fakeUsername= this.username.split("");
    for(var i=0; i<fakeUsername.length; i++){
      if(fakeUsername[i] != " "){
        realname=realname+fakeUsername[i]
      }
    }

    let data = {
      username: realname,
      password: this.password
    }
    this.http.post(this.url.url+"/login",data).pipe(
      map(res=>res.json())
    ).subscribe(response=>{
     if(response.result === "success"){
        this.navCtrl.push(TabsPage);
     }else if(response.result === "passwordErr"){
        let alert = this.alert.create({
          title: '로그인 실패',
          subTitle: '비밀번호가 틀렸습니다.',
          buttons: ['돌아가기']
        });
        alert.present();
     }else if(response.result === "usernameErr"){
        let alert = this.alert.create({
          title: '로그인 실패',
          subTitle: '없는 아이디 입니다.',
          buttons: ['돌아가기']
        });
        alert.present();
      }
    })
    
  }
  goToSignin(){
    this.navCtrl.push(Signin)
  }


}
