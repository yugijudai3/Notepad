import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPageModule } from './login.module';
import { Storage } from '@ionic/storage';

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
    private storage: Storage
  ){}

  ngOnInit() {
    this.storage.get("auth").then((val) =>{
      if(val == null){
        this.router.navigate(["/home"]);
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
      this.storage.set("auth", true);
      this.router.navigate(["/home"]);
    })
    .catch(async error => {
      const toast = await this.toastCtrl.create({
        message: error.toString(),
        duration: 3000
      });
      await toast.present();
    });
  }

  gotoSignup(){
    this.router.navigate(["/signup"]);
    this.storage.remove("auth");
  }

}
