import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { Http } from '@angular/http';
import { PrismicService } from './prismic/prismic-service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  public tags = ['#menswear', '#mensfashion', '#menstyle', '#mensstyle', '#menfashion',
  '#trend', '#trendy', '#trends', '#trending', '#style', '#pink',
  '#outfit', '#fashionweek', '#hautecouture'];

  constructor(public http: Http,
              private prismicService: PrismicService,
              public appState: AppState,
  ) {}

  public ngOnInit() {
    this.prismicService.validateOnboarding();
  }

}
