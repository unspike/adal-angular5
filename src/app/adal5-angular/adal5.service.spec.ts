import { TestBed, inject } from '@angular/core/testing';

import { Adal5Service } from './adal5.service';
import { HttpClient } from '@angular/common/http';

let service: Adal5Service;
const invalidAdalConfig: adal.Config = null;
const validAdalConfig: adal.Config = { clientId: 'testClientId' };

describe('Adal5Service', () => {
    beforeEach(() => {
        service = new Adal5Service();
    });
    describe('when init called', () => {
        it('should throw error when config is empty', () => {
            try {
                service.init(invalidAdalConfig);
            } catch (error) {
                expect(error).toEqual(new Error('You must set config, when calling init.'));
            }
        });
        it('should append [redirectUri, postLogoutRedirectUri] if not set ', () => {
            service.init(validAdalConfig);
            const defaultPath = window.location.href;
            expect(validAdalConfig.redirectUri).toEqual(defaultPath);
            expect(validAdalConfig.postLogoutRedirectUri).toEqual(defaultPath);
        });
    });
});
