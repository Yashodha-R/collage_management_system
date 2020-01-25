import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  disableSideNav:boolean;
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'cart'
    },
    {
      title: 'Course',
      url: '/dashboard/course',
      icon: 'book'
    },
    {
      title: 'Student',
      url: '/dashboard/student',
      icon: 'contacts'
    },
    {
      title: 'Staff',
      url: '/dashboard/staff',
      icon: 'people'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router
  ) {
    this.initializeApp();
    this.disableSideNav = window.location.pathname ==='/login'? true :false;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
