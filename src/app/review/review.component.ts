import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PrismicService } from "./../prismic";
const PrismicDOM = require("prismic-dom");

@Component({
  selector: "review",
  styleUrls: ["./../article/article.component.scss"],
  templateUrl: "./../article/article.component.html",
})


export class ReviewComponent implements OnInit, OnDestroy {
  public ctx: any;
  private uid: string;
  private api: any;
  private sub: any;
  private article: any;
  private loaded: boolean = false;
  public PrismicDOM: any;
  page_url: string;
  private disqusShortname = "birlmag";
  fbInner = `<div class=\"circle facebook\">
                <i class=\"fa fa-facebook\" aria-hidden=\"true\"></i>
              </div>`;
  twitterInner = `<div class="circle twitter">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                   </div>`;
  googleInner = `<div class="circle googlePlus">
                    <i class="fa fa-google-plus" aria-hidden="true"></i>
                </div>`;
  pintInner = `<div class="circle pinterest">
                    <i class="fa fa-pinterest" aria-hidden="true"></i>
                </div>`;
  inInner = `<div class="circle linkin">
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                </div>`;
  tumblrInner = `<div class="circle tumblr">
                    <i class="fa fa-tumblr" aria-hidden="true"></i>
                </div>`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
  ) {
    this.PrismicDOM = PrismicDOM;
  }

  async ngOnInit() {
    document.body.scrollTop = 0;
    this.ctx = await this.prismicService.buildContext();
    this.sub = this.route.parent.params.subscribe(async (params) => {
      this.page_url = window.location.href;
      let response = await this.ctx.api.getByUID("collection", params["uid"],
      {
        fetchLinks: [ "my.collection.author", "author.name", "author.profile_image"],
      });
      this.article = response;
      console.log(this.article);
      this.loaded = true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  capitalizeFirstLetter(str) {
    if (str !== undefined) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "error";
  }

  public totalShare: number = 0;
  sumCounts(count) {
    this.totalShare += count;
  }

}

