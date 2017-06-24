import { AnimationService } from '../services/animation.service';
import { TestBed, async, inject } from '@angular/core/testing';

import { expect } from 'chai';
import 'mocha';

describe('animation.Service', () => {

     beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AnimationService],
            providers: [AnimationService]
        });
    });

    it('should be an object',
        inject([AnimationService], (service: AnimationService) => {
            expect(service).to.be.an('object');
        })
    );

});
