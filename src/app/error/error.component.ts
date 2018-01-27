import { Component, Input, Inject, OnInit, AfterViewInit, OnDestroy, OpaqueToken } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../prismic';


@Component({
  selector: 'error',
  styleUrls: ['./error.component.scss'],
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
  ) {

  }

  ngOnInit() {

  }


}
