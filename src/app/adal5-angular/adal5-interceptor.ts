import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Adal5Service } from './adal5.service';

@Injectable()
export class Adal5Interceptor implements HttpInterceptor {
    constructor(public adal5Service: Adal5Service) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // if the endpoint is not registered then pass
        // the request as it is to the next handler
        const resource = this.adal5Service.GetResourceForEndpoint(req.url);
        if (!resource) {
            return next.handle(req.clone());
        }

        // if the user is not authenticated then drop the request
        if (!this.adal5Service.userInfo.authenticated) {
            throw new Error('Cannot send request to registered endpoint if the user is not authenticated.');
        }

        // if the endpoint is registered then acquire and inject token
        let headers = req.headers || new HttpHeaders();
        return this.adal5Service.acquireToken(resource)
            .mergeMap((token: string) => {
                // inject the header
                headers = headers.append('Authorization', 'Bearer ' + token);
                return next.handle(req.clone({ headers: headers }));
            }
            );
    }
}
