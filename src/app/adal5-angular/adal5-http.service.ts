// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Adal5Service } from './adal5.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class Adal5HTTPService {

    static factory(http: HttpClient, service: Adal5Service) {
        return new Adal5HTTPService(http, service);
    }


    constructor(
        private http: HttpClient,
        private service: Adal5Service
    ) { }

    get(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        return this.sendRequest('get', url, options);
    }

    post(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        options.body = body;
        return this.sendRequest('post', url, options);
    }

    delete(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        return this.sendRequest('delete', url, options);
    }

    patch(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        options.body = body;
        return this.sendRequest('patch', url, options);
    }

    put(url: string, body: any, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        options.body = body;
        return this.sendRequest('put', url, options);
    }

    head(url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<any> {
        return this.sendRequest('head', url, options);
    }

    private sendRequest(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | { [param: string]: string | string[]; };
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<string> {
        const resource = this.service.GetResourceForEndpoint(url);
        let authenticatedCall: Observable<string>;
        if (resource) {
            if (this.service.userInfo.authenticated) {
                authenticatedCall = this.service.acquireToken(resource)
                    .flatMap((token: string) => {
                        if (options.headers == null) {
                            options.headers = new HttpHeaders();
                        }
                        options.headers = options.headers.append('Authorization', 'Bearer ' + token);
                        return this.http.request(method, url, options)
                            .catch(this.handleError);
                    });
            } else {
                authenticatedCall = Observable.throw(new Error('User Not Authenticated.'));
            }
        } else {
            authenticatedCall = this.http.request(method, url, options).catch(this.handleError);
        }

        return authenticatedCall;
    }

    private handleError(error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        const errMsg = error.message || 'Server error';
        console.error(JSON.stringify(error)); // log to console instead

        return Observable.throw(error);
    }
}
