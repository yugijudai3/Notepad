import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
var CreateMemoPage = /** @class */ (function () {
    function CreateMemoPage(element, router, afStore, afAuth, toastCtrl) {
        this.element = element;
        this.router = router;
        this.afStore = afStore;
        this.afAuth = afAuth;
        this.toastCtrl = toastCtrl;
    }
    CreateMemoPage.prototype.ngOnInit = function () {
        this.theme = "primary";
        this.getPosts();
    };
    // ホームに戻る
    CreateMemoPage.prototype.cancel = function () {
        this.afStore.firestore.enableNetwork();
        this.router.navigate(['/home']);
    };
    CreateMemoPage.prototype.addPost = function () {
        var _this = this;
        this.postscollection = this.afStore.collection("posts", function (ref) { return ref.orderBy("created", "desc"); });
        this.post = {
            id: "",
            userName: this.afAuth.auth.currentUser.displayName,
            message: this.message,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            readUser: [],
            theme: this.theme
        };
        //ここでFirestoreにデータを追加する
        this.afStore.collection("posts").add(this.post).then(function (docRef) {
            //一度投稿を追加した後に、idを更新する
            _this.postscollection.doc(docRef.id).update({
                id: docRef.id
            });
            //追加できたら入力フィールドを空にする
            _this.message = "";
        }).catch(function (error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(error);
                        return [4 /*yield*/, this.toastCtrl.create({
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
        this.router.navigate(['/home']);
    };
    CreateMemoPage.prototype.changeColor = function (ev) {
        this.theme = ev.target.attributes.color.value;
        console.log(this.theme);
    };
    CreateMemoPage.prototype.getPosts = function () {
        var _this = this;
        this.postscollection = this.afStore.collection("posts", function (ref) { return ref.orderBy("created", "desc"); });
        this.postscollection.valueChanges().subscribe(function (data) {
            _this.posts = data;
        });
    };
    CreateMemoPage = tslib_1.__decorate([
        Component({
            selector: 'app-create-memo',
            templateUrl: './create-memo.page.html',
            styleUrls: ['./create-memo.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            Router,
            AngularFirestore,
            AngularFireAuth,
            ToastController])
    ], CreateMemoPage);
    return CreateMemoPage;
}());
export { CreateMemoPage };
//# sourceMappingURL=create-memo.page.js.map