import { trigger, state, style,
    animate, transition, animation,
    animateChild, query } from '@angular/animations';

const STATES = ["normal", "mouseOver", "leftMove", "rightMove"];
const SIZES = ["default", "maximise", "minimise"];

export let ClassfieldState = trigger('classfieldState', [
            state(STATES[0], style({
                transform: 'translateX(0%) scale(1)'
            })),
            state(STATES[1], style({
                transform: 'translateX(0%) scale(1.4)'
            })),
            state(STATES[2], style({
                transform: 'translateX(-22%) scale(1)'
            })),
            state(STATES[3], style({
                transform: 'translateX(22%) scale(1)'
            })),
            transition('normal <=> mouseOver', animate('500ms ease-in')),
            transition('normal <=> leftMove', animate('500ms ease-in')),
            transition('normal <=> rightMove', animate('500ms ease-in')),
        ]);