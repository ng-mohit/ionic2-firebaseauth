import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {LoginPage} from './pages/login/login';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, AngularFireAuth,AuthMethods,AuthProviders, firebaseAuthConfig} from 'angularfire2';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers:[
        FIREBASE_PROVIDERS,
        defaultFirebase('https://yagrocery.firebaseio.com/'),
        firebaseAuthConfig({
           provider: AuthProviders.Password,
           method: AuthMethods.Password
       }),
       firebaseAuthConfig({
          provider: AuthProviders.Google,
          method: AuthMethods.Popup,
          remember: 'default',
          scope: ['email']
      })

        // defaultFirebase({
        //   apiKey: "",
        //   authDomain: "",
        //   databaseURL: "https://yagrocery.firebaseio.com/",
        //   storageBucket: "gs://yagrocery.appspot.com",
        // })
      ]
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
