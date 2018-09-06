import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-alarm',
  templateUrl: 'alarm.html'
})
export class Alarm {

  constructor(public navCtrl: NavController) {

  }
  comment =[
    {
      profileImg:"../../assets/imgs/logo.png",
      username:"user",
      comment:"this is a comment",
      usercomment:"1"
    },
    {
      profileImg:"../../assets/imgs/logo.png",
      username:"user",
      comment:"this is a comment",
      usercomment:"2"
    },
    {
      profileImg:"../../assets/imgs/logo.png",
      username:"user",
      comment:"this is a comment",
      usercomment:"3"
    }
  ]

  undercomment = [
    {
      underid:"1",
      profileImg:"../../assets/imgs/logo.png",
      username:"underuser",
      comment:"under comments..."
    },
    {
      underid:"1",
      profileImg:"../../assets/imgs/logo.png",
      username:"underuser",
      comment:"under comments..."
    },
    {
      underid:"3",
      profileImg:"../../assets/imgs/logo.png",
      username:"underuser",
      comment:"under comments..."
    },
    {
      underid:"3",
      profileImg:"../../assets/imgs/logo.png",
      username:"underuser",
      comment:"under comments..."
    },
    {
      underid:"3",
      profileImg:"../../assets/imgs/logo.png",
      username:"underuser",
      comment:"under comments..."
    },
    {
      underid:"1",
      profileImg:"../../assets/imgs/logo.png",
      username:"underuser1",
      comment:"under comments..."
    }
  ]
  

}
