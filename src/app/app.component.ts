import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Adal5Service } from './adal5-angular/adal5.service';
import { Adal5HTTPService } from './adal5-angular/adal5-http.service';


const config: adal.Config = {
    tenant: 'XXXXXX.onmicrosoft.com',
    clientId: 'XXXXXX-XXXXXXXX-XXXXXXXXX'
};


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    public firstBreed: any;
    public title = 'app';
    public dogsData$: Observable<any>;

    constructor(private service: Adal5Service, private http: Adal5HTTPService) {
        this.service.init(config);
    }
    ngOnInit() {
        if (environment.production) {
            this.loginUser();
        }
        this.getDummyData();
    }

    private loginUser() {
        // Handle callback if this is a redirect from Azure
        this.service.handleWindowCallback();
        // Check if the user is authenticated. If not, call the login() method
        if (!this.service.userInfo.authenticated) {
            this.service.login();
        }
        // Log the user information to the console
        console.log('username ' + this.service.userInfo.username);
        console.log('authenticated: ' + this.service.userInfo.authenticated);
        console.log('token: ' + this.service.userInfo.token);
    }

    public getDummyData() {
        this.dogsData$ = this.http.get('https://dog.ceo/api/breeds/list', { observe: 'response' })
            .map(response => response.body);

        const sub = this.dogsData$.subscribe(data => {
            this.firstBreed = data.message[0];
        });
    }

    // Logout Method
    public logout() {
        this.service.logOut();
    }
}
