"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var adal5_http_service_1 = require("./adal5-http.service");
describe('Adal5HTTPService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [adal5_http_service_1.Adal5HTTPService]
        });
    });
    it('should ...', testing_1.inject([adal5_http_service_1.Adal5HTTPService], function (service) {
        expect(service).toBeTruthy();
    }));
});
