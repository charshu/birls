import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forEach } from "lodash";
import { PrismicService } from "../prismic";
import { InstagramService } from "../shared/InstagramServices"
import { Context } from "../prismic/context";
let PrismicDOM = require("prismic-dom");

// declare var instgrm: any;
// import "~assets/lib/embeds.js";
@Component({
  selector: "myarticle",
  styleUrls: ["./article.component.scss"],
  templateUrl: "./article.component.html",
})


export class ArticleComponent implements OnInit, OnDestroy {
  private sub : any;
  public article;
  public PrismicDOM: any;
  private ctx: Context;
  public isArticleExist: boolean = false;
  public docSimilar: any;
  private loaded: boolean = false;
  public page_url: string;
  public disqusShortname = "birlmag";
  public fbInner = `<div class="circle facebook"><i class="fa fa-facebook" aria-hidden="true"></i></div>`;
  public twitterInner = `<div class="circle twitter"> <i class="fa fa-twitter" aria-hidden="true"></i></div>`;
  public googleInner = `<div class="circle googlePlus"><i class="fa fa-google-plus" aria-hidden="true"></i></div>`;
  public pintInner = `<div class="circle pinterest"><i class="fa fa-pinterest" aria-hidden="true"></i></div>`;
  public inInner = `<div class="circle linkin"><i class="fa fa-linkedin" aria-hidden="true"></i></div>`;
  public tumblrInner = `<div class="circle tumblr"><i class="fa fa-tumblr" aria-hidden="true"></i></div>`;
  public test;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
    private instagramService: InstagramService,
  ) {
    this.PrismicDOM = PrismicDOM;
  }

  async ngOnInit() {
    this.ctx = await this.prismicService.buildContext();
    this.sub = this.route.params.subscribe((params) => this.LoadingArticle(params));
  }

  redirect(url) {
    console.log("redirect" + url);
    window.open(url, "_blank");
  }
  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  capitalizeFirstLetter(str) {
    if (str !== undefined && str !== null) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  }

  public totalShare: number = 0;
  sumCounts(count) {
    this.totalShare += count;
  }

  async LoadingArticle(params) {
      document.body.scrollTop = 0;
      this.page_url = window.location.href;
      // load article by uid
      let response = await this.ctx.api.getByUID("article", params["uid"],
      {
        fetchLinks: ["my.article.link", "category.menu", "my.article.author", "author.name", "author.profile_image"],
      });
      console.log(response);
      this.article = response;
      // similar articles
      // response = await this.ctx.api.query([
      //   this.ctx.Prismic.Predicates.similar(response.id, 3),
      //   this.ctx.Prismic.Predicates.at("document.type", "article"),
      // ],
      //   {
      //     orderings: "[my.article.date desc]",
      //     fetchLinks: "category.name",
      //     pageSize: 3,
      //   });
      // this.docSimilar = response.results;
      this.loaded = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

