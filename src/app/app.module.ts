import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    // tslint:disable-next-line:max-line-length
    imports: [BrowserModule,
              IonicModule,
              IonicModule.forRoot(),
              AppRoutingModule,
              AngularFireModule.initializeApp(environment.firebase),
              AngularFirestoreModule,
              AngularFireAuthModule,
              AngularFireStorageModule],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        File,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
