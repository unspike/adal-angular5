import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Adal4Interceptor } from './adal4-interceptor';
import { Adal4User } from './adal4-user';
import { Adal4Service } from './adal4.service';
import { Adal4HTTPService } from './adal4-http.service';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        Adal4User, Adal4Service, Adal4HTTPService, Adal4Interceptor
    ],
    providers: [,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Adal4Interceptor,
            multi: true
        },
    ],
})
export class Adal4AgnularModule { }