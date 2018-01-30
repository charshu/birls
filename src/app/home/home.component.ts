import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { PrismicService } from "../prismic/prismic-service";
import { InstagramService } from "../shared/InstagramServices";
import { EmailServices } from "../shared/EmailServices";
import { InstagramImage } from "../shared/type.d";
import ScrollSpyService from "ng2-scrollspy";

@Component({
  selector: "home",
  styleUrls: ["./home.component.scss"],
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  public ctx: any;
  public slider_docs: any = [];
  public fashion_docs: any = [];
  public fashion_loaded: boolean = false;
  public beauty_docs: any = [];
  public life_styles_docs: any = [];
  public makeUp_docs: any = [];
  public skinCare_docs: any = [];
  public beautyTips_docs: any = [];
  public hairAndNail_docs: any = [];
  public talent_docs: any = [];
  public collection_docs: any = [];
  public instagramImages: InstagramImage[];

  public defaultImage = 'assets/img/animat-pencil-color.gif';
  public image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  public errorImage = 'assets/svg/birls.svg';
  public offset = 100;
  
  current_slide: number = 0;
  igImageLimit: number = undefined;
  video = {
    ss: "~assets/img/vid/vid1.jpg",
    url: "https://www.youtube.com/watch?v=kmDMqzhvNLk"
  };

  redirect(url) {
    console.log("redirect" + url);
    window.open(url, "_blank");
  }

  constructor(
    private prismicService: PrismicService,
    private instagramService: InstagramService,
    private emailServices: EmailServices
  ) {}

  @HostListener("window:resize", ["$event"])
  public onResize(event) {
    this.igImageLimit = this.calculateImageLimit(
      event.target.innerWidth,
      100,
      20
    );
  }
  emailSubscribe(formValue) {
    console.log(formValue);
    this.emailServices.emailSubscribe(formValue.email);
  }
  private calculateImageLimit(windowWidth, imageWidth, gutter) {
    // row padding-left = 15, row padding-right = 15
    let n = (windowWidth - 2 * 15 + 20) / (imageWidth + gutter);
    console.log(n);
    return n;
  }

  public async ngOnInit() {
    this.ctx = await this.prismicService.buildContext();
    // ig images
    this.instagramService.getPictures().subscribe(instagramImages => {
      this.instagramImages = instagramImages;
      this.igImageLimit = this.calculateImageLimit(window.innerWidth, 100, 20);
    });

    let response;
    // slider
    response = await this.ctx.api.query([
      this.ctx.Prismic.Predicates.at("document.type", "slider")
    ]);
    this.slider_docs = response.results;
    console.log(this.slider_docs);

    // fashion
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "article"),
        this.ctx.Prismic.Predicates.any("my.article.link", [
          "WHIp5ikAALg6MBFc",
          "WKMVdiUAAFBBgJLB",
          "WHI-uykAAJJWMG0F",
          "WKMa4SUAADBCgKrr"
        ])
      ],
      {
        orderings: "[my.article.date desc]",
        fetchLinks: ["my.article.link", "category.name", "category.menu"],
        pageSize: 6
      }
    );
    this.fashion_docs = response.results;
    console.log(this.fashion_docs);
    this.fashion_loaded = true;

    // beauty and sub categories
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "article"),
        this.ctx.Prismic.Predicates.any("my.article.link", [
          "WKqliyYAAKRkYjfX",
          "WKqmfSYAAHdmYjwG",
          "WV0QLyUAAJ4H3eyj",
          "WV0QEyUAAFYG3ewg",
          "WKqmfSYAAHdmYjwG"
        ])
      ],
      {
        orderings: "[my.article.date desc]",
        fetchLinks: ["my.article.link", "category.name", "category.menu"],
        pageSize: 1
      }
    );
    this.beauty_docs = response.results;

    // make-up
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "article"),
        this.ctx.Prismic.Predicates.any("my.article.link", ["WKqliyYAAKRkYjfX"])
      ],
      {
        orderings: "[my.article.date desc]",
        fetchLinks: ["my.article.link", "category.name", "category.menu"],
        pageSize: 1
      }
    );
    this.makeUp_docs = response.results;

    // skincare
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "article"),
        this.ctx.Prismic.Predicates.any("my.article.link", ["WKqmfSYAAHdmYjwG"])
      ],
      {
        orderings: "[my.article.date desc]",
        fetchLinks: ["my.article.link", "category.name", "category.menu"],
        pageSize: 1
      }
    );
    this.skinCare_docs = response.results;

    // beauty-tips
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "article"),
        this.ctx.Prismic.Predicates.any("my.article.link", ["WV0QLyUAAJ4H3eyj"])
      ],
      {
        orderings: "[my.article.date desc]",
        fetchLinks: ["my.article.link", "category.name", "category.menu"],
        pageSize: 1
      }
    );
    this.beautyTips_docs = response.results;

    // hair-and-nail
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "article"),
        this.ctx.Prismic.Predicates.any("my.article.link", ["WV0QEyUAAFYG3ewg"])
      ],
      {
        orderings: "[my.article.date desc]",
        fetchLinks: ["my.article.link", "category.name", "category.menu"],
        pageSize: 1
      }
    );
    this.hairAndNail_docs = response.results;

    // talent
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "article"),
        this.ctx.Prismic.Predicates.any("my.article.link", [
          "WWHwCScAAHxTSe92",
          "WWNkoScAAH-YUFZ6"
        ])
      ],
      {
        orderings: "[my.article.date desc]",
        fetchLinks: ["my.article.link", "category.name", "category.menu"],
        pageSize: 4
      }
    );
    this.talent_docs = response.results;

    // life styles
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "article"),
        this.ctx.Prismic.Predicates.any("my.article.link", [
          "WV0FKiUAAFUG3buM",
          "WV0FXyUAAFYG3bx_",
          "WV0FfiUAAJ4H3b0P",
          "WV0I1SUAAFIG3cvo"
        ])
      ],
      {
        orderings: "[my.article.date desc]",
        fetchLinks: ["my.article.link", "category.name", "category.menu"],
        pageSize: 5
      }
    );
    this.life_styles_docs = response.results;

    // collection
    response = await this.ctx.api.query(
      [
        this.ctx.Prismic.Predicates.at("document.type", "collection"),
        this.ctx.Prismic.Predicates.has("my.collection.review_title")
      ],
      {
        orderings: "[my.collection.date desc]",
        fetchLinks: ["brand.name", "season.name"],
        pageSize: 4
      }
    );
    this.collection_docs = response.results;
  }
}
