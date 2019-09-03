import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  constructor(
    private router: Router,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    console.log(this.afStorage)
  }

      //ログインページへ
      gotoLogin(){
        this.router.navigateByUrl('/login');
    }
 


}
