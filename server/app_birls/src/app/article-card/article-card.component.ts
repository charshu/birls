import { Component, Input, OnInit } from '@angular/core';
import { forEach } from 'lodash';
import { PrismicService } from '../prismic';
const PrismicDOM = require('prismic-dom');

@Component({
  selector: 'article-card',
  styleUrls: ['./article-card.component.scss'],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent implements OnInit {
  @Input() public linkResolver: Function;
  public PrismicDOM: any;

  @Input() public document: any;
  @Input() public randomHeight: boolean;
  @Input() public width: number;
  @Input() public imageHeight: number;
  @Input() public styleNumber: number;
  @Input() public backgroundColor: string;
  // text limit in description of cards
  @Input() public limit = 100;
  // lazy loader
  public defaultImage = 'assets/img/animat-pencil-color.gif';
  public image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  public errorImage = 'assets/svg/birls.svg';
  public offset = 100;

  public firstParagraph: any = '';
  public isHover: boolean = false;
  public isMore = false;

  constructor(
    private prismicService: PrismicService,
  ) {
    this.PrismicDOM = PrismicDOM;
   }

  async ngOnInit() {

    if (this.randomHeight) {
      this.imageHeight = this.getRandomInt(300, 450);
    }

    forEach(this.document.data.body, (slice: any) => {
      switch (slice.slice_type) {
        case('one_column'):
          this.firstParagraph = PrismicDOM.RichText.asText(slice.primary.paragraph);
          break;
        case('two_column'):
          this.firstParagraph = slice.primary.left_paragraph
            ? slice.primary.left_paragraph
            : slice.primary.right_paragraph;
          break;
        case('quote'):
          this.firstParagraph = slice.primary.quote;
          break;
        case('left_image_paragraph'):
          this.firstParagraph = slice.primary.paragraph;
          break;
        case('right_image_paragraph'):
          this.firstParagraph = slice.primary.paragraph;
      }
      if (this.firstParagraph !== '') {
        return false;
      }
    });
  }

  public toShortDescription(str) {
    if (str.length >= this.limit) {
      str = str.substring(0, this.limit);
      str = str.substring(0, str.lastIndexOf(' '));
      let regexp = /[a-zA-Z]/;
      while (!regexp.test(str[str.length - 1])) {
          str = str.substring(0, str.length - 1);
      }
    }
    return str;
  }
  toggle() {
    this.isHover = !this.isHover;
  }
  getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  capitalizeFirstLetter(str) {
    if (str !== undefined && str !== null && str !== '') {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return '';
  }

}
