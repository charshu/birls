import {Component, Inject} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PrismicService} from "../prismic";

@Component({
    selector: "nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.scss"],
})

export class NavBarComponent {
    private sub: any;
    focus: boolean;
    active: boolean;
    tabs = [
        {
            label: "Fashion",
            link: "fashion/all",
            groups: [
                // {
                //     title: 'Mood board',
                //     style: 1,
                //     items: [
                //         {
                //             img: '~assets/img/menu/all.jpg',
                //             desc: 'All Fashion',
                //             url: 'fashion/all',
                //             active: false
                //         }
                //     ]
                // }, {
                //     title: 'By Category',
                //     style: 2,
                //     items: [
                //         {
                //             img: '~assets/img/menu/shopping.jpg',
                //             desc: 'Shopping',
                //             url: 'fashion/shopping',
                //             active: false
                //         }, {
                //             img: '~assets/img/menu/trends.jpg',
                //             desc: 'Trends',
                //             url: 'fashion/trends',
                //             active: false
                //         }, {
                //             img: '~assets/img/menu/style.jpg',
                //             desc: 'How to',
                //             url: 'fashion/how-to',
                //             active: false
                //         }, {
                //             img: '~assets/img/menu/editorial.jpg',
                //             desc: 'Editorial',
                //             url: 'fashion/editorial',
                //             active: false
                //         }
                //     ]
                // }
            ],
            active: false,
        }, {
            label: "Beauty",
            link: "beauty/all",
            groups: [
                // {
                //     title: 'Mood board',
                //     style: 1,
                //     items: [
                //         {
                //             img: '~assets/img/menu/all-beauty.jpg',
                //             desc: 'All Beauty',
                //             url: 'beauty/all',
                //             active: false
                //         }
                //     ]
                // }, {
                //     title: 'By Category',
                //     style: 2,
                //     items: [
                //         {
                //             img: '~assets/img/menu/makeup.jpeg',
                //             desc: 'Make Up',
                //             url: 'beauty/make-up',
                //             active: false
                //         }, {
                //             img: '~assets/img/menu/skincare.jpeg',
                //             desc: 'Skin Care',
                //             url: 'beauty/skin-care',
                //             active: false
                //         }, {
                //             img: '~assets/img/menu/skincare.jpeg',
                //             desc: 'Beauty Tips',
                //             url: 'beauty/beauty-tips',
                //             active: false
                //         }, {
                //             img: '~assets/img/menu/skincare.jpeg',
                //             desc: 'Hair & Nail',
                //             url: 'beauty/hair-and-nail',
                //             active: false
                //         }
                //     ]
                // }

            ],

            active: false,
        }, {
            label: "Talent",
            link: "talent/all",
            groups: [
                // {
                //     title: '',
                //     style: 3,
                //     items: [
                //         {
                //             img: '~assets/img/menu/diary.jpg',
                //             desc: '@Kristabirlslikesagirls',
                //             url: 'talent/kristabirlslikesagirls',
                //             active: false
                //         },
                //         {
                //             img: '~assets/img/menu/crew.jpg',
                //             desc: 'Crew',
                //             url: 'talent/crew',
                //             active: false
                //         }
                //     ]
                // }
            ],
            active: false,
        }, {
            label: "Life Style",
            link: "life-style/all",
            groups: [
                // {
                //     title: 'Mood board',
                //     style: 1,
                //     items: [
                //         {
                //             img: '~assets/img/menu/all.jpg',
                //             desc: 'All Life Style',
                //             url: 'life-style/all',
                //             active: false
                //         }
                //     ]
                // },{
                //     title: 'By Category',
                //     style: 2,
                //     items: [
                //         {
                //             img: '~assets/img/menu/diary.jpg',
                //             desc: 'Travel',
                //             url: 'life-style/travel',
                //             active: false
                //         },
                //         {
                //             img: '~assets/img/menu/crew.jpg',
                //             desc: 'Do',
                //             url: 'life-style/do',
                //             active: false
                //         },
                //         {
                //             img: '~assets/img/menu/crew.jpg',
                //             desc: 'Listen',
                //             url: 'life-style/listen',
                //             active: false
                //         },
                //         {
                //             img: '~assets/img/menu/crew.jpg',
                //             desc: 'See',
                //             url: 'life-style/see',
                //             active: false
                //         }
                //     ]
                // }
            ],
            active: false,
        }, {
            label: "Runway",
            link: "runway",

            groups: [],
            active: false,
        }, {
            label: "TV",
            link: "",

            groups: [],
            active: false,
        }, {
            label: "<i class=\"fa fa-shopping-bag\" aria-hidden=\"true\"></i> Shop",
            link: "",

            groups: [],
            active: false,
        },
    ];
    lastIndex: number = -1;
    backdrop: boolean = false;
    setActive(i: number) {
        // console.log('mouseenter last' + this.lastIndex);
        if (this.lastIndex === i) {
            return;
        }
        if (this.lastIndex !== -1) {
            this.tabs[this.lastIndex].active = false;
        } else {
            // when mouse enter close all opening tabs before pop new tab
            for (let i: number = 0; i < (this.tabs).length; i++) {
                this.tabs[i].active = false;
            }
        }
        this.lastIndex = i;
        this.tabs[i].active = true;
        // turn on backdrop only dropdown menu has links
        if (this.tabs[i].groups.length > 0) {
            this.backdrop = true;
        } else {
            this.backdrop = false;
        }

        // console.log('mouseenter current' + this.lastIndex);
    }

    isActive(i: number) {
        return this.tabs[i].active;
    }
    closeAll() {
        //  console.log('mouseleave current' + this.lastIndex);
        this.lastIndex = -1;

        setTimeout(() => {
            if (this.lastIndex === -1) {
                for (let i: number = 0; i < (this.tabs).length; i++) {
                    this.tabs[i].active = false;
                }
                this.backdrop = false;
            }

        }, 200);

    }

    constructor(private route: ActivatedRoute,
         private router: Router,
          private prismicService: PrismicService,
        ) {

        this.sub = this.route.params.subscribe( (params) => {
                //    this.loaded = false;     prismicService.buildContext().api.then((api) =>
                // api.query([Prismic.Predicates.at('document.category', 'article'),
                // Prismic.Predicates.at('my.article.link', categoryID)], { orderings:
                // '[my.article.date desc]','fetchLinks': 'category.name' })).then((response) =>
                // {         this.documents = response.results;         this.queryTitle =
                // this.category;         this.loaded = true;       });

            });
    }

}