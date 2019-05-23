import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { NgModule } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-memo',
  templateUrl: './create-memo.page.html',
  styleUrls: ['./create-memo.page.scss'],
})

export class CreateMemoPage implements OnInit {

  message: string;
  post: Post;
  posts: Post[];

  constructor(
    private element: ElementRef,
    private router: Router,
    private toastCtrl: ToastController
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

 
  //ホームに戻る
  cancel(){
    this.router.navigate(["/app"]);
  }
}
