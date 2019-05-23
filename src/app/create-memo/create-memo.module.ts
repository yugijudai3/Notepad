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
    RouterModule.forChild([{path: "", component: CreateMemoPage, redirectTo: "./create-memo.page"}]),
  ],
  declarations: [CreateMemoPage]
})

export class CreateMemoPageModule {}
