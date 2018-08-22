import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';
import { map } from 'rxjs/operators'
import { HomePage } from '../home';
import { Url } from '../../url/url';



@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class Upload {

  base64Image="https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png"
  title:string;
  review:string;


  constructor(public navCtrl: NavController,
              private camera: Camera,
              public http : Http,
              private transfer: FileTransfer, 
              private file: File,
              private toastCtrl: ToastController,
              private loadingCtrl:LoadingController,
              private url:Url) {

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
        params:{"title":this.title, "review":this.review}//데이터 업로드(RDS)
    }

    fileTransfer.upload(this.base64Image ,this.url.url+'/getReview', options)
    .then((data) => {//이부분이 작동하려면 서버에서 응답을 보내주어야한다.
      loader.dismiss();
      this.navCtrl.push(HomePage);//홈페이지로 넘어가면서 리프레시를 적용해야 업로드화면이 바로 메인에 나온다.ionViewDidEnter(){} 이내용을 homt.ts에 추가한다.
    }, (err) => {
      loader.dismiss();
    })
  }

}
