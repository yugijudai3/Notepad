import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateMemoPage } from './create-memo.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    RouterModule.forChild([{path: "./create-memo/create-memo.module#CreateMemoPageModule", component: CreateMemoPage}]),
=======
    RouterModule.forChild([{path: "", component: CreateMemoPage, redirectTo: "./create-memo.page"}]),
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFireAuth,
    CreateMemoPage
>>>>>>> b1432460e391e61bae3c59033b45d4e285c5d758
  ],
  declarations: [CreateMemoPage]
})

export class CreateMemoPageModule {}
