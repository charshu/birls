import {
  Component,
  Inject,
  Input,
  Renderer,
  ElementRef,
  HostListener,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PrismicService } from "../prismic";
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "../shared/window.service";
import { tabs } from "./tab.data";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent {
  private sub: any;
  @Input() scrollPoint: number;
  @ViewChild("menu") menu: ElementRef;
  @ViewChild("menuReplacer") menuReplacer: ElementRef;
  @ViewChild("menuLogo") menuLogo: ElementRef;
  @ViewChild("topLogo") topLogo: ElementRef;
  @Output() onAffixTop: EventEmitter<any> = new EventEmitter();
  focus: boolean;
  active: boolean;
  tabs: any = [];
  lastIndex: number = -1;
  backdrop: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
    private renderer: Renderer,
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {
    this.tabs = tabs;
  }

  isAffixTop = true;
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let windowScroll =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    
    if (windowScroll > this.scrollPoint) {
      //add class to the native element
      this.renderer.setElementClass(this.menu.nativeElement, "affix", true);
      this.renderer.setElementClass(this.menu.nativeElement, "fadeInOpacity", true);
      this.renderer.setElementClass(
        this.menuReplacer.nativeElement,
        "affix",
        true
      );
      this.renderer.setElementClass(this.topLogo.nativeElement,"tada",false);
      // this.renderer.setElementClass(this.menuLogo.nativeElement, "affix", true);
      // this.renderer.setElementClass(
      //   this.menuLogo.nativeElement,
      //  "bounceInLeft",
      //   true
      // );
      // this.renderer.setElementClass(
      //   this.menuLogo.nativeElement,
      //  "bounceOutLeft",
      //   false
      // );
      if(this.isAffixTop){
        this.onAffixTop.emit(false);
        this.isAffixTop = false;
      }
      
    } else if (windowScroll < this.scrollPoint - 50) {
      //remove class from native element
      this.renderer.setElementClass(this.menu.nativeElement, "affix", false);
      this.renderer.setElementClass(
        this.menuReplacer.nativeElement,
        "affix",
        false
      );
      this.renderer.setElementClass(this.menu.nativeElement, "fadeInOpacity", false);
      // this.renderer.setElementClass(
      //   this.menuLogo.nativeElement,
      //   "affix",
      //   false
      // );
      // this.renderer.setElementClass(
      //   this.menuLogo.nativeElement,
      //  "bounceInLeft",
      //   false
      // );
      // this.renderer.setElementClass(
      //   this.menuLogo.nativeElement,
      //  "bounceOutLeft",
      //   true
      // );
      this.renderer.setElementClass(this.topLogo.nativeElement,"tada",true);
      if(!this.isAffixTop){
        this.onAffixTop.emit(true);
        this.isAffixTop = true;
      }
      
    }
  }

  setActive(i: number) {
    // console.log('mouseenter last' + this.lastIndex);
    if (this.lastIndex === i) {
      return;
    }
    if (this.lastIndex !== -1) {
      this.tabs[this.lastIndex].active = false;
    } else {
      // when mouse enter close all opening tabs before pop new tab
      for (let i: number = 0; i < this.tabs.length; i++) {
        this.tabs[i].active = false;
      }
    }

    this.lastIndex = i;
    this.tabs[i].active = true;
    // turn on backdrop only dropdown menu has links
    if (this.tabs[i].groups.length > 0) {
      this.backdrop = true;
    } else {
      i;
      this.backdrop = false;
    }

    // console.log('mouseenter current' + this.lastIndex);
  }

  isActive(i: number) {
    return this.tabs[i].active;
  }
  closeAll() {
    //  console.log('mouseleave current' + this.lastIndex);
    this.lastIndex = -1;

    setTimeout(() => {
      if (this.lastIndex === -1) {
        for (let i: number = 0; i < this.tabs.length; i++) {
          this.tabs[i].active = false;
        }
        this.backdrop = false;
      }
   }, 200);
  }
}
