import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFirestore,
    AngularFireAuth,
    AngularFirestoreCollection
  ]
})
export class FirebaseModule { }
