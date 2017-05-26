import { Currency } from './currency'

export class Classfield {

    imageList: string[];

    constructor(private title: string, private description: string, private price: number, private currency: Currency) {
        this.imageList = [];
        this.imageList.push("http://singervehicledesign.com/wp-content/uploads/2015/07/12-singer-911-montana-540x320.jpg");
    }

    getTitle() {
        return this.title;
    }

    getDescription(){
        return this.description;
    }

    getPrice(){
        return this.price;
    }

    getCurrency(){
        return this.currency;
    }


}
