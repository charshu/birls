import { Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { PrismicService } from '../prismic';

@Component({
  selector: 'gallery',
  styleUrls: ['./gallery.component.scss'],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit, OnDestroy {
  private ctx: any;
  private sub: any;
  public document: any;
  public loaded: boolean;
  public images: any[];
  openModalWindow: boolean = false;
  imagePointer: number;

  constructor(
    private router: Router,
    private prismicService: PrismicService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
  ) {

  }

  async ngOnInit() {
    document.body.scrollTop = 0;
    this.ctx = await this.prismicService.buildContext();
    this.sub = this.route.parent.params.subscribe(async (params) => {
      const uid = params['uid'];
      let response = await this.ctx.api.getByUID('collection', uid,
      {
        fetchLinks: ['brand.name', 'season.name'],
      });
      this.document = response;
      console.log(this.document);
      this.images = this.document.data.gallery.map((item) => {
        return {
          thumb : item.image.url,
          img : item.image.tablet.url,
          description : item.description,
        };
      });
      console.log(this.images);
      this.loaded = true;
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  openImageModal(index) {
    this.openModalWindow = true;
    this.imagePointer = index;
  }
  cancelImageModel() {
    this.openModalWindow = false;
  }

}