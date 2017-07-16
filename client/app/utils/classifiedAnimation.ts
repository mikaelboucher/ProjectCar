import { AnimationBuilder, AnimationPlayer } from "@angular/animations";
import { trigger, state, style,
    animate, transition, animation,
    animateChild, query } from '@angular/animations';

export let singleAnimation = trigger('single', [
    transition(':enter', [
        style({ transform : 'translate(0, 1000px)'}),
        animate(500 , style({ transform : 'translate(0, 0)', background : '*'}))
    ]),
    transition(':leave', [
        style({ transform : 'translate(0, 0)'}),
        animate(500 , style({ transform : 'translate(0, 1000px)'}))
    ])
]);

export let defaultAnimation = trigger('default', [
    transition(':enter', [
        style({opacity : 1})
    ]),
    transition(':leave', [
        style({opacity : 1}),
        animate(1000 , style({opacity : 0}))
    ])
]);