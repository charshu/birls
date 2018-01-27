import {Component, Inject, Input, OnInit} from "@angular/core";
import { forEach } from "lodash";
import {PrismicService} from "../prismic";
const PrismicDOM = require("prismic-dom");

@Component({
  selector: "collection-card",
  styleUrls: ["./collection-card.component.scss"],
  templateUrl: "./collection-card.component.html",
})
export class CollectionCardComponent implements OnInit {
  @Input() public linkResolver: Function;
  @Input() document: any;
  @Input() showDate: boolean;
  @Input() cardSize: number = 1;
  @Input() textSize: number;
  @Input() styleNumber: number;
  @Input() limit = 100;
  @Input() cardHeight: number;
  @Input() cardWidth: number;
  public firstParagraph: any = "";
  text: {
    brand: number,
    season: number,
  } = {
    brand: 1,
    season: 1,
  };
  groupImages: any;
  image1: any;
  image2: any;
  image3: any;
  imageUrl: string[];
  imageHeight: number;
  imagePointer: number = 0;
  isHover: boolean = false;

  isMore = false;
  loaded: boolean = false;
  loadingImage: boolean = true;
  defaultImage = "https://www.placecage.com/1000/1000";
  image = "https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg";
  offset = 100;

  toggle() {
    this.isHover = !this.isHover;
    // console.log(this.isHover);;
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  capitalizeFirstLetter(str) {
    if (str !== undefined && str !== null) {
      return str
        .charAt(0)
        .toUpperCase() + str.slice(1);
    }
    return "";
  }

  constructor(private prismicService: PrismicService,
  ) {}

  ngOnInit() {
     console.log(this.document);
    if (!this.cardHeight)this.cardHeight = 6.0 * 50 * this.cardSize;
    if (!this.cardWidth)this.cardWidth = 3.0 * 50 * this.cardSize;
    this.text.brand = 1.4 * this.textSize;
    this.text.season = 0.8 * this.textSize;

    //
    // finding slices that can be paragraph
    //
    forEach(this.document.data.body, (slice:any) => {
      switch (slice.slice_type) {
        case("one_column"):
          this.firstParagraph = PrismicDOM.RichText.asText(slice.primary.paragraph);
          break;
        case("two_column"):
          this.firstParagraph = slice.primary.left_paragraph
            ? slice.primary.left_paragraph
            : slice.primary.right_paragraph;
          break;
        case("quote"):
          this.firstParagraph = slice.primary.quote;
          break;
        case("left_image_paragraph"):
          this.firstParagraph = slice.primary.paragraph;
          break;
        case("right_image_paragraph"):
          this.firstParagraph = slice.primary.paragraph;
      }
      if (this.firstParagraph !== "") {
        return false;
      }
    });

    this.loaded = true;


  }

  public toShortDescription(str) {
    if (str.length >= this.limit) {
      str = str.substring(0, this.limit);
      str = str.substring(0, str.lastIndexOf(" "));
      let regexp = /[a-zA-Z]/;
      while (!regexp.test(str[str.length - 1])) {
          str = str.substring(0, str.length - 1);
      }
    }
    return str;
  }

}