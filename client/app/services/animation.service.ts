import { AnimationBuilder, AnimationPlayer } from "@angular/animations";
import { trigger, state, style,
    animate, transition, animation,
    animateChild, query } from '@angular/animations';
import { AnimationData } from '../utils/animationdata';
import { Extra } from '../utils/extra';
import { Injectable } from '@angular/core';

const ANIMATION = 500;
const DELAY = 500;
const REBOUND_EFFECT = 100;

const BEFORE = 0;
const AFTER = 1;

const IN = 0;
const OUT = 1;

const OK = true;

@Injectable()
export class AnimationService{
    private players: AnimationPlayer[];;
    private elements : any[];
    private status : Date[];
    private animationData : AnimationData;
    private positionFocus : number;
    private firstFocus : boolean;
    private animationDelay : any[];

    constructor(private builder: AnimationBuilder) {
        this.animationData = new AnimationData();
        this.players = [];
        this.status = [];
        this.animationDelay = new Array(2);
        this.firstFocus = true;
    }

    public init(elements : any[]){
        this.elements = elements;
        this.initAffichage(elements);
    }

    public mouseover(posFocus : number){
        if (posFocus !== this.positionFocus){

            this.delay();

            this.animationDelay[IN] = setTimeout( () => {
                if (this.positionFocus || this.positionFocus === 0){
                    let focus = {new : posFocus, old : this.positionFocus};
                    this.changeFocus(focus);
                }else{
                    this.elements.forEach((classfield, nbClassfield)=> {
                        let focus = nbClassfield === posFocus;
                        let left = nbClassfield < posFocus;
                        this.transform(nbClassfield, focus, OK, left);
                    });
                }
                this.positionFocus = posFocus;
                this.firstFocus = false;
            }, DELAY);
        }
    }

    public mouseleave(position : number){
        
        this.delay();

        if (!this.firstFocus){
            this.animationDelay[OUT] = setTimeout( () => {
                this.elements.forEach( (classfield, nbClassfield) => {
                    let focus = nbClassfield === this.positionFocus;
                    let left = nbClassfield < this.positionFocus && !focus;
                    this.transform(nbClassfield, focus, false, left);
                });
                let oldFocus = this.positionFocus;
                this.positionFocus = undefined;
                setTimeout( () => this.firstFocus = !this.positionFocus, REBOUND_EFFECT);
            }, REBOUND_EFFECT);
        }
    }
    
    private delay(){
        this.animationDelay.forEach((delayID) => {
            if (delayID){
                clearTimeout(delayID);
                delayID = undefined;
            }
        })
    }

    private initAffichage(elements : any[]){
        elements.forEach((element, index) => this.stay(index, {}))
    }

    private transform(position : number, focus : boolean, grow : boolean, left : boolean){
        if (focus){
            left = undefined;
        }

        let propreties = {focus : focus, left : left, inverseAll : !grow};
        const factory = this.generateFactory(propreties);

        this.play(position, factory);
    }

    private changeFocus(focus : {new : number, old : number}){
        let left = focus.old < focus.new;
        let distance = focus.new - focus.old;

        this.players.forEach((player, index) => {
            if (index !== focus.new && index !== focus.old){
                let config : any = {};
                let leftStay = index < focus.new;
                if (Extra.between(index, [focus.new, focus.old], OK) && distance !== 0){
                    if (index > focus.new){
                        config.leftToRight = OK;
                    }else{
                        config.rightToLeft = OK;
                    }
                }else{
                    config.left = leftStay;
                    config.single = OK;
                }
                this.stay(index, config);
            }
        });

        this.minimiseOldFocus(focus.old, left);
        this.maximiseNewFocus(focus.new, !left);
    }

    private minimiseOldFocus(position : number, left : boolean){
        let propreties = {focus : OK, left : left, inverseScale : OK};
        const factory = this.generateFactory(propreties);

        this.play(position, factory);
    }

    private maximiseNewFocus(position : number, left : boolean){
        let propreties = {focus : OK, left : left, inverseTranslate : OK};
        const factory = this.generateFactory(propreties);

        this.play(position, factory);
    }

    private stay(position : number, config : any){
        let propreties = {single : config.single, left : config.left, inverseTranslate : OK,
            leftToRight : config.leftToRight, rightToLeft : config.rightToLeft};
        const factory = this.generateFactory(propreties);

        this.play(position, factory);
    }

    private generateFactory(propreties : any){
        let nbState = propreties.single ? 1 : 2;

        let scale = [this.animationData.defaultSize, this.animationData.defaultSize];
        scale[AFTER] = (propreties.focus ? this.animationData.focusSize : scale[AFTER]);

        let translate = [0, 0];
        if (propreties.left !== undefined){
            translate[AFTER] = this.animationData.translate(propreties.left);
        }

        if (propreties.inverseScale || propreties.inverseAll){
            scale = Extra.swap(scale)
        }

        if (propreties.inverseTranslate || propreties.inverseAll){
            translate = Extra.swap(translate);
        }

        if (propreties.leftToRight !== undefined || propreties.rightToLeft !== undefined){
            let left = propreties.leftToRight !== undefined;
            translate[BEFORE] = this.animationData.translate(left);
            translate[AFTER] = this.animationData.translate(!left);
        }

        let time = ANIMATION;

        let builder = [];
        for (let i = 0 ; i < nbState ; i++){
            switch(i){
                case BEFORE:
                    builder.push(style({ 
                        transform : 'scale(' + scale[BEFORE] + ') translate(' + translate[BEFORE]+ '%)'
                        }));
                    break;
                case AFTER:
                    builder.push(animate(time, style({
                        transform : 'scale(' + scale[AFTER] + ') translate(' + translate[AFTER] + '%)'
                        })));
                    break;
            }
        }

        return this.builder.build(builder);
    }

    private play(position : number, factory : any){
        let element = this.elements[position];

        if (this.players[position]){
            this.players[position].destroy();
        }
        
        this.players[position] = factory.create(element.nativeElement, {});
        this.setupPlayer(this.players[position], position);
        this.players[position].play();
    }

    private setupPlayer(player : AnimationPlayer, position : number){
        player.onStart(() => this.changeStatus(position, true));
        player.onDone(() => this.changeStatus(position, false));
    }

    private changeStatus(position : number, start : boolean){
        this.status[position] = (start ? new Date() : undefined);
    }
}
