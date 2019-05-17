import { Component } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';
import { sanitizeHtml } from '@angular/core/src/sanitization/sanitization';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Post } from '../models/post';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ){}

  post: {
    message: string
  }[]=[{
    message: "〇〇君へ折り返しの電話"
  },{
    message: "来週の打ち合わせ"
  }];

  async presentPrompt(post: Post){
    const alert = await this.alertCtrl
  }
}
