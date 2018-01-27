import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
    name: 'myfilter2'
})
@Injectable()
export class ArticleBoardFilterPipe implements PipeTransform {
    transform(items : any[], args : any) : any {
        if(!items) 
            return [];
        return items.filter(item => {
            let category = item.getLink('article.link').uid;
            
            if (args.category === 'all' || !args.category) {
                return true;
            } else if (args.category === category) {
                return true;
            }
            return false;

        });
    }
}