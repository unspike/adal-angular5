import { Observable } from 'rxjs/Rx';
import { Adal5Service } from './adal5.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
export declare class Adal5HTTPService {
    private http;
    private service;
    static factory(http: HttpClient, service: Adal5Service): Adal5HTTPService;
    constructor(http: HttpClient, service: Adal5Service);
    get(url: string, options?: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe?: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
        withCredentials?: boolean;
    }): Observable<any>;
    post(url: string, body: any, options?: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe?: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
        withCredentials?: boolean;
    }): Observable<any>;
    delete(url: string, options?: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe?: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
        withCredentials?: boolean;
    }): Observable<any>;
    patch(url: string, body: any, options?: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe?: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
        withCredentials?: boolean;
    }): Observable<any>;
    put(url: string, body: any, options?: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe?: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
        withCredentials?: boolean;
    }): Observable<any>;
    head(url: string, options?: {
        body?: any;
        headers?: HttpHeaders;
        reportProgress?: boolean;
        observe?: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
        withCredentials?: boolean;
    }): Observable<any>;
    private sendRequest(method, url, options?);
    private handleError(error);
}
