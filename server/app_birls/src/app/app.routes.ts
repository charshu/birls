import { Routes } from '@angular/router';
import { ArticleBoardComponent } from "./article-board/article-board.component";
import { ArticleComponent } from "./article/article.component";
import { CollectionBoardComponent } from "./collection-board/collection-board.component";
import { CollectionComponent } from "./collection/collection.component";
import { ErrorComponent } from "./error/error.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { HomeComponent } from "./home/home.component";
import { OtherSeasonComponent } from "./otherseason-board/otherseason-board.component";
import { PreviewComponent } from "./preview/preview.component";
import { ReviewComponent } from "./review/review.component";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "runway", component: CollectionBoardComponent },
  {
    path: "runway/:uid", component: CollectionComponent,
    children: [
      { path: "", redirectTo: "collection", pathMatch: "full" },
      { path: "review", component: ReviewComponent },
      { path: "collection", component: GalleryComponent },
      { path: "otherseason", component: OtherSeasonComponent },
    ],
  },
  { path: ":mymenu/:category", component: ArticleBoardComponent },
  { path: ":mymenu/:category/:uid", component: ArticleComponent },
  { path: "tags/:tagname", component: ArticleBoardComponent },
  { path: "preview", component: PreviewComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", redirectTo: "error"},
];
