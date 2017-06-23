import { AnimationBuilder, AnimationPlayer } from "@angular/animations";
import { trigger, state, style,
    animate, transition, animation,
    animateChild, query } from '@angular/animations';
import { Injectable } from '@angular/core';

const MINIMISE_TIME = 250;
const MAXIMISE_TIME = 500;

@Injectable()
export class AnimationService{
    private players: AnimationPlayer[] = [];

    constructor(private builder: AnimationBuilder) {}

    changeWidth(element : any, position : number, oldWidth : number, newWidth : number){
        /**if (this.players[position]){
            this.players[position].destroy();
        }
        
        let time = (oldWidth < newWidth ? MAXIMISE_TIME : MINIMISE_TIME);

        const factory = this.builder.build([
            style({ width : oldWidth + '%'}),
            animate(time, style({
                width : newWidth + '%'
            }))
        ]);

        this.players[position] = factory.create(element.nativeElement, {});
        this.players[position].play();**/
    }
}