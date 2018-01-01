import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'ImageModal',
    styleUrls: ['./style.css'],
   templateUrl: './imageModal.html',
})
export class ImageModal implements OnInit {
   public _element: any;
   public opened: boolean = false;
   public imgSrc: string;
   public currentImageIndex: number;
   public loading: boolean= false;
   public showRepeat: boolean= false;
   public isNav: boolean = false;
  @Input('modalImages') public modalImages: any;
  @Input('imagePointer') public imagePointer: number;
  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();

  // lazy loader
  public defaultImage = 'assets/img/heart_beat_100x100.gif';
  public image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  public errorImage = 'assets/svg/birls.svg';
  public offset = 100;

  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
      this.loading = true;
      if (this.imagePointer >= 0) {
      this.showRepeat = false;
      this.openGallery(this.imagePointer);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  tryClose(){
    if (!this.isNav){
      this.closeGallery();
    }
  }
  prevImage() {
    this.loading = true;
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.modalImages.length - 1  ;
    }
    this.openGallery(this.currentImageIndex);
  }
  nextImage() {
    this.loading = true;
    this.currentImageIndex++;
    if (this.modalImages.length === this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.openGallery(this.currentImageIndex);

  }
  openGallery(index) {
    if (!index) {
    this.currentImageIndex = 1;
    }
    this.currentImageIndex = index;
    this.opened = true;
    for (let i = 0; i < this.modalImages.length; i++) {
            if (i === this.currentImageIndex ) {
              this.imgSrc = this.modalImages[i].img;
              this.loading = false;
              setTimeout(() => {
                document.body.scrollTop = document.body.scrollTop + 1;
              } , 1000);
              break;
            }
       }
  }
}
