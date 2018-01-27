import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PrismicService } from "../prismic";


@Component({
  selector: "collection",
  styleUrls: ["./collection.component.scss"],
  templateUrl: "./collection.component.html",
})
export class CollectionComponent implements OnInit, AfterViewInit, OnDestroy {



  @Input() uid: string;
  private ctx: any;
  private sub: any;
  private document: any;
  private loaded: boolean = false;
  date: any;
  brand: any;
  season: any;


  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
  ) { }

  async ngOnInit() {
    // get last word in route path
    document.body.scrollTop = 0;
    this.ctx = await this.prismicService.buildContext();
    this.sub = this.route.params.subscribe(async (params) => {
      const uid = params["uid"];
      let response = await this.ctx.api.getByUID("collection", uid, { "fetchLinks": ["brand.name", "season.name"] });
      this.document = response;
      console.log(this.document);
      this.loaded = true;
    });
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
