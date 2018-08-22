import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
        import { Upload } from '../pages/home/upload/upload';
import { TabsPage } from '../pages/tabs/tabs';
import { Alarm } from '../pages/alarm/alarm';
import { Profile } from '../pages/profile/profile';
import { Login } from '../pages/login/login';
        import { Signin } from '../pages/login/signin/signin';

import { HttpModule } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProgressBarModule} from "angular-progress-bar"

import { Url } from '../pages/url/url';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
      Upload,
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
    AboutPage,
    ContactPage,
    HomePage,
      Upload,
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
    Url
  ]
})
export class AppModule {}
