import { Classfield } from '../objects/classfield';

export module Converter{

    export function convertClassfield(rawClassfield : any[]) : Classfield[]{
        let classfields : Classfield[] = [];
        rawClassfield.forEach(rawClasfield => {
            let title = rawClasfield.title;
            let thumbnail = rawClasfield.thumbnail;
            let price = rawClasfield.price;
            let description = rawClasfield.description;
            let classfield = new Classfield(title, description, price, thumbnail);
            classfields.push(classfield);
        });
        return classfields;
    }
}
