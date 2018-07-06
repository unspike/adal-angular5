"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var adal5_service_1 = require("./adal5.service");
describe('Adal5Service', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [adal5_service_1.Adal5Service]
        });
    });
    it('should ...', testing_1.inject([adal5_service_1.Adal5Service], function (service) {
        expect(service).toBeTruthy();
    }));
});
