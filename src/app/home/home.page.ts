import { Component, ElementRef, Directive, HostListener } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { sanitizeHtml } from '@angular/core/src/sanitization/sanitization';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { async } from 'q';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    message: string;
    post: Post;
    posts: Post[];
  
    postscollection: AngularFirestoreCollection<Post>;


    constructor(
        private afStore: AngularFirestore,
        private afAuth: AngularFireAuth,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private element: ElementRef,
        private router: Router
    ){}

    ngOnInit(){
        this.afStore.firestore.enableNetwork();
        this.getPosts();
    }

    getPosts(){
        this.postscollection = this.afStore.collection("posts", ref => ref.orderBy("created", "desc"));

        this.postscollection.valueChanges().subscribe(data => {
            this.posts = data;
        });
    }

    createMemo(){
        this.router.navigate(["/create-memo"]);
    }

    gotoLogin(){
        this.router.navigateByUrl('/login');
    }

    deletePost(post: Post){
        this.postscollection.doc(post.id).delete().then(async() => {
            const toast = await this.toastCtrl.create({
                message: "投稿を削除しました",
                duration: 3000
            });
            await toast.present();
        }).catch(async error => {
            const toast = await this.toastCtrl.create({
                message: error.toString(),
                duration: 3000
            });
            await toast.present();
        });
    }

    //ログアウト処理
    logout(){
        this.afStore.firestore.disableNetwork();
        this.afAuth.auth.signOut().then(async() => {
        const toast = await this.toastCtrl.create({
            message: "ログアウトしました",
            duration: 3000
        });
        await toast.present();
        this.router.navigate(["/login"]);
        }).catch(async error => {
        const toast = await this.toastCtrl.create({
            message: error.toString(),
            duration: 3000
        });
        await toast.present();
        });
    }
}
