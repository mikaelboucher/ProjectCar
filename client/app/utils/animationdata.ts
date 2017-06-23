/**const DEFAULT_SIZE = [25, 100/3];
const MAXIMISE_SIZE = [34, 37];
const MINIMISE_SIZE = [22, 30];**/

const SIZES = {
    default : [25, 100/3],
    maximise : [34, 37],
    minimise : [22, 30]
}

const WIDTHS = [
    {width : 900, division : 4},
    {width : 1500, division : 5}
]

const OFFSET = 4;

export class AnimationData{
    private actualState : number;

    constructor(){
        this.actualState = 0;
    }

    getWidth(state : string){
        return (<any>SIZES)[state][this.actualState];
    }
}

/**export class AnimationData{
    private states = {
        default : {
            value : 'default',
            params : { size : DEFAULT_SIZE[0] }
        },
        maximise : {
            value : 'maximise',
            params : { size : MAXIMISE_SIZE[0] }
        },
        minimise : {
            value : 'minimise',
            params : { size : MINIMISE_SIZE[0] }
        }
    };
    private position : number;

    constructor(){
        this.position = 0;
    }

    getSize(state : string){
        return (<any>this.states)[state];
    }

}**/