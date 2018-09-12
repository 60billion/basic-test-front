import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';
import { map } from 'rxjs/operators'
import { HomePage } from '../home';
import { Url } from '../../url/url';

import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Login } from '../../login/login';
import { TabsPage } from '../../tabs/tabs';



@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class Upload {

  @ViewChild('myInput') myInput: ElementRef;

  base64Image="https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png"
  title:string;
  review:string;
  checkdata;
  token;
  toppings;
  product:string;
  productInfo:string;
  category:string;

  constructor(public navCtrl: NavController,
              private camera: Camera,
              public http : Http,
              private transfer: FileTransfer, 
              private file: File,
              private toastCtrl: ToastController,
              private loadingCtrl:LoadingController,
              private url:Url,
              private secureStorage: SecureStorage) {

  }
  //html에 textarea부분 자동으로 커지게 설정하는 내용. 자세하내용은 모르 그냥 퍼옴..
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
}
  //카메라켜서 이미지가지고 오기
  openCamera(){
    const options:CameraOptions={
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
    },(err)=>{

    });
  }
  //사진첩 열어서 이미지 가지고오기
  openGallery(){
    const options:CameraOptions={
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
    },(err)=>{

    });
  }

  //업로드 버튼을 눌렀을때
  _uploadImage(){
    this.secureStorage.create("tokenStorage")
    .then((storage:SecureStorageObject)=>{
      storage.get('token').then(token =>{//시큐어스토리지로 감싸주었다. 스토어데이터에 토큰을 넣기위해서
        var ran = Math.floor(Math.random() * 10);
        var name:string = "image"
        var date =new Date();
        var fileName = name+ran+date.getTime();

        //로더화면뿌리기
        let loader = this.loadingCtrl.create({
          content: "Uploading..."
        });
        loader.present();
        
        
            

        //이미지 업로드(S3)
        const fileTransfer: FileTransferObject = this.transfer.create();


        let options: FileUploadOptions = {
            fileKey: 'reviewImage',
            fileName: fileName,
            chunkedMode: false,
            mimeType:'multipart/form-data',
            params:{"title":this.title, "review":this.review, "tokens":token, "category":this.category, "productName":this.product, "productInfo":this.productInfo}//데이터 업로드(RDS)
        }

        fileTransfer.upload(this.base64Image ,this.url.url+'/getReview', options)
        .then((data) => {//이부분이 작동하려면 서버에서 응답을 보내주어야한다.
          loader.dismiss();
          var a = data.response.trim()
          //아래를 보면 데이터는 객체로 받는데 객체안에 response가 있으며 그안에 객체를 또 집어넣어서 서버응답을하니 문제가 있었다.
          //그래서 아래와 같이 "{\"session\":\"session\"}" 처럼 문자열로 풀어서 진행하였다. data에 reponse는 객체가아니라 문자열로 서버응답하면좋을거같다.
          //다만 토큰에 따른 미들웨어 때문에 객체로 응답하고있다. 추후 토큰을 바디값이 아닌 헤더로 바꿀 예정이다.

          if(data.response == "{\"session\":\"session\"}"){
            this.navCtrl.push(TabsPage);
          }else if(data.response == "{\"login\":\"login\"}"){
            this.navCtrl.push(Login)
          }

          //data의 객체 형태가 궁금해서 콘솔해봤지만 나오지 않았었다. 그래서 제이슨을 이용하니 콘솔에서 구체적 내용이 나왔다 앞으로 참고하길
          console.log("~~~~~~~~~~~~~~~~~~~~  "+JSON.stringify(data));
          console.dir("~~~~~~~~~~~~~~~~~~~~d  "+JSON.stringify(a));
          console.dir("~~~~~~~~~~~~~~~~~~~~d0  "+JSON.stringify(data[0]));
          console.dir("~~~~~~~~~~~~~~~~~~~~d1  "+data[1]);
          //this.navCtrl.push(HomePage);//홈페이지로 넘어가면서 리프레시를 적용해야 업로드화면이 바로 메인에 나온다.ionViewDidEnter(){} 이내용을 homt.ts에 추가한다.
          
        }, (err) => {
          loader.dismiss();
          this.checkdata = err
        })
        //여기까지 시큐어스토리지로 감싸주었다.
      })
    })
  }

}
