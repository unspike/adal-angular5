# adal-angular5

___

Angular 5 Active Directory Authentication Library (ADAL) wrapper package. Can be used to authenticate Angular 5 applications to Azure Active Directory.

Based on https://github.com/benbaran/adal-angular4.


## How to use it
> IMPORTANT!

Don't use `Http` and `HttpModule`, You definitely must use `HttpClient` and `HttpClientModule` instead of them.
The new interceptor is used only for request made by `HttpClient`.
When old `Http` used request will be untouched (no authorization header).

In `app.module.ts`

```typescript
import { HttpClient, HttpClientModule } from '@angular/common/http';
...
    imports: [..., HttpClientModule  ], // important! HttpClientModule replaces HttpModule
    providers: [
        Adal5Service,
        { provide: Adal5HTTPService, useFactory: Adal5HTTPService.factory, deps: [HttpClient, Adal5Service] } //  // important! HttpClient replaces Http
  ]
```
