import { AnimationBuilder, AnimationPlayer } from "@angular/animations";
import { trigger, state, style,
    animate, transition, animation,
    animateChild, query } from '@angular/animations';

const TIME = 500;

export let singleAnimation = trigger('single', [
    transition(':enter', [
        style({ transform : 'translate(0, 1000px)'}),
        animate(TIME , style({ transform : 'translate(0, 0)', background : '*'}))
    ]),
    transition(':leave', [
        style({ transform : 'translate(0, 0)'}),
        animate(TIME , style({ transform : 'translate(0, 1000px)'}))
    ])
]);

export let defaultAnimation = trigger('default', [
    transition(':enter', [
        style({ transform : 'translate(0, 1000px)'}),
        animate(TIME , style({ transform : 'translate(0, 0)', background : '*'}))
    ]),
    transition(':leave', [
        style({ transform : 'translate(0, 0)'}),
        animate(TIME , style({ transform : 'translate(0, 1000px)'}))
    ])
]);