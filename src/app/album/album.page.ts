import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { storage } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera/ngx';
import { AlbumPageModule } from './album.module';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  files;
  captureDataUrl: string;
  dataUrl: string;

  constructor(
    private router: Router,
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private file: File,
    private camera: Camera,
    
  ) { }

  ngOnInit() {
    console.log(firebase.storage().ref("pictures").fullPath);
  }

    //ログインページへ
    gotoLogin(){
        this.router.navigateByUrl('/login');
    }
 
  // 画像をアップロード
    upload(){
      let sRef = firebase.storage().ref();
      const filename = Math.floor(Date.now() / 1000);
      const imageRef = sRef.child("images/" + filename + ".jpg");

      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
        console.log("uploaded");
      });
      
  }

  takePicture(){
  
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((iData) =>{
      this.captureDataUrl = "data:image/jpeg;base64," + iData;
    },(err) => {
      console.log(err);
    });
    }

}
