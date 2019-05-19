import { Component, ElementRef, Directive, HostListener } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';
import { sanitizeHtml } from '@angular/core/src/sanitization/sanitization';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Post } from '../models/post';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { async } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private element: ElementRef
  ){}

  posts: {userName: string; message: string; createdDate: any}[]

  post: {
    message: string
  }[]=[{
    message: "〇〇君へ折り返しの電話"
  },{
    message: "来週の打ち合わせ"
  }];

  async presentPrompt(post: Post){
    const alert = await this.alertCtrl.create({
      header: "メモを作成",
      inputs:[{
        name: "message",
        type: "text",
        placeholder: "メッセージ"
      }],
      buttons:[{
        text: "投稿",
        handler: data => {
          console.log(this.post);
          this.post.push(data);
        }
      },
      {
        text: "閉じる",
        role: "cancel"
      }]
    });
    await alert.present();
  }

  async deleteText(){
    const alert = await this.alertCtrl.create({
      header: "メモを削除",
      buttons:[{
        text: "削除",
      },{
        text: "閉じる",
        role: "cancel"
      }]
    });
    await alert.present();
  }

  async alreadyRead(){
    const alert = await this.alertCtrl.create({
      header: "既読ユーザー",
      message: "校長",
      buttons:[{
        text: "既読"
      },
      {
        text: "閉じる",
        role: "cancel"
      }]
    });
    await alert.present();
  }

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
}
