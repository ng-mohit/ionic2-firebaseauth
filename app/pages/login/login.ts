import { Component } from '@angular/core';
import { NavController, Alert, Loading } from 'ionic-angular';
import {FirebaseAuth, AuthProviders, AuthMethods} from 'angularfire2';
import {HomePage} from '../home/home';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  public loading: Loading;
  constructor(public nav: NavController, public auth: FirebaseAuth) {}
  
  public registerUser(credentials){
    this.showLoading();
    
    this.auth.createUser(credentials).then((authData) =>{
      this.loading.dismiss();
      let prompt = Alert.create({
        title: 'Success',
        subTitle: 'Your new Account was created!',
        buttons: ['OK']
      });
      
      this.nav.present(prompt);
    }).catch((error) => {
        this.showError(error)
      });
  }
  
  
  public login(credentials){
    this.showLoading();
    console.log("Inside email auth");
    this.auth.login(credentials, {
      provider: AuthProviders.Password,
       method: AuthMethods.Password,
    }).then((authData) => {
      this.loading.dismiss();
      this.nav.setRoot(HomePage);
    }).catch((error) => {
      this.showError(error);
    }) 
  }
  
  public googleLogin(){
    this.showLoading();
    console.log("Inside google auth");
    this.auth.login({
      provider: AuthProviders.Google
    }).then((authData) => {
      this.loading.dismiss();
      console.log(JSON.stringify(authData));
      this.nav.setRoot(HomePage);
    }).catch((error)=>{
      this.showError(error);
    })
  }
  
   showLoading(){
      this.loading = Loading.create({
        content:'Please wait.....'
      });
      this.nav.present(this.loading);
    }
    
    showError(text){
      setTimeout(() => {
        this.loading.dismiss();
      });
      
      let prompt = Alert.create({
        title: 'Fail',
        subTitle: text,
        buttons: ['OK']
      });
      
      this.nav.present(prompt);
    }
}
