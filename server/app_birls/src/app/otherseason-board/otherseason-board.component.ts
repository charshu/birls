import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PrismicService } from "../prismic";


@Component({
  templateUrl: "./otherseason-board.component.html",
  styleUrls: ["./otherseason-board.component.scss"],
})
export class OtherSeasonComponent implements OnInit {
public ctx: any;
public document: any;
public sameBrandDocuments: any[];
  brand: any;
  showDate: boolean = false;
  private sub: any;
  card_per_page = 12;
  uid: boolean;
  loaded: boolean = false;

 capitalizeFirstLetter(str) {
    if (str !== undefined) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "error";
  }

  more() {
    this.card_per_page += 3;
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
  ) { }

  async ngOnInit() {
    document.body.scrollTop = 0;
    this.loaded = false;
    this.ctx = await this.prismicService.buildContext();
    this.sub = this.route.parent.params.subscribe(async (params) => {
      const uid = params["uid"];
      this.uid = uid;
      // console.log(uid);
      this.document = await this.ctx.api.getByUID("collection", uid, { "fetchLinks": "brand.name" });
      console.log(this.document);
      this.sameBrandDocuments = (await this.ctx.api.query([
        this.ctx.Prismic.Predicates.at("document.type", "collection"),
        this.ctx.Prismic.Predicates.at("my.collection.brand", this.document.data.brand.id),
      ],
        { orderings: "[my.collection.brand desc]", "fetchLinks": ["brand.name", "season.name"]  })).results;
      console.log(this.sameBrandDocuments);
      this.loaded = true;
    });
  }
}