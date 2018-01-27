import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PrismicService } from "../prismic/prismic-service";
@Component({
  template: `Redirecting`,
})

export class PreviewComponent implements OnInit, OnDestroy {
    private api: any;
    private sub;
    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService)
    { }

    async ngOnInit() {

        this.api = (await this.prismicService.buildContext()).api;
        this.sub = this.route.queryParams.subscribe((params) => {
            console.log(params["token"]);
            this.prismicService.preview(params["token"]).then((url) => {
                console.log(url);
                window.location.href = url;
            });
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    }
