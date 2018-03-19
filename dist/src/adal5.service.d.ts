import { adal } from 'adal-angular';
import { Adal5User } from './adal5-user';
import { Observable } from 'rxjs/Rx';
export declare class Adal5Service {
    private adalContext;
    private adal5User;
    constructor();
    init(configOptions: adal.Config): void;
    readonly config: adal.Config;
    readonly userInfo: Adal5User;
    login(): void;
    loginInProgress(): boolean;
    logOut(): void;
    handleWindowCallback(): void;
    getCachedToken(resource: string): string;
    acquireToken(resource: string): Observable<string>;
    getUser(): Observable<any>;
    clearCache(): void;
    clearCacheForResource(resource: string): void;
    info(message: string): void;
    verbose(message: string): void;
    GetResourceForEndpoint(url: string): string;
    refreshDataFromCache(): void;
    private updateDataFromCache(resource);
}
