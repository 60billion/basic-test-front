import { Component } from '@angular/core';

import { Hot } from '../hot/hot';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Alarm } from '../alarm/alarm';
import { Profile } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Hot;
  tab3Root = ContactPage;
  tab4Root = Alarm;
  tab5Root = Profile;
  
  constructor() {

  }
}
