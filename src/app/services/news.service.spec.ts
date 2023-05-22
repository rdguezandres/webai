import { TestBed } from '@angular/core/testing';
import { NewService } from './news.service';
describe('HomeService', () => {
    let service: NewService;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NewService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});