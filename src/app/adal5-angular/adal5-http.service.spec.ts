import { Adal5User } from './adal5-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { Adal5HTTPService } from './adal5-http.service';
import { Adal5Service } from './adal5.service';
import { of } from 'rxjs/observable/of';

let service: Adal5HTTPService;
let httpClient: HttpClient;
let adal5Service: any = {};

const httpResponseOK: any = { id: 1, message: 'OK' };
const token: string = 'access_token';
const userInfo: Adal5User = {
    authenticated: true,
    username: '',
    error: '',
    token: token,
    profile: {}
};
const resource = 'resource';
const httpHeaders = [Object({ name: 'Authorization', value: 'Bearer access_token', op: 'a' })];
// httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + token);

describe('Adal5HTTPService', () => {
    beforeEach(() => {
        httpClient = jasmine.createSpyObj('httpClient', ['request']);
        adal5Service = jasmine.createSpyObj('adal5Service', ['GetResourceForEndpoint', 'acquireToken', 'init']);

        (httpClient.request as jasmine.Spy).and.returnValue(of(httpResponseOK));

        (adal5Service.GetResourceForEndpoint as jasmine.Spy).and.returnValue(resource);
        (adal5Service.acquireToken as jasmine.Spy).and.returnValue(of(token));
        (adal5Service.init as jasmine.Spy).and.callThrough();
        adal5Service.userInfo = userInfo;
        service = new Adal5HTTPService(httpClient, adal5Service);
    });

    describe('when get called', () => {
        it('should throw error when user is not authenticated', () => {
            service.get('url', { observe: 'response' })
                .subscribe(
                    (response) => {
                        expect(response).toEqual(httpResponseOK);
                    },
                    (error) => {
                        expect(error).toEqual(new Error('User Not Authenticated.'));
                    });

        });

        it('should return response for authenticated user', () => {
            service.get('url', { observe: 'response' })
                .subscribe((response) => {
                    expect(response).toEqual(httpResponseOK);
                });
        });

        it('should send request with token', () => {
            service.get('url', { observe: 'response' })
                .subscribe(
                    (response) => {
                        expect(adal5Service.acquireToken).toHaveBeenCalledWith(resource);
                        const requestCall = (httpClient.request as jasmine.Spy).calls.first();
                        expect(requestCall.args[0]).toEqual('get');
                        expect(requestCall.args[1]).toEqual('url');
                        expect(requestCall.args[2].headers.lazyUpdate).toEqual(httpHeaders);
                    });
        });
    });
});
