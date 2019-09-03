import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPageModule } from './login.module';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: {
    email: string;
    password: string;
  }={
    email: "",
    password: ""
  };
  
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth,
  ){}

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.router.navigate(["/tabs"]);
      }
    });
  }

  userLogin(){
    this.afAuth.auth.signInWithEmailAndPassword(this.login.email, this.login.password)
    .then(async user => {
      const toast = await this.toastCtrl.create({
        message: "ログインしました",
        duration: 3000
      });
      await toast.present();
      this.router.navigate(["/tabs"]);
    })
    .catch(async error => {
      const toast = await this.toastCtrl.create({
        message: error.toString(),
        duration: 3000
      });
      await toast.present();
    });
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  gotoSignup(){
    this.router.navigate(["/signup"]);
  }

}
