import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateMemoPage } from './create-memo.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMemoPage
  }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CreateMemoPage],
    exports: []
})

export class CreateMemoPageModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CreateMemoPageModule,
            providers: []
        };
    }
}
