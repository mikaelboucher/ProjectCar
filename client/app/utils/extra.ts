export module Extra{

    export function between(value : number, extrem: number[], twoway? : boolean){
        let firstSide = extrem[0] < value && value < extrem[1];
        let otherSide = extrem[1] < value && value < extrem[0] && twoway;
        return firstSide || otherSide;
    }

    export function swap(array : any[]) : any[]{
        let newArray = array.slice();
        newArray[0] = array[1];
        newArray[1] = array[0];
        return newArray;
    }

    export function doubleZero(str : string) : string{
        let newStr = '0' + str;
        if (newStr.length > 2){
            newStr = newStr.slice(1);
        }
        return newStr;
    }

}