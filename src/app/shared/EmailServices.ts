import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

import {InstagramImage} from "./type.d";
let data =
{
  "version": "1.0",
  "title": "Hojicha kakigori",
  'author_name': "chizzwz",
  "author_url": "https://www.instagram.com/chizzwz",
  "author_id": 25824791,
  "media_id": "1571146152342727164_25824791",
  "provider_name": "Instagram",
  "provider_url": "https://www.instagram.com",
  "type": "rich",
  "width": 658,
  "height": null,
  "html": "<blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"7\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:61.52777777777778% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://www.instagram.com/p/BXN1RnsnCn8/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_blank\">Hojicha kakigori</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">โพสต์ที่แชร์โดย Chi (@chizzwz) เมื่อ <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2017-07-31T15:33:58+00:00\">ก.ค. 31, 2017 เวลา 8:33am PDT</time></p></div></blockquote>",
  "thumbnail_url": "https://instagram.fbkk2-5.fna.fbcdn.net/t51.2885-15/sh0.08/e35/p640x640/20482522_1719980271638341_2773818776020320256_n.jpg",
  "thumbnail_width": 640,
  "thumbnail_height": 787,
}; 

@Injectable()
export class EmailServices {
    public redirectUrl: string;
   

    constructor(private http: Http, private router: Router) {
        console.log("instagram services init");
    }

    public async emailSubscribe(email:string): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify({
            email: email
        });
        let options = new RequestOptions({ 
            headers: headers
            
         });
        let response = await this.http.post("http://localhost:3276/api/subscriber/lists" ,body, options).toPromise();
        return response.json();
    }

}