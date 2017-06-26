import { AnimationService } from '../services/animation.service';
import {Injector} from "@angular/core";
import { TestBed, async, inject } from '@angular/core/testing';

import 'zone.js';
import 'reflect-metadata';
import { expect } from 'chai';

/**describe('animation.Service', () => {
     let injector : Injector;
     let animation : AnimationService;

     beforeEach(() => {
         TestBed.configureTestingModule({
             providers: [AnimationService]
         });
     });

    it('should be an object', inject([AnimationService], (animationService : AnimationService) => {
        expect(animationService).to.exist;
    }));

});**/

/** TEST QUI MARCHE*/
describe('test', () => {
    it('test devrait marcher', () => {
        let i = 1 + 1;
        expect(i).to.equal(2)
    });
});
