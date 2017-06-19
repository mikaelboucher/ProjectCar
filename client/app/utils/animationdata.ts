const DEFAULT_SIZE = [25, 100/3, 50];
const MAXIMISE_SIZE = [34, 37];
const MINIMISE_SIZE = [22, 30];

const WIDTHS = [
    {width : 650, division : 3},
    {width : 900, division : 4},
    {width : 1500, division : 5}
]

const OFFSET = 4;

export class AnimationData{
    private selectionNumber : number;


    constructor(){
        this.selectionNumber = 0;
    }

    changeWidthSelection(width : number){
        let division = 2;
        WIDTHS.forEach( data => {
            if (width - 100 >= data.width){
                division = data.division;
            }
        });
        console.log(width +' ' + division);
        this.selectionNumber = OFFSET - division;
    }

    getWidth(state : string) : string{
        let width : string;
        switch(state){
            case 'default':
                width = DEFAULT_SIZE[this.selectionNumber] + '%';
                break;
            case 'maximise':
                width = MAXIMISE_SIZE[this.selectionNumber] + '%';
                break;
            case 'minimise':
                width = MINIMISE_SIZE[this.selectionNumber] + '%';
                break;
        }
        return width;
    }
}