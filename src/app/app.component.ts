import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Adal5Service } from './adal5-angular/adal5.service';
import { adal } from './adal5-angular/adal';
import { Adal5HTTPService } from './adal5-angular/adal5-http.service';


const config: adal.Config = {
    tenant: 'XXXXXX.onmicrosoft.com',
    clientId: 'XXXXXX-XXXXXXXX-XXXXXXXXX'
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'app';
    public dogs: Observable<any>;

    constructor(private service: Adal5Service, private http: Adal5HTTPService) {
        this.service.init(config);
    }
    ngOnInit() {
        // Handle callback if this is a redirect from Azure
        this.service.handleWindowCallback();

        // Check if the user is authenticated. If not, call the login() method
        if (!this.service.userInfo.authenticated) {
            this.service.login();
        }

        // Log the user information to the console
        console.log('username ' + this.service.userInfo.username);

        console.log('authenticated: ' + this.service.userInfo.authenticated);

        console.log('name: ' + this.service.userInfo.profile.name);

        console.log('token: ' + this.service.userInfo.token);

        console.log(this.service.userInfo.profile);

        this.dogs = this.http.get('https://dog.ceo/api/breeds/image/random', { observe: 'response' }).map(response => response.body);
    }

    // Logout Method
    public logout() {
        this.service.logOut();
    }
}
