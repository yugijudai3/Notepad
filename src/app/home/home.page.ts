import { Component } from '@angular/core';
import { sanitizeHtml } from '@angular/core/src/sanitization/sanitization';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  post: {
    message: string
  }[]=[{
    message: "〇〇君へ折り返しの電話"
  },{
    message: "来週の打ち合わせ"
  }];
}
