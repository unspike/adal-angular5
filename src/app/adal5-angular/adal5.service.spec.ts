import { TestBed, inject } from '@angular/core/testing';

import { Adal5Service } from './adal5.service';
import { HttpClient } from '@angular/common/http';

let service: Adal5Service;
describe('Adal5Service', () => {
    beforeEach(() => {
        service = new Adal5Service();
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });
});
