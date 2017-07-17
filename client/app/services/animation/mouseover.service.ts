import { AnimationBuilder, AnimationPlayer } from "@angular/animations";
import { trigger, state, style,
    animate, transition, animation,
    animateChild, query } from '@angular/animations';
import { AnimationData } from './animationdata';
import { Extra } from '../../utils/extra';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

const ANIMATION = 200;
const DELAY = 250;
const REBOUND_EFFECT = 100;

const BEFORE = 0;
const AFTER = 1;

const IN = 0;
const OUT = 1;

const OK = true;

@Injectable()
export class MouseOverService{
    static animationData : AnimationData;
    private players: AnimationPlayer[];
    private elements : any[];
    private positionFocus : number;
    private firstFocus : boolean;
    private animationDelay : any[];
    private animationDone : Subject<{index : number, mouseOver : boolean}>;

    constructor(private builder: AnimationBuilder) {
        if (!MouseOverService.animationData){
            MouseOverService.animationData = new AnimationData();
        }
        this.players = [];
        this.animationDelay = new Array(2);
        this.firstFocus = true;
        this.animationDone = new Subject<{index : number, mouseOver : boolean}>();
    }

    public init(elements : any[]){
        this.elements = elements;
        this.initAffichage(elements);
        console.log('init');
    }

    public mouseover(posFocus : number){
        if (posFocus !== this.positionFocus){

            this.delay();

            this.animationDelay[IN] = setTimeout( () => {
                if (this.positionFocus || this.positionFocus === 0){
                    let focus = {new : posFocus, old : this.positionFocus};
                    this.changeFocus(focus);
                }else{
                    this.elements.forEach((classified, nbClassified)=> {
                        let focus = nbClassified === posFocus;
                        let left = nbClassified < posFocus;
                        this.transform(nbClassified, focus, OK, left);
                    });
                }
                let first = {index : posFocus, mouseOver : true};
                let second = (this.positionFocus !== undefined
                ? {index : this.positionFocus, mouseOver : false} : undefined );
                this.setupPlayer(first, second);
                this.positionFocus = posFocus;
                this.firstFocus = false;
            }, DELAY);
        }
    }

    public mouseleave(position : number){
        
        this.delay();

        if (!this.firstFocus){
            this.animationDelay[OUT] = setTimeout( () => {
                this.elements.forEach( (classified, nbClassified) => {
                    let focus = nbClassified === this.positionFocus;
                    let left = nbClassified < this.positionFocus && !focus;
                    this.transform(nbClassified, focus, false, left);
                });
                let first = {index : this.positionFocus, mouseOver : false};
                this.setupPlayer(first);
                let oldFocus = this.positionFocus;
                this.positionFocus = undefined;
                setTimeout( () => this.firstFocus = !this.positionFocus, REBOUND_EFFECT);
            }, REBOUND_EFFECT);
        }
    }

    public cancel(){
        this.delay();
    }
    
    private delay(){
        this.animationDelay.forEach((delayID) => {
            if (delayID){
                clearTimeout(delayID);
                delayID = undefined;
            }
        })
    }

    public changeDimension(width : number, test? : boolean) : number{
        if (test){
            console.log(width);
        }
        return MouseOverService.animationData.changeDimensison(width);
    }

    public get onDone() : Observable<{index : number, mouseOver : boolean}>{
        return this.animationDone.asObservable();
    }

    public get width(){
        return MouseOverService.animationData.width;
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

        let scale = [MouseOverService.animationData.defaultSize, MouseOverService.animationData.defaultSize];
        let translateY = [0, 0];
        if (propreties.focus){
            scale[AFTER] = MouseOverService.animationData.focusSize;
            translateY[AFTER] = MouseOverService.animationData.translateY;
        }

        let translateX = [0, 0];
        if (propreties.left !== undefined){
            translateX[AFTER] = MouseOverService.animationData.translateX(propreties.left);
        }

        if (propreties.inverseScale || propreties.inverseAll){
            scale = Extra.swap(scale)
            translateY = Extra.swap(translateY);
        }

        if (propreties.inverseTranslate || propreties.inverseAll){
            translateX = Extra.swap(translateX);
        }

        if (propreties.leftToRight !== undefined || propreties.rightToLeft !== undefined){
            let left = propreties.leftToRight !== undefined;
            translateX[BEFORE] = MouseOverService.animationData.translateX(left);
            translateX[AFTER] = MouseOverService.animationData.translateX(!left);
        }

        let time = ANIMATION;

        let builder = [];
        for (let i = 0 ; i < nbState ; i++){
            switch(i){
                
                case BEFORE:
                    builder.push(style({ 
                        transform : 'translate(' + translateX[BEFORE]+ '%, ' + translateY[BEFORE] + '%) '
                        + 'scale(' + scale[BEFORE] + ')'
                        }));
                    break;
                case AFTER:
                    builder.push(animate(time, style({
                        transform : 'translate(' + translateX[AFTER] + '%, ' + translateY[AFTER] + '%) '
                        + ' scale(' + scale[AFTER] + ')'
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
        this.players[position].play();
    }

    private setupPlayer(...classifieds : {index : number, mouseOver : boolean}[]){
        classifieds.forEach((classified) => {
            if (classified){
                if (!classified.mouseOver){
                    setTimeout(() => this.animationDone.next(classified), 100);
                }
                this.players[classified.index].onDone(() => {
                    this.animationDone.next(classified);
                    this.unSetupPlayer(classified.index);
                    if (!classified.mouseOver){
                        setTimeout(() => this.animationDone.next(classified), 100);
                    }
                });
            }
        });
    }

    private unSetupPlayer(position : number){
        this.players[position].onDone(() => { return; });
    }
}
