const DEFAULT_SIZE = ["50%", "33.33%", "25%"];
const MAXIMISE_SIZE = ["34%"];
const MINIMISE_SIZE = ["22%"];
const OFFSET = 2;

export class AnimationData{
    private stateValues = {
        default : {
            value : 'default',
            data : { 'grandeur' : { width : DEFAULT_SIZE[2] } }
        },
        maximise : {
            value : 'default',
            data : { 'grandeur' : { width : MAXIMISE_SIZE[0] } }
        },
        minimise : {
            value : 'default',
            data : { 'grandeur' : { width : MINIMISE_SIZE[0] } }
        }
    }

    public valueState(type : string){
        return (<any>this.stateValues)[type];
    }

    public changeSize(division : number){
        this.stateValues.default.data.grandeur = { width : DEFAULT_SIZE[division - OFFSET] };
    }
    
}