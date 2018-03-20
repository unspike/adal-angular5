import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Adal5Service } from './adal5-angular/adal5.service';
import { Adal5HTTPService } from './adal5-angular/adal5-http.service';
import { Adal5AngularModule } from './adal5-angular/adal5-angular.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        Adal5AngularModule
    ],
    providers: [
        HttpClient,
        Adal5Service,
        { provide: Adal5HTTPService, useFactory: Adal5HTTPService.factory, deps: [HttpClient, Adal5Service] }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
