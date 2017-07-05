const DEFAULT_SCALE = 1;
const FOCUS_SCALE = [1.6, 1.5, 1.4, 1.2]
const TRANSLATE_X = [32 ,27, 22, 11];
const TRANSLATE_Y = [7, 5, 3, 1];

const DIMENSION_DATA = [
    {width : 1000, division : 3},
    {width : 1400, division : 4},
    {width : 1700, division : 5}
]

const WITDHS = [20, 25, 100/3, 50];

const OFFSET = 5;

export class AnimationData{
    private actualState : number;
    private firstTime : boolean;

    constructor(){
        this.actualState = 1;
        this.firstTime = true;
    }

    get focusSize() : number{
        return FOCUS_SCALE[this.actualState];
    }

    get defaultSize() : number{
        return DEFAULT_SCALE;
    }

    get width() : number{
        return WITDHS[this.actualState];
    }

    public translateX(left : boolean) : number{
        return (left ? -1 : 1) * TRANSLATE_X[this.actualState];
    }

    public get translateY(){
        return TRANSLATE_Y[this.actualState];
    }

    private sameDimension(width : number) : boolean{
        let dimension = OFFSET - this.actualState;
        let range : number[] = [];
        for (let i =0; i < 2; i++){
            let data = DIMENSION_DATA.find((data) => data.division === dimension + i);
            if (data){
                range.push(data.width);
            }
        }
        return range[0] <= width && width <= range[1];
    }

    public changeDimensison(width : number) : number{
        let dimension;
        if (this.sameDimension(width) && !this.firstTime){
            dimension = OFFSET - this.actualState;
        }else{
            dimension = 2;
            DIMENSION_DATA.forEach((data) => {
                if (width > data.width){
                    dimension = data.division;
                }
            });
            this.actualState = OFFSET - dimension;
            this.firstTime = false;
        }
        return dimension;
    }
}