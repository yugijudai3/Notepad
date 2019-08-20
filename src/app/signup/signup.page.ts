import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    signup: {
        email: string;
        password: string;
        name: string;
    } = {
            email: '',
            password: '',
            name: ''
        };

    constructor(
        private router: Router,
        private toastCtrl: ToastController,
        private afAuth: AngularFireAuth
    ) { }

    ngOnInit() { }

    signUp() {
        this.afAuth.auth.createUserWithEmailAndPassword(this.signup.email, this.signup.password)
            .then(created => {
                const newUser = created.user;

                newUser.updateProfile({
                    displayName: this.signup.name,
                    photoURL: ''
                }).then(async () => {
                    const toast = await this.toastCtrl.create({
                        message: 'ユーザーを登録しました',
                        duration: 3000
                    });
                    console.log(created.user.displayName);
                    await toast.present();
                }).catch(async error => {
                    const toast = await this.toastCtrl.create({
                        message: error.toString(),
                        duration: 3000
                    });
                    await toast.present();
                });
                this.goBack();
            }).catch(async error => {
                const toast = await this.toastCtrl.create({
                    message: error.toString(),
                    duration: 3000
                });
                await toast.present();
            });
    }
    goBack() {
        this.router.navigate(['/login']);
    }
}
