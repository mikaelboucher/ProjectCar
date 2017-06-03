import { Currency } from './currency'

const DEFAULT_STATE = "normal";
const DEFAULT_TAILLE = "default";

export class Classfield {

    imageList: string[];
    private state : string;
    private taille : string;

    constructor(private title: string, private description: string, private price: number, private currency: Currency) {
        this.imageList = [];
        this.imageList.push("http://singervehicledesign.com/wp-content/uploads/2015/07/12-singer-911-montana-540x320.jpg");
        this.state = DEFAULT_STATE;
        this.taille = DEFAULT_TAILLE;
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

    getTaille(){
        return this.taille;
    }

    setTaille(taille : string){
        this.taille = taille;
    }

}
