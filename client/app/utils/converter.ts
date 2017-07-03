import { Classified } from '../objects/classified';

export module Converter{

    export function convertClassifiled(rawClassified : any[]) : Classified[]{
        let classifieds : Classified[] = [];
        rawClassified.forEach(rawClasfield => {
            let title = rawClasfield.title;
            let thumbnail = rawClasfield.thumbnail;
            let price = rawClasfield.price;
            let description = rawClasfield.description;
            let classified = new Classified(title, description, price, thumbnail);
            classifieds.push(classified);
        });
        return classifieds;
    }
}
