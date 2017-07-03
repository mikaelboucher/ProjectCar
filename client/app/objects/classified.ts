import { Currency } from './currency'

const DEFAULT_STATE = "normal";
const DEFAULT_SIZE = "default";
const DEFAULT_WIDTH = 25;

const TEST_IMAGE = "http://www.larevueautomobile.com/images/Bugatti/Veyron-Centenaire/Exterieur/Bugatti_Veyron_Centenaire_002.jpg";

export class Classified {
    imageList: string[];

    constructor(private title: string, private description: string, private price: number,
    private thumbnail : string, private currency?: Currency) {
        this.imageList = [];
        this.imageList.push(this.thumbnail);
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
