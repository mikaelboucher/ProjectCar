const DEFAULT_SCALE = 1;
const FOCUS_SCALE = [1.4]
const TRANSLATE = [22];

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

    get focusSize() : number{
        return FOCUS_SCALE[this.actualState];
    }

    get defaultSize() : number{
        return DEFAULT_SCALE;
    }

    public translate(left : boolean) : number{
        return (left ? -1 : 1) * TRANSLATE[this.actualState];
    }
}