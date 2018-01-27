webpackHotUpdateac__name_(0,{

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prismic_prismic_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_InstagramServices__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_EmailServices__ = __webpack_require__(242);





var HomeComponent = (function () {
    function HomeComponent(prismicService, instagramService, emailServices) {
        this.prismicService = prismicService;
        this.instagramService = instagramService;
        this.emailServices = emailServices;
        this.slider_docs = [];
        this.fashion_docs = [];
        this.fashion_loaded = false;
        this.beauty_docs = [];
        this.life_styles_docs = [];
        this.makeUp_docs = [];
        this.skinCare_docs = [];
        this.beautyTips_docs = [];
        this.hairAndNail_docs = [];
        this.talent_docs = [];
        this.collection_docs = [];
        this.current_slide = 0;
        this.igImageLimit = undefined;
        this.video = {
            ss: "~assets/img/vid/vid1.jpg",
            url: "https://www.youtube.com/watch?v=kmDMqzhvNLk",
        };
    }
    HomeComponent.prototype.redirect = function (url) {
        console.log("redirect" + url);
        window.open(url, "_blank");
    };
    HomeComponent.prototype.onResize = function (event) {
        this.igImageLimit = this.calculateImageLimit(event.target.innerWidth, 100, 20);
    };
    HomeComponent.prototype.emailSubscribe = function (formValue) {
        console.log(formValue);
        this.emailServices.emailSubscribe(formValue.email);
    };
    HomeComponent.prototype.calculateImageLimit = function (windowWidth, imageWidth, gutter) {
        // row padding-left = 15, row padding-right = 15
        var n = (windowWidth - (2 * 15) + 20) / (imageWidth + gutter);
        console.log(n);
        return n;
    };
    HomeComponent.prototype.ngOnInit = function () {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function () {
            var _this = this;
            var _a, response;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["d" /* __generator */](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.prismicService.buildContext()];
                    case 1:
                        _a.ctx = _b.sent();
                        // ig images
                        this.instagramService.getPictures().subscribe(function (instagramImages) {
                            _this.instagramImages = instagramImages;
                            _this.igImageLimit = _this.calculateImageLimit(window.innerWidth, 100, 20);
                        });
                        return [4 /*yield*/, this.ctx.api.query([this.ctx.Prismic.Predicates.at("document.type", "slider")])];
                    case 2:
                        // slider
                        response = _b.sent();
                        this.slider_docs = response.results;
                        console.log(this.slider_docs[0]);
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at("document.type", "article"),
                                this.ctx.Prismic.Predicates.any("my.article.link", ["WHIp5ikAALg6MBFc", "WKMVdiUAAFBBgJLB", "WHI-uykAAJJWMG0F", "WKMa4SUAADBCgKrr"]),
                            ], {
                                orderings: "[my.article.date desc]",
                                fetchLinks: ["my.article.link", "category.name", "category.menu"],
                                pageSize: 6,
                            })];
                    case 3:
                        // fashionn
                        response = _b.sent();
                        this.fashion_docs = response.results;
                        console.log(this.fashion_docs);
                        this.fashion_loaded = true;
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at("document.type", "article"),
                                this.ctx.Prismic.Predicates.any("my.article.link", ["WKqliyYAAKRkYjfX", "WKqmfSYAAHdmYjwG", "WV0QLyUAAJ4H3eyj", "WV0QEyUAAFYG3ewg", "WKqmfSYAAHdmYjwG"]),
                            ], {
                                orderings: "[my.article.date desc]",
                                fetchLinks: ["my.article.link", "category.name", "category.menu"],
                                pageSize: 1,
                            })];
                    case 4:
                        // beauty and sub categories
                        response = _b.sent();
                        this.beauty_docs = response.results;
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at("document.type", "article"),
                                this.ctx.Prismic.Predicates.any("my.article.link", ["WKqliyYAAKRkYjfX"]),
                            ], {
                                orderings: "[my.article.date desc]",
                                "fetchLinks": ["my.article.link", "category.name", "category.menu"],
                                pageSize: 1,
                            })];
                    case 5:
                        // make-up
                        response = _b.sent();
                        this.makeUp_docs = response.results;
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at('document.type', "article"),
                                this.ctx.Prismic.Predicates.any("my.article.link", ["WKqmfSYAAHdmYjwG"]),
                            ], {
                                orderings: "[my.article.date desc]",
                                fetchLinks: ["my.article.link", "category.name", "category.menu"],
                                pageSize: 1,
                            })];
                    case 6:
                        // skincare
                        response = _b.sent();
                        this.skinCare_docs = response.results;
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at("document.type", "article"),
                                this.ctx.Prismic.Predicates.any("my.article.link", ["WV0QLyUAAJ4H3eyj"]),
                            ], {
                                orderings: "[my.article.date desc]",
                                fetchLinks: ["my.article.link", "category.name", "category.menu"],
                                pageSize: 1,
                            })];
                    case 7:
                        // beauty-tips
                        response = _b.sent();
                        this.beautyTips_docs = response.results;
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at("document.type", "article"),
                                this.ctx.Prismic.Predicates.any("my.article.link", ["WV0QEyUAAFYG3ewg"]),
                            ], {
                                orderings: "[my.article.date desc]",
                                fetchLinks: ["my.article.link", "category.name", "category.menu"],
                                pageSize: 1,
                            })];
                    case 8:
                        // hair-and-nail
                        response = _b.sent();
                        this.hairAndNail_docs = response.results;
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at("document.type", "article"),
                                this.ctx.Prismic.Predicates.any("my.article.link", ["WWHwCScAAHxTSe92", "WWNkoScAAH-YUFZ6"]),
                            ], {
                                orderings: "[my.article.date desc]",
                                fetchLinks: ["my.article.link", "category.name", "category.menu"],
                                pageSize: 4,
                            })];
                    case 9:
                        // talent
                        response = _b.sent();
                        this.talent_docs = response.results;
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at("document.type", "article"),
                                this.ctx.Prismic.Predicates.any("my.article.link", ["WV0FKiUAAFUG3buM", "WV0FXyUAAFYG3bx_", "WV0FfiUAAJ4H3b0P", "WV0I1SUAAFIG3cvo"]),
                            ], {
                                orderings: "[my.article.date desc]",
                                fetchLinks: ["my.article.link", "category.name", "category.menu"],
                                pageSize: 5,
                            })];
                    case 10:
                        // life styles
                        response = _b.sent();
                        this.life_styles_docs = response.results;
                        return [4 /*yield*/, this.ctx.api.query([
                                this.ctx.Prismic.Predicates.at("document.type", "collection"),
                                this.ctx.Prismic.Predicates.has("my.collection.review_title"),
                            ], {
                                orderings: "[my.collection.date desc]",
                                fetchLinks: ['brand.name', 'season.name'],
                                pageSize: 4,
                            })];
                    case 11:
                        // collection
                        response = _b.sent();
                        this.collection_docs = response.results;
                        document.body.scrollTop = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    return HomeComponent;
}());
__WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"])("window:resize", ["$event"]),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["e" /* __metadata */]("design:type", Function),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["e" /* __metadata */]("design:paramtypes", [Object]),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["e" /* __metadata */]("design:returntype", void 0)
], HomeComponent.prototype, "onResize", null);
HomeComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: "home",
        styles: [__webpack_require__(666)],
        template: __webpack_require__(669),
    }),
    __WEBPACK_IMPORTED_MODULE_0_tslib__["e" /* __metadata */]("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__prismic_prismic_service__["a" /* PrismicService */],
        __WEBPACK_IMPORTED_MODULE_3__shared_InstagramServices__["a" /* InstagramService */],
        __WEBPACK_IMPORTED_MODULE_4__shared_EmailServices__["a" /* EmailServices */]])
], HomeComponent);



/***/ })

})
//# sourceMappingURL=0.2832b67c39f478db72ec.hot-update.js.map