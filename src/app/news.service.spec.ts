// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
      
    });
    

    service = TestBed.inject(NewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getNewsByAuthor should return correct value', () => {
    
    let author = 'author 1'
    service.news = [{ title: "title 1", by: author }, { title: "title 2", by: "author 2" }];
    
    service.getNewsByAuthor(author);
    
    expect(service.news.length).toBe(1);
    expect(service.news[0].by).toBe(author);
    expect(service.news[0].title).toBe("title 1");    
  });
  

  it("getNews should return Fake News",
    fakeAsync(() => {
      let fakeNews = [
              { title: "title 1", by: "author 1" }, 
              { title: "title 2", by: "author 2" }
            ];
                

    // Perform a request (this is fakeAsync to the responce won't be called until tick() is called)
    service.getNews();

    // Expect a call to this URL
    //const req = httpTestingController.expectOne(
      const req = httpTestingController.match(
        "http://localhost:61511/api/news"
    );

    // Assert that the request is a GET.
    expect(req[1].request.method).toEqual("GET");
    // Respond with this data when called
    
    req[1].flush(fakeNews);

    // Call tick whic actually processes te response
    tick();

    
    expect(service.news.length).toBe(2);
    expect(service.news[0].title).toBe("title 1");
    expect(service.news[0].by).toBe("author 1");    
    })
);

});
