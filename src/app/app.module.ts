import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Hot } from '../pages/hot/hot';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
        import { Upload } from '../pages/home/upload/upload';
import { TabsPage } from '../pages/tabs/tabs';
import { Alarm } from '../pages/alarm/alarm';
import { Profile } from '../pages/profile/profile';
import { Login } from '../pages/login/login';
        import { Signin } from '../pages/login/signin/signin';

import { HttpModule, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProgressBarModule} from "angular-progress-bar"
import { SecureStorage } from '@ionic-native/secure-storage';

import { Url } from '../pages/url/url';
import { SetTokenProvider } from '../providers/set-token/set-token';
import { Comments } from '../pages/home/comments/comments';

import { Keyboard } from '@ionic-native/keyboard';
import { Into_review } from '../pages/home/into_review/into_review';



@NgModule({
  declarations: [
    MyApp,
    Hot,
    ContactPage,
    HomePage,
      Upload,
      Comments,
      Into_review,
    Alarm,
    Profile,
    TabsPage,
    Login,
      Signin
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    ProgressBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Hot,
    ContactPage,
    HomePage,
      Upload,
      Comments,
      Into_review,
    Alarm,
    Profile,
    TabsPage,
    Login,
      Signin
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    File,
    FileTransferObject,
    FileTransfer,
    Url,
    SecureStorage,
    SetTokenProvider,
    Keyboard
  ]
})
export class AppModule {}
