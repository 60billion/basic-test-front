import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Url } from '../url/url';
import { map } from 'rxjs/operators';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  printing:string;

  constructor(public navCtrl: NavController,
              public http: Http,
              public url: Url) {
  }

  _print(){
    let data = ""
    this.http.post(this.url.url+"/session",data).pipe(
      map(res=>res.json())
    ).subscribe(response=>{
      this.printing = response.result;
    })
  }


}
