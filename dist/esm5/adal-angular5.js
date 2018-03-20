import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { inject } from 'adal-angular';
import { Observable as Observable$1 } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

var Adal5Service = (function () {
    function Adal5Service() {
        this.adal5User = {
            authenticated: false,
            username: '',
            error: '',
            token: '',
            profile: {}
        };
    }
    Adal5Service.prototype.init = function (configOptions) {
        if (!configOptions) {
            throw new Error('You must set config, when calling init.');
        }
        var existingHash = window.location.hash;
        var pathDefault = window.location.href;
        if (existingHash) {
            pathDefault = pathDefault.replace(existingHash, '');
        }
        configOptions.redirectUri = configOptions.redirectUri || pathDefault;
        configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;
        this.adalContext = inject(configOptions);
        ((window)).AuthenticationContext = this.adalContext.constructor;
        this.updateDataFromCache(this.adalContext.config.loginResource);
    };
    Object.defineProperty(Adal5Service.prototype, "config", {
        get: function () {
            return this.adalContext.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Adal5Service.prototype, "userInfo", {
        get: function () {
            return this.adal5User;
        },
        enumerable: true,
        configurable: true
    });
    Adal5Service.prototype.login = function () {
        this.adalContext.login();
    };
    Adal5Service.prototype.loginInProgress = function () {
        return this.adalContext.loginInProgress();
    };
    Adal5Service.prototype.logOut = function () {
        this.adalContext.logOut();
    };
    Adal5Service.prototype.handleWindowCallback = function () {
        var hash = window.location.hash;
        if (this.adalContext.isCallback(hash)) {
            var requestInfo = this.adalContext.getRequestInfo(hash);
            this.adalContext.saveTokenFromHash(requestInfo);
            if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.LOGIN) {
                this.updateDataFromCache(this.adalContext.config.loginResource);
            }
            else if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
                this.adalContext.callback = ((window.parent)).callBackMappedToRenewStates[requestInfo.stateResponse];
            }
            if (requestInfo.stateMatch) {
                if (typeof this.adalContext.callback === 'function') {
                    if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
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
        if (window.location.hash) {
            window.location.href = window.location.href.replace(window.location.hash, '');
        }
    };
    Adal5Service.prototype.getCachedToken = function (resource) {
        return this.adalContext.getCachedToken(resource);
    };
    Adal5Service.prototype.acquireToken = function (resource) {
        var _this = this;
        var errorMessage;
        return Observable.bindCallback(acquireTokenInternal, function (token) {
            if (!token && errorMessage) {
                throw (errorMessage);
            }
            return token;
        })();
        function acquireTokenInternal(cb) {
            var s = null;
            _this.adalContext.acquireToken(resource, function (error, tokenOut) {
                if (error) {
                    _this.adalContext.error('Error when acquiring token for resource: ' + resource, error);
                    errorMessage = error;
                    cb((null));
                }
                else {
                    cb(tokenOut);
                    s = tokenOut;
                }
            });
            return s;
        }
    };
    Adal5Service.prototype.getUser = function () {
        var _this = this;
        return Observable.bindCallback(function (cb) {
            _this.adalContext.getUser(function (error, user) {
                if (error) {
                    this.adalContext.error('Error when getting user', error);
                    cb(null);
                }
                else {
                    cb(user);
                }
            });
        })();
    };
    Adal5Service.prototype.clearCache = function () {
        this.adalContext.clearCache();
    };
    Adal5Service.prototype.clearCacheForResource = function (resource) {
        this.adalContext.clearCacheForResource(resource);
    };
    Adal5Service.prototype.info = function (message) {
        this.adalContext.info(message);
    };
    Adal5Service.prototype.verbose = function (message) {
        this.adalContext.verbose(message);
    };
    Adal5Service.prototype.GetResourceForEndpoint = function (url) {
        return this.adalContext.getResourceForEndpoint(url);
    };
    Adal5Service.prototype.refreshDataFromCache = function () {
        this.updateDataFromCache(this.adalContext.config.loginResource);
    };
    Adal5Service.prototype.updateDataFromCache = function (resource) {
        var token = this.adalContext.getCachedToken(resource);
        this.adal5User.authenticated = token !== null && token.length > 0;
        var user = this.adalContext.getCachedUser() || { userName: '', profile: undefined };
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
    };
    
    return Adal5Service;
}());
Adal5Service.decorators = [
    { type: Injectable },
];
Adal5Service.ctorParameters = function () { return []; };
var Adal5HTTPService = (function () {
    function Adal5HTTPService(http, service) {
        this.http = http;
        this.service = service;
    }
    Adal5HTTPService.factory = function (http, service) {
        return new Adal5HTTPService(http, service);
    };
    Adal5HTTPService.prototype.get = function (url, options) {
        return this.sendRequest('get', url, options);
    };
    Adal5HTTPService.prototype.post = function (url, body, options) {
        options.body = body;
        return this.sendRequest('post', url, options);
    };
    Adal5HTTPService.prototype.delete = function (url, options) {
        return this.sendRequest('delete', url, options);
    };
    Adal5HTTPService.prototype.patch = function (url, body, options) {
        options.body = body;
        return this.sendRequest('patch', url, options);
    };
    Adal5HTTPService.prototype.put = function (url, body, options) {
        options.body = body;
        return this.sendRequest('put', url, options);
    };
    Adal5HTTPService.prototype.head = function (url, options) {
        return this.sendRequest('head', url, options);
    };
    Adal5HTTPService.prototype.sendRequest = function (method, url, options) {
        var _this = this;
        var resource = this.service.GetResourceForEndpoint(url);
        var authenticatedCall;
        if (resource) {
            if (this.service.userInfo.authenticated) {
                authenticatedCall = this.service.acquireToken(resource)
                    .flatMap(function (token) {
                    if (options.headers == null) {
                        options.headers = new HttpHeaders();
                    }
                    options.headers = options.headers.append('Authorization', 'Bearer ' + token);
                    return _this.http.request(method, url, options)
                        .catch(_this.handleError);
                });
            }
            else {
                authenticatedCall = Observable$1.throw(new Error('User Not Authenticated.'));
            }
        }
        else {
            authenticatedCall = this.http.request(method, url, options).catch(this.handleError);
        }
        return authenticatedCall;
    };
    Adal5HTTPService.prototype.handleError = function (error) {
        var errMsg = error.message || 'Server error';
        console.error(JSON.stringify(error));
        return Observable$1.throw(error);
    };
    return Adal5HTTPService;
}());
Adal5HTTPService.decorators = [
    { type: Injectable },
];
Adal5HTTPService.ctorParameters = function () { return [
    { type: HttpClient, },
    { type: Adal5Service, },
]; };
var Adal5Interceptor = (function () {
    function Adal5Interceptor(adal5Service) {
        this.adal5Service = adal5Service;
    }
    Adal5Interceptor.prototype.intercept = function (request, next) {
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.adal5Service.userInfo.token
            }
        });
        return next.handle(request);
    };
    return Adal5Interceptor;
}());
Adal5Interceptor.decorators = [
    { type: Injectable },
];
Adal5Interceptor.ctorParameters = function () { return [
    { type: Adal5Service, },
]; };
var Adal5User = (function () {
    function Adal5User() {
    }
    return Adal5User;
}());
var Adal5AngularModule = (function () {
    function Adal5AngularModule() {
    }
    return Adal5AngularModule;
}());
Adal5AngularModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
            },] },
];
Adal5AngularModule.ctorParameters = function () { return []; };

export { Adal5HTTPService, Adal5Interceptor, Adal5User, Adal5Service, Adal5AngularModule };
//# sourceMappingURL=adal-angular5.js.map
