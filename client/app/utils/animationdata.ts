const DEFAULT_SCALE = 1;
const FOCUS_SCALE = [1.4, 1.4, 1.2]
const TRANSLATE = [22, 22, 11];

const DIMENSION_DATA = [
    {width : 880, division : 3},
    {width : 1200, division : 4}
]

const WITDHS = [25, 100/3, 50];

const OFFSET = 4;

export class AnimationData{
    private actualState : number;

    constructor(){
        this.actualState = 0;
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

    public translate(left : boolean) : number{
        return (left ? -1 : 1) * TRANSLATE[this.actualState];
    }

    public changeDimensison(width : number) : number{
        let dimension = 2;
        DIMENSION_DATA.forEach((data) => {
            if (width > data.width){
                dimension = data.division;
            }
        });
        this.actualState = OFFSET - dimension;
        return dimension;
    }
}