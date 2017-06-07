import { Currency } from './currency'

const DEFAULT_STATE = "normal";
const DEFAULT_SIZE = "default";

const TEST_IMAGE = "http://www.larevueautomobile.com/images/Bugatti/Veyron-Centenaire/Exterieur/Bugatti_Veyron_Centenaire_002.jpg";

export class Classfield {

    imageList: string[];
    private state : string;
    private size : string;

    constructor(private title: string, private description: string, private price: number,
    private thumbnail : string, private currency?: Currency) {
        this.imageList = [];
        this.imageList.push(this.thumbnail);
        this.state = DEFAULT_STATE;
        this.size = DEFAULT_SIZE;
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

    getState(){
        return this.state;
    }

    setState(state : string){
        this.state = state;
    }

    getSize(){
        return this.size;
    }

    setSize(size : string){
        this.size = size;
    }

}
