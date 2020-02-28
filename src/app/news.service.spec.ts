// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: NewsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
      
    });
    

    service = TestBed.inject(NewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    //httpClient = TestBed.inject(HttpClient);


    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
