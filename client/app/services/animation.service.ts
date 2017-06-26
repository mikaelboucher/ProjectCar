import { AnimationBuilder, AnimationPlayer } from "@angular/animations";
import { trigger, state, style,
    animate, transition, animation,
    animateChild, query } from '@angular/animations';
import { AnimationData } from '../utils/animationdata'
import { Injectable } from '@angular/core';

const TIMER = 500;
const BEFORE = 0;
const AFTER = 1;

@Injectable()
export class AnimationService{
    private players: AnimationPlayer[] = [];
    private animationData : AnimationData;

    constructor(private builder: AnimationBuilder) {
        this.animationData = new AnimationData();
    }

    public transform( classfield : {element : any, position : number}, focus : boolean , grow : boolean, left : boolean){
        if (this.players[classfield.position]){
            this.players[classfield.position].destroy();
        }

        const factory = this.generateFactory(focus, grow, left);

        this.players[classfield.position] = factory.create(classfield.element.nativeElement, {});
        this.players[classfield.position].play();
    }

    private generateFactory(focus : boolean , grow : boolean, left : boolean){
        let scale = [this.animationData.defaultSize, this.animationData.defaultSize];
        let translate = [0, 0]
        if (focus){
            scale[BEFORE] = (grow ? scale[BEFORE] : this.animationData.focusSize);
            scale[AFTER] = (grow ? this.animationData.focusSize : scale[AFTER]);
        }else{
            translate[BEFORE] = (grow ? 0 : this.animationData.translate(left));
            translate[AFTER] = (grow ? this.animationData.translate(left) : 0);
        }
        return this.builder.build([
            style({ 
                transform : 'scale(' + scale[BEFORE] + ') translate(' + translate[BEFORE]+ '%)'
            }),
            animate(TIMER, style({
                transform : 'scale(' + scale[AFTER] + ') translate(' + translate[AFTER] + '%)'
            }))
        ]);
    }

    public changeFocus(elements : any[], focus : {new : number, old : number}){
        let left = focus.old < focus.new;

        this.players.forEach((player, index) => {
            if (index !== focus.new && index !== focus.old){
                let leftStay = index < focus.new;
                this.stay({element : elements[index], position : index }, leftStay);
            }
        });

        this.minimiseOldFocus({element : elements[focus.old], position : focus.old }, left);
        this.maximiseNewFocus({element : elements[focus.new], position : focus.new }, !left);
    }

    private minimiseOldFocus(classfield : {element : any, position : number}, left : boolean){
        if (this.players[classfield.position]){
            this.players[classfield.position].destroy();
        }

        let scale = [this.animationData.focusSize, this.animationData.defaultSize];
        let translate = [0, this.animationData.translate(left)];

        const factory = this.builder.build([
            style({ 
                transform : 'scale(' + scale[BEFORE] + ') translate(' + translate[BEFORE]+ '%)'
            }),
            animate(TIMER, style({
                transform : 'scale(' + scale[AFTER] + ') translate(' + translate[AFTER] + '%)'
            }))
        ]);

        this.players[classfield.position] = factory.create(classfield.element.nativeElement, {});
        this.players[classfield.position].play();
    }

   private maximiseNewFocus(classfield : {element : any, position : number}, left : boolean){
        if (this.players[classfield.position]){
            this.players[classfield.position].destroy();
        }

        let scale = [this.animationData.defaultSize, this.animationData.focusSize];
        let translate = [this.animationData.translate(left), 0];

        const factory = this.builder.build([
            style({ 
                transform : 'scale(' + scale[BEFORE] + ') translate(' + translate[BEFORE]+ '%)'
            }),
            animate(TIMER, style({
                transform : 'scale(' + scale[AFTER] + ') translate(' + translate[AFTER] + '%)'
            }))
        ]);

        this.players[classfield.position] = factory.create(classfield.element.nativeElement, {});
        this.players[classfield.position].play();
    }

    private stay(classfield : {element : any, position : number}, left : boolean){
        if (this.players[classfield.position]){
            this.players[classfield.position].destroy();
        }

        let scale = this.animationData.defaultSize;
        let translate = this.animationData.translate(left);

        const factory = this.builder.build([
            style({ 
                transform : 'scale(' + scale + ') translate(' + translate + '%)'
            })
        ]);

        this.players[classfield.position] = factory.create(classfield.element.nativeElement, {});
        this.players[classfield.position].play();
    }

}