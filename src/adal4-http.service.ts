import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Adal4Service } from './adal4.service';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 *
 *
 * @export
 * @class Adal4HTTPService
 */
@Injectable()
export class Adal4HTTPService {

  /**
   *
   *
   * @static
   * @param {HttpClient} http
   * @param {Adal4Service} service
   *
   * @memberOf Adal4HTTPService
   */
  static factory(http: HttpClient, service: Adal4Service) {
    return new Adal4HTTPService(http, service);
  }

  /**
   * Creates an instance of Adal4HTTPService.
   * @param {HttpClient} http
   * @param {Adal4Service} service
   *
   * @memberOf Adal4HTTPService
   */
  constructor(
    private http: HttpClient,
    private service: Adal4Service
  ) { }

  /**
   *
   *
   * @param {string} url
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal4HTTPService
   */
  get(url: string, options?: any): Observable<any> {
    return this.sendRequest('get', url, options);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal4HTTPService
   */
  post(url: string, body: any, options?: any): Observable<any> {
    return this.sendRequest('post', url, options, body);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal4HTTPService
   */
  delete(url: string, options?: any): Observable<any> {
    return this.sendRequest('delete', url, options);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal4HTTPService
   */
  patch(url: string, body: any, options?: any): Observable<any> {
    return this.sendRequest('patch', url, options, body);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} body
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal4HTTPService
   */
  put(url: string, body: any, options?: any): Observable<any> {
    return this.sendRequest('put', url, options, body);
  }

  /**
   *
   *
   * @param {string} url
   * @param {*} [options]
   * @returns {Observable<any>}
   *
   * @memberOf Adal4HTTPService
   */
  head(url: string, options?: any): Observable<any> {
    return this.sendRequest('head', url, options);
  }

  /**
   *
   *
   * @private
   * @param {string} url
   * @param {RequestOptionsArgs} options
   * @returns {Observable<string>}
   *
   * @memberOf Adal4HTTPService
   */
  private sendRequest(method: string, url: string, options: any, body?: any): Observable<string> {
    const resource = this.service.GetResourceForEndpoint(url);
    let authenticatedCall: Observable<string>;
    if (resource) {
      if (this.service.userInfo.authenticated) {
        authenticatedCall = this.service.acquireToken(resource)
          .flatMap((token: string) => {
            return this.http.request(method, url, options)
              .catch(this.handleError);
          });
      } else {
        authenticatedCall = Observable.throw(new Error('User Not Authenticated.'));
      }
    } else { authenticatedCall = this.http.request(method, url, options).catch(this.handleError); }

    return authenticatedCall;
  }

  /**
   *
   *
   * @private
   * @param {*} error
   * @returns
   *
   * @memberOf Adal4HTTPService
   */
  private handleError(error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    const errMsg = error.message || 'Server error';
    console.error(JSON.stringify(error)); // log to console instead

    return Observable.throw(error);
  }
}
