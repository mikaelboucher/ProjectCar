import { Porsche911 } from './porsche911';

export class Vehicle{

    private porsche: Porsche911;
    private Vin: String;
    private Accidents: boolean;
    private carProofId: number;
    private porscheCertified: boolean;
    private matchingVIN: boolean;
    private modfied: boolean;
    private modifications: String[];
    private originalEngine: boolean;
    private serialization: number;
    private mileage: number;


    getMileage(){
        return this.mileage;
    }

    getKm(){
        return Math.ceil(this.mileage * 1.6);
    }

}