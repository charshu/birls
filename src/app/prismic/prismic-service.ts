import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import { reverse } from "lodash";
// import { Api } from "prismic-javascript/d.ts/api.d";
const Prismic = require("prismic-javascript");
// import {Prismic} from "prismic-javascript";
const PrismicToolbar = require("prismic-toolbar");
import { CONFIG } from "../prismic-configuration";
import { Context } from "./context";
import { Preview } from "./preview";

@Injectable()
export class PrismicService {

  constructor(private http: Http) {}

  buildContext(): Promise<Context> {
    const options = {};
    return Prismic.api(CONFIG.apiEndpoint, {accessToken: CONFIG.accessToken})
      .then((api) => {
        return {
          api,
          endpoint: CONFIG.apiEndpoint,
          accessToken: CONFIG.accessToken,
          linkResolver: CONFIG.linkResolver,
          toolbar: this.toolbar,
          Prismic: Prismic,
        } as Context;
      })
      .catch((e) => console.log(`Error during connection to your Prismic API: ${e}`));
  }

  validateOnboarding() {
    const infos = this.getRepositoryInfos();
    const headers = new Headers({ "Content-Type": "application/json" });

    if (infos.isConfigured) {
      this.http.post(`${infos.repoURL}/app/settings/onboarding/run`, null, {headers})
      .subscribe(
        null,
        (err) => console.log(`Cannot access your repository, check your api endpoint: ${err}`),
      );
    }
  }

  getRepositoryInfos() {
    const repoRegexp = /^(https?:\/\/([-\w]+)\.[a-z]+\.(io|dev))\/api(\/v2)?$/;
    const [_, repoURL, name] = CONFIG.apiEndpoint.match(repoRegexp);
    const isConfigured = name !== "charshu";
    return { repoURL, name, isConfigured };
  }

  toolbar(api) {
    const maybeCurrentExperiment = api.currentExperiment();
    if (maybeCurrentExperiment) {
      PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId());
    }
    PrismicToolbar.setup(CONFIG.apiEndpoint);
  }

  preview(token) {
    return this.buildContext()
    .then((ctx) => {
      return ctx.api.previewSession(token, ctx.linkResolver, "/").then((url) => {
        return {
          cookieName: Prismic.previewCookie,
          token: token,
          redirectURL: url,
        } as Preview;
      });
    });
  }
  async getCategories(): Promise<any> {
    let ctx = await this.buildContext();
    let response = await ctx.api.query([ctx.Prismic.Predicates.at("document.type", "category")], { "fetchLinks": "mymenu.name"});
    return reverse(response.results);
  }
}





