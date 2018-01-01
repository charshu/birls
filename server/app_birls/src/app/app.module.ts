import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef,
  OpaqueToken
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { AppState, InternalStateType } from './app.service';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
// App is our top level component
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MasonryModule } from 'angular2-masonry';
import { MomentModule } from 'angular2-moment';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { DisqusModule } from 'ng2-awesome-disqus';
import { Ng2ParallaxScrollModule } from 'ng2-parallax-scroll';
import { ResponsiveConfig, ResponsiveModule } from 'ng2-responsive';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { TruncatePipe } from './app.pipe';
import { ImageModal } from './angular2-image-popup/image-modal-popup';
import { ArticleBoardComponent } from './article-board/article-board.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleComponent } from './article/article.component';
import { CollectionBoardComponent } from './collection-board/collection-board.component';
import { FilterPipe } from './collection-board/collection-filter.pipe';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { CollectionComponent } from './collection/collection.component';
import { ErrorComponent } from './error/error.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OtherSeasonComponent } from './otherseason-board/otherseason-board.component';
import { PreviewComponent } from './preview/preview.component';
import { ReviewComponent } from './review/review.component';
import { PrismicService } from './prismic';
import { GlobalErrorHandler } from './shared/error-handler';
import { InstagramService } from './shared/InstagramServices';
import { EmailServices } from './shared/EmailServices';


import '../styles/styles.scss';
import '../styles/headings.css';
require('../../node_modules/bootstrap/dist/js/bootstrap.js');
require('../../node_modules/imagesloaded/imagesloaded.pkgd.js');

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

const APP_CONFIG_DATA = {
  server_ip_addr: 'http://localhost:8080',
};
const APP_CONFIG_TOKEN = new OpaqueToken('config');

let config = {
    breakPoints: {
        xs: {max: 600},
        sm: {min: 601, max: 959},
        md: {min: 960, max: 1279},
        lg: {min: 1280, max: 1919},
        xl: {min: 1920},
    },
    debounceTime: 100, // allow to debounce checking timer
  };

  export function ResponsiveDefinition() {
          return new ResponsiveConfig(config);
  }

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ArticleComponent,
    HomeComponent,
    NavBarComponent,
    ArticleBoardComponent,
    ArticleCardComponent,
    TruncatePipe,
    CollectionBoardComponent,
    CollectionCardComponent,
    ImageModal,
    CollectionComponent,
    GalleryComponent,
    ReviewComponent,
    OtherSeasonComponent,
    FilterPipe,
    PreviewComponent,
    ErrorComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    MomentModule,
    Ng2ParallaxScrollModule,
    DisqusModule,
    ShareButtonsModule.forRoot(),
    NgbModule.forRoot(),
    MasonryModule,
    LazyLoadImageModule,
    ResponsiveModule,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    PrismicService,
    InstagramService,
    EmailServices,
    GlobalErrorHandler,
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
     provide: ResponsiveConfig,
     useFactory: ResponsiveDefinition },
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues  = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
