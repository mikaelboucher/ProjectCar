import { AnimationBuilder, AnimationPlayer } from "@angular/animations";
import { trigger, state, style,
    animate, transition, animation,
    animateChild, query } from '@angular/animations';
import { AnimationData } from '../utils/animationdata'
import { Injectable } from '@angular/core';

const TIME = 500;
const BEFORE = 0;
const AFTER = 1;

@Injectable()
export class AnimationService{
    private players: AnimationPlayer[] = [];
    private animationData : AnimationData;

    constructor(private builder: AnimationBuilder) {
        this.animationData = new AnimationData();
    }

    public transform( classfield : {element : any, position : number, focus : boolean} , grow : boolean, left : boolean){
        if (this.players[classfield.position]){
            this.players[classfield.position].destroy();
        }

        const factory = this.generateFactory(classfield.focus, grow, left);

        this.players[classfield.position] = factory.create(classfield.element.nativeElement, {});
        this.players[classfield.position].play();
    }

    private generateFactory(focus : boolean , grow : boolean, left : boolean){
        let scale = [this.animationData.defaultSize, this.animationData.defaultSize]
        if (focus){
            scale[BEFORE] = (grow ? scale[BEFORE] : this.animationData.focusSize);
            scale[AFTER] = (grow ? this.animationData.focusSize : scale[AFTER]);
        }
        let translate = (focus ? 0 : this.animationData.translate(left, grow));
        return this.builder.build([
            style({ 
                transform : 'scale(' + scale[BEFORE] + ')'
            }),
            animate(TIME, style({
                transform : 'scale(' + scale[AFTER] + ') translate(' + translate + '%)'
            }))
        ]);
    }

}