import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateMemoPage } from './create-memo.page';
var routes = [
    {
        path: '',
        component: CreateMemoPage
    }
];
var CreateMemoPageModule = /** @class */ (function () {
    function CreateMemoPageModule() {
    }
    CreateMemoPageModule_1 = CreateMemoPageModule;
    CreateMemoPageModule.forRoot = function () {
        return {
            ngModule: CreateMemoPageModule_1,
            providers: []
        };
    };
    var CreateMemoPageModule_1;
    CreateMemoPageModule = CreateMemoPageModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CreateMemoPage],
            exports: []
        })
    ], CreateMemoPageModule);
    return CreateMemoPageModule;
}());
export { CreateMemoPageModule };
//# sourceMappingURL=create-memo.module.js.map