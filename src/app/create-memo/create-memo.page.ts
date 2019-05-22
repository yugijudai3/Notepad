import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { NgModule } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { FirebaseModule } from '../firebase/firebase.module';

@Component({
  selector: 'app-create-memo',
  templateUrl: './create-memo.page.html',
  styleUrls: ['./create-memo.page.scss'],
})

@NgModule({
  imports: [AngularFirestore,
    AngularFirestoreCollection,
    AngularFireAuth,
    FirebaseModule]
})

export class CreateMemoPage implements OnInit {

  message: string;
  post: Post;
  posts: Post[];

  postscollection: AngularFirestoreCollection<Post>;

  constructor(
    private element: ElementRef,
    private router: Router,
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private toastCtrl: ToastController,

  ) { }

  ngOnInit() {
  }
  
  //テキストエリアのheightを自動で変更する
  @HostListener('document:keydown.enter', ['$event']) 
  onKeydownHandler(evt: KeyboardEvent) {
  this.textChange()
  }
   Text = {} as Text;

   ngAfterViewInit(){
   this.textChange()
   }

  textChange():void{
    const textArea = this.element.nativeElement.getElementsByTagName("textarea")[0];
    textArea.style.overflow = "hidden";
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';

    
  }

  addPost(){
    this.post = {
      id: "",
      userName: this.afAuth.auth.currentUser.displayName,
      message: this.message,
      created: firebase.firestore.FieldValue.serverTimestamp
    };

    //Firebaseにデータを追加
    this.afStore.collection("posts").add(this.post).then(docRef => {
      //一度投稿を追加した後に、idを追加する
      this.postscollection.doc(docRef.id).update({
        id: docRef.id
      });
      //追加できたら入力フィールドを空にする
      this.message = "";
    }).catch(async error => {
      //エラーをToastで表示
      const toast = await this.toastCtrl.create({
        message: error.toString(),
      });
      await toast.present();
    });
  }

  //ホームに戻る
  cancel(){
    this.router.navigate(["/home"]);
  }
}
