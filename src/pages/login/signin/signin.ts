import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Url } from '../../url/url';
import { Login } from '../login';



@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class Signin {

    username:string;
    password:string;
    passwordCheck:string;

  constructor(public navCtrl: NavController, 
              private http: Http,
              private url: Url,
              private alert:AlertController) {

  }


  //1차 비밀번호 체크후 서버에 데이타를 넘기고 서버에서 중복체크후에 등록여부를 돌려줌.
  register(){

        //이메일에 공백이들어갔을때를 대비해서 만든 알고리즘
        var realname:string="";
        var fakeUsername= this.username.split("");
        for(var i=0; i<fakeUsername.length; i++){
          if(fakeUsername[i] != " "){
            realname=realname+fakeUsername[i]
          }
        }

      if(this.password === this.passwordCheck && 
        this.password.length>5 && 
        this.passwordCheck.length>5 && 
        this.checkCapital(this.password)&& 
        this.checkCapital(this.passwordCheck)){

            let personalInfo = {
                username:realname,
                password:this.password
            }

            this.http.post(this.url.url+"/register",personalInfo).pipe(
                map(res=>res.json())
            ).subscribe(response => {
                if(response.result == "duplicated"){
                    let alert = this.alert.create({
                        title:"아이디가 중복되었습니다.",
                        subTitle:"다른아이디를 이용해주세요.",
                        buttons:["돌아가기"]
                    })
                    alert.present();
                }else if (response.result == "registered"){
                    let alert = this.alert.create({
                        title:"가입완료.",
                        subTitle:"회원가입이 완료되었습니다.",
                        buttons:[{
                            text: '로그인하기',
                            handler: () => {
                              this.navCtrl.push(Login);
                            }
                            }]
                    })
                    alert.present();
                }
            })
        }else{
            let alert = this.alert.create({
                title:'비밀번호 오류',
                subTitle: '6자 이상 대문자 1개 이상 포함되어야 합니다.',
                buttons: ['돌아가기']
            })
            alert.present();
        }
  }
  //대문자확인 함수
  checkCapital(array){
    var check = array.split("");
    var result = ""
    for(var i in this.url.capitals){
        for(var m in check){
            if(this.url.capitals[i]===check[m]){
                result = "true"
            }
        }
    }
    if(result){
        return true;
    }else{
        return false
    }
  }

}
