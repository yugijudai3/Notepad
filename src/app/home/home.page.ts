import { Component, ElementRef, Directive, HostListener } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { sanitizeHtml } from '@angular/core/src/sanitization/sanitization';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { Routes } from '@angular/router';
import { async } from 'q';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { Action } from 'rxjs/internal/scheduler/Action';
import { TabsPage } from '../tabs/tabs.page';

const routes: Routes =[]

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    message: string;
    post: Post;
    posts: Post[];
    array: any[];
    Readuser: string;
    
  
    postscollection: AngularFirestoreCollection<Post>;


    constructor(
        private afStore: AngularFirestore,
        private afAuth: AngularFireAuth,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private element: ElementRef,
        private router: Router,
        private actionSheet: ActionSheetController
    ){}

    ngOnInit(){
        this.afStore.firestore.enableNetwork();
        this.getPosts();
        this.router.navigate(['/tabs']);
    }

    
    //投稿ページへ
    createMemo(){
        this.router.navigate(['/create-memo']);
    }

    //ログインページへ
    gotoLogin(){
        this.router.navigateByUrl('/login');
    }

    //投稿をデータベースから取得
    getPosts(){
        this.postscollection = this.afStore.collection("posts", ref => ref.orderBy("created", "desc"));

        this.postscollection.valueChanges().subscribe(data => {
            this.posts = data;
        });
    }

    //投稿を削除
    deletePost(post: Post){
        this.postscollection = this.afStore.collection("posts", ref => ref.orderBy("created", "desc"));

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

    //既読
    async readUser(post: Post){
        this.postscollection = this.afStore.collection("posts", ref => ref.orderBy("created", "desc"));
        
        this.postscollection.doc(post.id).valueChanges().subscribe(data =>{
            this.array = data["readUser"];
            this.Readuser = this.array.join("\n");
            console.log(this.Readuser);
            this.kidokuAlert(post);
        });

    }

    // アラート表示
    async kidokuAlert(post){
        const alert = await this.alertCtrl.create({
                
            header: "既読",
            message: this.Readuser,
            buttons: [
                {
                text: "既読",
                handler: () => {
                    this.postscollection.doc(post.id).update({
                        readUser: firebase.firestore.FieldValue.arrayUnion(this.afAuth.auth.currentUser.displayName)
                    });
                    alert.dismiss();
                }
                },
                {
                text: "閉じる",
                role: "cancel"
                }
            ]
        });
        await alert.present();
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