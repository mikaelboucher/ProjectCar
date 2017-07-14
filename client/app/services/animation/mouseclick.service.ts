import { AnimationBuilder, AnimationPlayer } from "@angular/animations";
import { trigger, state, style,
    animate, transition, animation,
    animateChild, keyframes } from '@angular/animations';
import { Extra } from '../../utils/extra';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

const TIME = 500;

@Injectable()
export class MouseClickService{
    private elements : any[];
    private players : AnimationPlayer[];

    constructor(private builder: AnimationBuilder) {
        this.elements = [];
        this.players = [];
    }

    /**
     * add html elements for animation purposes
     * @param elements html classifield
     * @param id = (classifiedListId * division)
     */
    public addElement(elements : any[], id : number){
        elements.forEach((element, index) => {
            this.elements[id + index] = element;
        })
    }

    public click(id : number){
        this.elements.forEach((element, index) => {
            if (index === id){
                this.focus(element, index);
            }else{
                this.eliminate(element, index);
            }
        });
    }

    private focus(element : any,position : number){

         if (this.players[position]){
            this.players[position].destroy();
        }

        const factory = this.builder.build([
            style({ width: '25%', transform : 'scale(1, 1) translateY(0%)' }),
            animate(TIME, style({
                width: '100%',
                transform : 'scale(1, 2.5) translateY(-30%)'
        }))]);
        
        this.players[position] = factory.create(element.nativeElement, {});
        this.players[position].play();

    }

    private eliminate(element : any,position : number){

        if (this.players[position]){
            this.players[position].destroy();
        }

        const factory = this.builder.build([
            style({ opacity : 1 }),
            animate(TIME, style({
                opacity : 0
        }))]);
        
        this.players[position] = factory.create(element.nativeElement, {});
        this.players[position].play();

    }
}
