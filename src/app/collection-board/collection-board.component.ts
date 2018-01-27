import {AfterViewInit, Component, Inject} from "@angular/core";
import {OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PrismicService} from "../prismic";

@Component({
  templateUrl: "./collection-board.component.html",
  styleUrls: ["./collection-board.component.scss"],
})
export class CollectionBoardComponent implements OnInit {
  public ctx: any;
  public seasons: any;
  public allSeasons: any;
  public brands: any;
  public allBrands: any;
  public loadedSelect: any = false;
  public selected = {
    season: "all",
    brand: "all",
  };
  documents: any[];
  private sub: any;
  public image: any;
  public imageUrl: string = "assets/img/runway.jpg";
  public defaultImage = 'assets/img/animat-pencil-color.gif';
  public errorImage = 'assets/svg/birls.svg';
  public card_per_page = 12;
  public loaded: boolean = false;
  public tag: any;
  // social sharee
  public fbUrl = "https://www.facebook.com/birlsmagazine";
  public twUrl = "https://www.facebook.com/birlsmagazine";

  constructor(
    private route: ActivatedRoute,
     private router: Router,
      private prismicService: PrismicService,
    ) { }

  async ngOnInit() {
    this.loaded = false;
    document.body.scrollTop = 0;
    // query season,brand name
     this.ctx = await this.prismicService.buildContext();
     this.seasons = (await this.ctx.api.query([this.ctx.Prismic.Predicates.at("document.type", "season")], {
      orderings: "[my.season.name desc]",
    })).results;
    console.log(`seasons :` , this.seasons);
    this.brands = (await this.ctx.api.query([this.ctx.Prismic.Predicates.at("document.type", "brand")], {
      orderings: "[my.brand.name desc]",
    })).results;
    console.log(`brands :`, this.brands);
    this.loadedSelect = true;
    this.documents = (await this.ctx.api.query([this.ctx.Prismic.Predicates.at("document.type", "collection")], {
      orderings: "[my.collection.date desc]",
      fetchLinks: ["brand.name", "season.name"],
    })).results;
    console.log(`documents :`, this.documents);
    this.loaded = true;
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  more() {
    this.card_per_page += 3;
  }
  async callSeason(seasonID) {
    console.log(seasonID);
    this.loadedSelect = false;

    if (seasonID === "all") {
      let response = await this.ctx.api.query([
        this.ctx.Prismic.Predicates.at("document.type", "brand"),
        ], {
          orderings: "[my.brand.name desc]",
        });
        this.brands = response.results;
        this.loadedSelect = true;
        // console.log(this.brands);
      this.selected.season = "all";

    } else {
      for (let i = this.brands.length - 1; i >= 0; i--) {
        if (this.brands[i].id !== this.selected.brand) {
          console.log("splice: " + this.brands[i].data.name);
          this.brands.splice(i, 1);
        }
      }
      let response = await this.ctx.api.query([
        this.ctx.Prismic.Predicates.at("document.type",  "collection"),
        this.ctx.Prismic.Predicates.at("my.collection.season", seasonID),
      ], {
        orderings: "[my.collection.brand desc]",
        "fetchLinks": "brand.name",
      });

      let temp = [];
      for (let doc of response.results) {
        let brand = doc.data.brand;
        let brandName = brand.data.name;
        console.log(brandName);
        // dont push duplicating value
        if (temp.indexOf(brandName) < 0 && brand.id !== this.selected.brand) {
          temp.push(brandName);
          this.brands.push(brand);
        }
      }

      this.selected.season = seasonID;
      this.loadedSelect = true;
    }
  }
  async callBrand(brandID) {
    console.log(brandID);
    this.loadedSelect = false;

    if (brandID === "all") {
      // save query time
      let response = await this.ctx.api.query([
        this.ctx.Prismic.Predicates.at("document.type", "season"),
      ], {
        orderings: "[my.season.name desc]",
      });
      this.seasons = response.results;
      this.loadedSelect = true;
      this.selected.brand = "all";

    } else {
      for (let i = this.seasons.length - 1; i >= 0; i--) {
        if (this.seasons[i].id !== this.selected.season) {
          console.log("splice: " + this.seasons[i].data.name);
          this.seasons.splice(i, 1);
        }
      }
     let response = await this.ctx.api.query([
      this.ctx.Prismic.Predicates.at("document.type", "collection"),
      this.ctx.Prismic.Predicates.at("my.collection.brand", brandID),
      ], {
        orderings: "[my.collection.season desc]",
        "fetchLinks": "season.name",
      });
      let temp = [];
      for (let doc of response.results) {
        let season = doc.data.season;
        let seasonName = season.data.name;

        if (temp.indexOf(seasonName) < 0 && season.id !== this.selected.season) {
          temp.push(seasonName);
          this.seasons.push(season);
          console.log("push: " + seasonName);
        }
      }
      this.selected.brand = brandID;
      this.loadedSelect = true;
    }
  }
}