import {Component, Inject, OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {PrismicService} from '../prismic';
import {GlobalErrorHandler} from '../shared/error-handler';

@Component({
  templateUrl: './article-board.component.html',
  styleUrls: ['./article-board.component.scss'],
})
export class ArticleBoardComponent implements OnInit, OnDestroy {
  public ctx: any;
  private sub: any;
  private Prismic: any;
  public documents: any[] ;
  public queryTitle: string = '';
  public description: string;
  public imageUrl: string = '';
  public imageHeight: number = 0;

  public watchedCategory: any = 'all';
  public tags = ['menswear', 'mensfashion', 'menstyle', 'mensstyle'
  , 'menfashion', 'trend', 'trendy', 'trends', 'trending'
  , 'style', 'pink', 'outfit', 'fashionweek'];

  public pageloaded: boolean = false;
  public articlesLoaded = true;
  public tag: any;
  public loadingImg: boolean;
  private page: number = 1;
  private pageSize: number = 10;

  public mymenuCategories = [];
  private categories = [];
  public routeParams: any;
  private scrollPos: number;

  //#region
  public fashion_moods = [{
    img: 'assets/img/recommend-tags/ok-fashion.jpg',
    maxWidth: 300,
    maxHeight: 250,
    caption: 'shoestastic!',
  }, {
    img: 'assets/img/recommend-tags/fashion2.jpg',
    maxWidth: 300,
    maxHeight: 290,
    caption: 'the jewels season',
  }, {
    img: 'assets/img/recommend-tags/fashion3-1.jpg',
    maxWidth: 420,
    maxHeight: 350,
    caption: 'denim days',
  }, {
    img: 'assets/img/recommend-tags/fashion4-1.jpg',
    maxWidth: 340,
    maxHeight: 250,
    caption: 'for bagaholics only',
  }, {
    img: 'assets/img/recommend-tags/fashion5-1.jpg',
    maxWidth: 300,
    maxHeight: 250,
    caption: 'make it casual chic',
  }];
  //#endregion

   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
    private globalErrorHandler: GlobalErrorHandler,
  ) { }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public async ngOnInit() {
    this.ctx = await this.prismicService.buildContext();
    this.categories = await this.prismicService.getCategories();
    console.log(this.categories);
    this.sub = this.route.params.subscribe(async(params) => {
      this.page = 1;
      this.routeParams = params;
      this.mymenuCategories = [];

      // load all category under my menu
      _.forEach(this.categories, (category) => {
        // all
        if (this.routeParams['mymenu'] === category.data.menu.uid) {
          this.mymenuCategories.push(category);
        }
      });
      this.pageloaded = true;
      // if mymenu change, load new categories
      if (this.routeParams['category'] === 'all') {

        this.ReloadCardBoard(this.mymenuCategories);
        return;
      }
      //
      // change category
      //
      if (this.routeParams['category'] !== 'all') {
        let found = false;
        // load a target category
        _.forEach(this.mymenuCategories , (category) => {
          let categoryUid = category.uid;
          if (this.routeParams['category'] === categoryUid) {
            this.ReloadCardBoard([category]);
            found = true;
            return;
          }
        });
        // not found
        if (!found)
        this.globalErrorHandler.handleError(new Error('Category not found'));
      }
    });

  }

  private async btnMore_Click(): Promise<void> {
    //
    // get article in next page
    //

    this.page++;
    if (this.routeParams['category'] === 'all') {
      let mymenuCategories = [];
      _.forEach(this.categories, async (category) => {
        let categoryMenu = category.getLink('category.menu');
        if (this.routeParams['mymenu'] === categoryMenu.uid) {
          mymenuCategories.push(category);
        }
      });

      let results = await this.getArticlesInCategories(mymenuCategories, this.page, this.pageSize);
      this.documents = this.documents.concat(results);
      return;
    }
    //
    //
    //
    if (this.routeParams['category'] !== 'all') {
      _.forEach(this.categories, async (category) => {
          if (this.routeParams['category'] === category.uid) {
            let results = await this.getArticlesInCategories([category], this.page, this.pageSize);
            this.documents = this.documents.concat(results);
            return;
          }
        });
    }
  }

  private async getArticlesInCategories(mymenuCategories: any[], page: number, pageSize: number): Promise <any>{
    //
    // query articles from all categories in param
    //
    // console.log(_.map(mymenuCategories, (item) => item.id));
    let response =  await this.ctx.api.query([
      this.ctx.Prismic.Predicates.at('document.type', 'article'),
      this.ctx.Prismic.Predicates.any('my.article.link', _.map(mymenuCategories, (item) => item.id)),
    ],
     { orderings: '[my.article.date desc]',
      fetchLinks: ['my.article.link', 'category.menu', 'category.name'], pageSize, page });
    return response.results;

  }
  private async categoryMenu_Click(category: any) {
    this.scrollPos = document.body.scrollTop;
  }

  private async ReloadCardBoard(mymenuCategories: any[]): Promise<void> {
    {

      let response;
      console.log(this.routeParams);
      //
      // :MyMenu/:Category/:uid
      //
      if (this.routeParams['category'] != null && this.routeParams['category'] !== '') {

          this.documents = await this.getArticlesInCategories(mymenuCategories, 1, this.pageSize);
          console.log(this.documents);
          this.articlesLoaded = true;
          setTimeout(() => {
            document.body.scrollTop = this.scrollPos - 0.1;
          } , 100);
      }
      //
      // tags/:tagname
      //
      else if (this.routeParams['tagname']) {
        this.tag = this.routeParams['tagname'];
        response = this.ctx.api.query([
          this.ctx.Prismic.Predicates.at('document.type', 'article'),
          this.ctx.Prismic.Predicates.at('document.tags', [this.tag]),
        ], {
          orderings: '[my.article.date desc]',
          fetchLinks: 'category.name',
        });
        this.documents = response.results;
      }
    }
  }
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
