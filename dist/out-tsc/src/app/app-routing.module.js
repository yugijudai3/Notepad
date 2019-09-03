import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'create-memo', loadChildren: './create-memo/create-memo.module#CreateMemoPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
    { path: 'album', loadChildren: './album/album.module#AlbumPageModule' },
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map