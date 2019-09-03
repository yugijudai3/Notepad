import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
var LoginPage = /** @class */ (function () {
    function LoginPage(router, toastCtrl, afAuth) {
        this.router = router;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.login = {
            email: "",
            password: ""
        };
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.router.navigate(["/tabs"]);
            }
        });
    };
    LoginPage.prototype.userLogin = function () {
        var _this = this;
        this.afAuth.auth.signInWithEmailAndPassword(this.login.email, this.login.password)
            .then(function (user) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: "ログインしました",
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        this.router.navigate(["/tabs"]);
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: error.toString(),
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    };
    LoginPage.prototype.gotoSignup = function () {
        this.router.navigate(["/signup"]);
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ToastController,
            AngularFireAuth])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map