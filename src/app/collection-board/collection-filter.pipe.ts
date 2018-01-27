import {Injectable, Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "myfilter"})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], args: any): any {
        if (!items) return [];
        return items.filter((item) => {
            let season = item.data.season;
            let seasonName = season.data.name;
            let brand = item.data.brand;
            let brandName = brand.data.name;
            if (args.brand === "all" && args.season === "all") {
                return true;
            }
            else if (args.brand === "all" && season.id === args.season) {
                return true;
            }
            else if (args.season === "all" && brand.id === args.brand) {
                return true;
            }
            else if (brand.id === args.brand && season.id === args.season) {
                 return true;
            }
            return false;
        });
    }
}