import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { NgModule } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { async } from 'q';

@Component({
    selector: 'app-create-memo',
    templateUrl: './create-memo.page.html',
    styleUrls: ['./create-memo.page.scss'],
})

export class CreateMemoPage implements OnInit {

    message: string;
    post: Post;
    posts: Post[];
    theme: string;

    postscollection: AngularFirestoreCollection<Post>;

    constructor(
        private element: ElementRef,
        private router: Router,
        private afStore: AngularFirestore,
        private afAuth: AngularFireAuth,
        private toastCtrl: ToastController,
        private ElementRef: ElementRef
    ) {}

  ngOnInit() {
    this.theme = "primary";
    this.getPosts();
    }

    // ホームに戻る
    cancel() {
        this.afStore.firestore.enableNetwork();
        this.router.navigate(['/tabs']);
    }

    addPost(){

      this.post ={
        id: "",
        userName: this.afAuth.auth.currentUser.displayName,
        message: this.message,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        readUser: [],
        theme: this.theme
      };
      console.log(this.message);

      //ここでFirestoreにデータを追加する
      this.afStore.collection("posts").add(this.post).then(docRef => {
        //一度投稿を追加した後に、idを更新する
        this.postscollection.doc(docRef.id).update({
          id: docRef.id
        });

        //追加できたら入力フィールドを空にする
        this.message = "";
      }).catch(async error =>{
        console.log(error);
        //エラーをToastControllerで表示
        const toast = await this.toastCtrl.create({
          message: error.toString(),
          duration: 1000
        });
        await toast.present();
      });
        this.router.navigate(['/tabs']);
    }

    changeColor(ev: any){
      this.theme = ev.target.attributes.color.value;
      console.log(this.theme);
    }

    getPosts(){
      this.postscollection = this.afStore.collection("posts", ref => ref.orderBy("created", "desc"));

      this.postscollection.valueChanges().subscribe(data => {
          this.posts = data;
      });
  }
}
