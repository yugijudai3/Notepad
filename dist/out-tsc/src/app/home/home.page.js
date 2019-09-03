import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
var routes = [];
var HomePage = /** @class */ (function () {
    function HomePage(afStore, afAuth, alertCtrl, toastCtrl, element, router, actionSheet) {
        this.afStore = afStore;
        this.afAuth = afAuth;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.element = element;
        this.router = router;
        this.actionSheet = actionSheet;
    }
    HomePage.prototype.ngOnInit = function () {
        this.afStore.firestore.enableNetwork();
        this.getPosts();
        this.router.navigate(['/tabs']);
    };
    //投稿ページへ
    HomePage.prototype.createMemo = function () {
        this.router.navigate(['/create-memo']);
    };
    HomePage.prototype.home = function () {
        this.router.navigate(['/home']);
        console.log("aaaa");
    };
    HomePage.prototype.album = function () {
        this.router.navigate(['/album']);
    };
    //ログインページへ
    HomePage.prototype.gotoLogin = function () {
        this.router.navigateByUrl('/login');
    };
    //投稿をデータベースから取得
    HomePage.prototype.getPosts = function () {
        var _this = this;
        this.postscollection = this.afStore.collection("posts", function (ref) { return ref.orderBy("created", "desc"); });
        this.postscollection.valueChanges().subscribe(function (data) {
            _this.posts = data;
        });
    };
    //投稿を削除
    HomePage.prototype.deletePost = function (post) {
        var _this = this;
        this.postscollection = this.afStore.collection("posts", function (ref) { return ref.orderBy("created", "desc"); });
        this.postscollection.doc(post.id).delete().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: "投稿を削除しました",
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
    };
    //既読
    HomePage.prototype.readUser = function (post) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.postscollection = this.afStore.collection("posts", function (ref) { return ref.orderBy("created", "desc"); });
                this.postscollection.doc(post.id).valueChanges().subscribe(function (data) {
                    _this.array = data["readUser"];
                    _this.Readuser = _this.array.join("\n");
                    console.log(_this.Readuser);
                    _this.kidokuAlert(post);
                });
                return [2 /*return*/];
            });
        });
    };
    // アラート表示
    HomePage.prototype.kidokuAlert = function (post) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: "既読",
                            message: this.Readuser,
                            buttons: [
                                {
                                    text: "既読",
                                    handler: function () {
                                        _this.postscollection.doc(post.id).update({
                                            readUser: firebase.firestore.FieldValue.arrayUnion(_this.afAuth.auth.currentUser.displayName)
                                        });
                                        alert.dismiss();
                                    }
                                },
                                {
                                    text: "閉じる",
                                    role: "cancel"
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //ログアウト処理
    HomePage.prototype.logout = function () {
        var _this = this;
        this.afStore.firestore.disableNetwork();
        this.afAuth.auth.signOut().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: "ログアウトしました",
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        this.router.navigate(["/login"]);
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
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AngularFirestore,
            AngularFireAuth,
            AlertController,
            ToastController,
            ElementRef,
            Router,
            ActionSheetController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map