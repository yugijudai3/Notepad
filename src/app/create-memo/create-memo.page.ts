import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { NgModule } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Component({
    selector: 'app-create-memo',
    templateUrl: './create-memo.page.html',
    styleUrls: ['./create-memo.page.scss'],
})

export class CreateMemoPage implements OnInit {

    message: string;
    post: Post;
    posts: Post[];
    Text = {} as Text;

    constructor(
        private element: ElementRef,
        private router: Router,
        private toastCtrl: ToastController
    ) { }

  ngOnInit() {
    }

    // テキストエリアのheightを自動で変更する
    @HostListener('document:keydown.enter', ['$event'])
    onKeydownHandler(evt: KeyboardEvent) {
        this.textChange();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        this.textChange();
    }

    textChange(): void {
        const textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
        textArea.style.overflow = 'hidden';
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';

    }

    // ホームに戻る
    cancel() {
        this.router.navigate(['/home']);
    }
}
