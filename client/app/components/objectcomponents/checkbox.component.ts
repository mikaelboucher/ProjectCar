import { Component, Output, EventEmitter } from '@angular/core';

const FALSE = 15;
const TRUE = 45;

@Component({
    selector: "checkbox",
    templateUrl: './app/html/object/checkbox.html',
    styleUrls : ['./app/css/object/checkbox.css']
})

export class CheckboxComponent{
    isCheck = false;
    @Output() check = new EventEmitter<boolean>();
    position = FALSE;

    click(){
        this.isCheck = !this.isCheck;
        this.position = (this.isCheck ? TRUE : FALSE);
        this.check.emit(this.isCheck);
    }

}
