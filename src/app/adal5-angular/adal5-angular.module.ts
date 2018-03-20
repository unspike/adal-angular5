import { Adal5User } from './adal5-user';
import { Adal5Service } from './adal5.service';
import { Adal5Interceptor } from './adal5-interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Adal5HTTPService } from './adal5-http.service';

export { Adal5HTTPService } from './adal5-http.service';
export { Adal5Interceptor } from './adal5-interceptor';
export { Adal5User } from './adal5-user';
export { Adal5Service } from './adal5.service';

@NgModule({
    imports: [CommonModule],
})
export class Adal5AngularModule { }
