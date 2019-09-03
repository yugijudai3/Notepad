import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlbumPage } from './album.page';
var routes = [
    {
        path: '',
        component: AlbumPage
    }
];
var AlbumPageModule = /** @class */ (function () {
    function AlbumPageModule() {
    }
    AlbumPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AlbumPage]
        })
    ], AlbumPageModule);
    return AlbumPageModule;
}());
export { AlbumPageModule };
//# sourceMappingURL=album.module.js.map