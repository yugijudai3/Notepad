import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
var SignupPage = /** @class */ (function () {
    function SignupPage(router, toastCtrl, afAuth) {
        this.router = router;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.signup = {
            email: "",
            password: "",
            name: ""
        };
    }
    SignupPage.prototype.ngOnInit = function () { };
    SignupPage.prototype.signUp = function () {
        var _this = this;
        this.afAuth.auth.createUserWithEmailAndPassword(this.signup.email, this.signup.password)
            .then(function (created) {
            var newUser = created.user;
            newUser.updateProfile({
                displayName: _this.signup.name,
                photoURL: ""
            }).then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var toast;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                message: "ユーザーを登録しました",
                                duration: 3000
                            })];
                        case 1:
                            toast = _a.sent();
                            console.log(created.user.displayName);
                            return [4 /*yield*/, toast.present()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).catch(function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
            _this.goBack();
        }).catch(function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
    };
    SignupPage.prototype.goBack = function () {
        this.router.navigate(["/login"]);
    };
    SignupPage = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ToastController,
            AngularFireAuth])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map