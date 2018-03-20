import { Observable } from 'rxjs/Observable';
import { Adal5HTTPService } from './adal5-angular/adal5-http.service';
import { Adal5Service } from './adal5-angular/adal5.service';
import { AppComponent } from './app.component';
import { getTestBed, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
    let injector: TestBed;
    let httpClient: HttpClient;
    let adal5Service: Adal5Service;
    let adal5HTTPService: Adal5HTTPService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [AppComponent],
            providers: [Adal5Service, Adal5HTTPService, HttpClient]
        }).compileComponents();

        injector = getTestBed();
        httpClient = injector.get(HttpClient);

        adal5Service = TestBed.get(Adal5Service);
        adal5HTTPService = TestBed.get(Adal5HTTPService);
    });
    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    it(`should have as title 'app'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        fixture.componentInstance.ngOnInit();
        expect(app.title).toEqual('app');

    });
    it('should render title in a h1 tag', (done) => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        fixture.componentInstance.dogsData$.subscribe(dogsData => {
            fixture.detectChanges();
            const actualText = compiled.querySelector('#dogsDiv').textContent;
            expect(actualText).toContain(`first Breed: affenpinscher`);
            done();
        });
    });

});
