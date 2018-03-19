import { inject } from 'adal-angular';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Adal5Service {
    constructor() {
        this.adal5User = {
            authenticated: false,
            username: '',
            error: '',
            token: '',
            profile: {}
        };
    }
    /**
     * @param {?} configOptions
     * @return {?}
     */
    init(configOptions) {
        if (!configOptions) {
            throw new Error('You must set config, when calling init.');
        }
        // redirect and logout_redirect are set to current location by default
        const /** @type {?} */ existingHash = window.location.hash;
        let /** @type {?} */ pathDefault = window.location.href;
        if (existingHash) {
            pathDefault = pathDefault.replace(existingHash, '');
        }
        configOptions.redirectUri = configOptions.redirectUri || pathDefault;
        configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;
        // create instance with given config
        this.adalContext = inject(configOptions);
        (/** @type {?} */ (window)).AuthenticationContext = this.adalContext.constructor;
        // loginresource is used to set authenticated status
        this.updateDataFromCache(this.adalContext.config.loginResource);
    }
    /**
     * @return {?}
     */
    get config() {
        return this.adalContext.config;
    }
    /**
     * @return {?}
     */
    get userInfo() {
        return this.adal5User;
    }
    /**
     * @return {?}
     */
    login() {
        this.adalContext.login();
    }
    /**
     * @return {?}
     */
    loginInProgress() {
        return this.adalContext.loginInProgress();
    }
    /**
     * @return {?}
     */
    logOut() {
        this.adalContext.logOut();
    }
    /**
     * @return {?}
     */
    handleWindowCallback() {
        const /** @type {?} */ hash = window.location.hash;
        if (this.adalContext.isCallback(hash)) {
            const /** @type {?} */ requestInfo = this.adalContext.getRequestInfo(hash);
            this.adalContext.saveTokenFromHash(requestInfo);
            if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.LOGIN) {
                this.updateDataFromCache(this.adalContext.config.loginResource);
            }
            else if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
                this.adalContext.callback = (/** @type {?} */ (window.parent)).callBackMappedToRenewStates[requestInfo.stateResponse];
            }
            if (requestInfo.stateMatch) {
                if (typeof this.adalContext.callback === 'function') {
                    if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
                        // Idtoken or Accestoken can be renewed
                        if (requestInfo.parameters['access_token']) {
                            this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
                        }
                        else if (requestInfo.parameters['error']) {
                            this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), null);
                            this.adalContext._renewFailed = true;
                        }
                    }
                }
            }
        }
        // Remove hash from url
        if (window.location.hash) {
            window.location.href = window.location.href.replace(window.location.hash, '');
        }
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    getCachedToken(resource) {
        return this.adalContext.getCachedToken(resource);
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    acquireToken(resource) {
        const /** @type {?} */ _this = this; // save outer this for inner function
        let /** @type {?} */ errorMessage;
        return Observable.bindCallback(acquireTokenInternal, function (token) {
            if (!token && errorMessage) {
                throw (errorMessage);
            }
            return token;
        })();
        /**
         * @param {?} cb
         * @return {?}
         */
        function acquireTokenInternal(cb) {
            let /** @type {?} */ s = null;
            _this.adalContext.acquireToken(resource, (error, tokenOut) => {
                if (error) {
                    _this.adalContext.error('Error when acquiring token for resource: ' + resource, error);
                    errorMessage = error;
                    cb(/** @type {?} */ (null));
                }
                else {
                    cb(tokenOut);
                    s = tokenOut;
                }
            });
            return s;
        }
    }
    /**
     * @return {?}
     */
    getUser() {
        return Observable.bindCallback((cb) => {
            this.adalContext.getUser(function (error, user) {
                if (error) {
                    this.adalContext.error('Error when getting user', error);
                    cb(null);
                }
                else {
                    cb(user);
                }
            });
        })();
    }
    /**
     * @return {?}
     */
    clearCache() {
        this.adalContext.clearCache();
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    clearCacheForResource(resource) {
        this.adalContext.clearCacheForResource(resource);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    info(message) {
        this.adalContext.info(message);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    verbose(message) {
        this.adalContext.verbose(message);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    GetResourceForEndpoint(url) {
        return this.adalContext.getResourceForEndpoint(url);
    }
    /**
     * @return {?}
     */
    refreshDataFromCache() {
        this.updateDataFromCache(this.adalContext.config.loginResource);
    }
    /**
     * @param {?} resource
     * @return {?}
     */
    updateDataFromCache(resource) {
        const /** @type {?} */ token = this.adalContext.getCachedToken(resource);
        this.adal5User.authenticated = token !== null && token.length > 0;
        const /** @type {?} */ user = this.adalContext.getCachedUser() || { userName: '', profile: undefined };
        if (user) {
            this.adal5User.username = user.userName;
            this.adal5User.profile = user.profile;
            this.adal5User.token = token;
            this.adal5User.error = this.adalContext.getLoginError();
        }
        else {
            this.adal5User.username = '';
            this.adal5User.profile = {};
            this.adal5User.token = '';
            this.adal5User.error = '';
        }
    }
    ;
}
Adal5Service.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Adal5Service.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Adal5Interceptor {
    /**
     * @param {?} adal5Service
     */
    constructor(adal5Service) {
        this.adal5Service = adal5Service;
    }
    /**
     * @param {?} request
     * @param {?} next
     * @return {?}
     */
    intercept(request, next) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.adal5Service.userInfo.token}`
            }
        });
        return next.handle(request);
    }
}
Adal5Interceptor.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Adal5Interceptor.ctorParameters = () => [
    { type: Adal5Service, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Adal5User {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Adal5HTTPService {
    /**
     * @param {?} http
     * @param {?} service
     */
    constructor(http, service) {
        this.http = http;
        this.service = service;
    }
    /**
     * @param {?} http
     * @param {?} service
     * @return {?}
     */
    static factory(http, service) {
        return new Adal5HTTPService(http, service);
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    get(url, options) {
        return this.sendRequest('get', url, options);
    }
    /**
     * @param {?} url
     * @param {?} body
     * @param {?} options
     * @return {?}
     */
    post(url, body, options) {
        options.body = body;
        return this.sendRequest('post', url, options);
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    delete(url, options) {
        return this.sendRequest('delete', url, options);
    }
    /**
     * @param {?} url
     * @param {?} body
     * @param {?} options
     * @return {?}
     */
    patch(url, body, options) {
        options.body = body;
        return this.sendRequest('patch', url, options);
    }
    /**
     * @param {?} url
     * @param {?} body
     * @param {?} options
     * @return {?}
     */
    put(url, body, options) {
        options.body = body;
        return this.sendRequest('put', url, options);
    }
    /**
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    head(url, options) {
        return this.sendRequest('head', url, options);
    }
    /**
     * @param {?} method
     * @param {?} url
     * @param {?} options
     * @return {?}
     */
    sendRequest(method, url, options) {
        const /** @type {?} */ resource = this.service.GetResourceForEndpoint(url);
        let /** @type {?} */ authenticatedCall;
        if (resource) {
            if (this.service.userInfo.authenticated) {
                authenticatedCall = this.service.acquireToken(resource)
                    .flatMap((token) => {
                    if (options.headers == null) {
                        options.headers = new HttpHeaders();
                    }
                    options.headers = options.headers.append('Authorization', 'Bearer ' + token);
                    return this.http.request(method, url, options)
                        .catch(this.handleError);
                });
            }
            else {
                authenticatedCall = Observable.throw(new Error('User Not Authenticated.'));
            }
        }
        else {
            authenticatedCall = this.http.request(method, url, options).catch(this.handleError);
        }
        return authenticatedCall;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        // In a real world app, we might send the error to remote logging infrastructure
        const /** @type {?} */ errMsg = error.message || 'Server error';
        console.error(JSON.stringify(error)); // log to console instead
        return Observable.throw(error);
    }
}
Adal5HTTPService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Adal5HTTPService.ctorParameters = () => [
    { type: HttpClient, },
    { type: Adal5Service, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Adal5AngularModule {
}
Adal5AngularModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [
                    Adal5User, Adal5Service, Adal5HTTPService, Adal5Interceptor
                ],
                providers: [
                    { provide: HTTP_INTERCEPTORS, useClass: Adal5Interceptor, multi: true }
                ],
            },] },
];
/** @nocollapse */
Adal5AngularModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { Adal5AngularModule, Adal5HTTPService as ɵc, Adal5Interceptor as ɵd, Adal5User as ɵa, Adal5Service as ɵb };
//# sourceMappingURL=adal-angular5.js.map
