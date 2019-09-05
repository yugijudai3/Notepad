import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  files;
  constructor(
    private router: Router,
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private file: File,
    private transfer: FileTransfer,
    private camera: Camera,
  ) { }

  ngOnInit() {
  }

    //ログインページへ
    gotoLogin(){
        this.router.navigateByUrl('/login');
    }
 
  // 画像をアップロード
    upload(image64){
      return new Promise<any>((resolve, reject) => {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child('images');
        imageRef.putString(image64, 'data_url')
          .then(
            snapshot => {
              imageRef.getDownloadURL().then(url => {
                resolve(url);
              });
            }
          )
      });
  }
  
  // 
  uploadFileImg(file){
    let userName = file.name;
    let storageRef = firebase.storage().ref(userName);
    storageRef.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }

  changeFile() {
    if (this.files.length > 0) {
      // 選択されたファイル情報を取得
      console.log(this.files.length);
      for(let i=0;i<this.files.length; i++){
        const file = this.files[i];
        // readerで、データURLとしてエンコード(BLOB)したファイルデータを作成(不要)
        //const reader = new FileReader();
        //reader.readAsDataURL(file);
        //ここまで不要。まったくHTML5のFileAPI使ってません！
          const userName = file.name;
          const storageRef = firebase.storage().ref().child('images');
          storageRef.put(file).then((snapshot)=> {
            console.log('Uploaded a blob or file!');
          });
      }}
  }

  takePicture(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
  // imageData is either a base64 encoded string or a file URI
  // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.upload(base64Image);
  }, (err) => {
  // Handle error
  });
    }
}
