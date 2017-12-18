import { Observable } from 'rxjs/Rx';
import { Adal5Service } from './adal5.service';
import { HttpClient } from '@angular/common/http';
/**
 *
 *
 * @export
 * @class Adal5HTTPService
 */
export declare class Adal5HTTPService {
    private http;
    private service;
    /**
     *
     *
     * @static
     * @param {HttpClient} http
     * @param {Adal5Service} service
     *
     * @memberOf Adal5HTTPService
     */
    static factory(http: HttpClient, service: Adal5Service): Adal5HTTPService;
    /**
     * Creates an instance of Adal5HTTPService.
     * @param {HttpClient} http
     * @param {Adal5Service} service
     *
     * @memberOf Adal5HTTPService
     */
    constructor(http: HttpClient, service: Adal5Service);
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    get(url: string, options?: any): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    post(url: string, body: any, options?: any): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    delete(url: string, options?: any): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    patch(url: string, body: any, options?: any): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} body
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    put(url: string, body: any, options?: any): Observable<any>;
    /**
     *
     *
     * @param {string} url
     * @param {*} [options]
     * @returns {Observable<any>}
     *
     * @memberOf Adal5HTTPService
     */
    head(url: string, options?: any): Observable<any>;
    /**
     *
     *
     * @private
     * @param {string} url
     * @param {RequestOptionsArgs} options
     * @returns {Observable<string>}
     *
     * @memberOf Adal5HTTPService
     */
    private sendRequest(method, url, options, body?);
    /**
     *
     *
     * @private
     * @param {*} error
     * @returns
     *
     * @memberOf Adal5HTTPService
     */
    private handleError(error);
}
