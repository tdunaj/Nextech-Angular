import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import { NewsService } from '../news.service';
import { By } from '@angular/platform-browser';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ NewsComponent ],
      providers: [NewsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    newsService = TestBed.get(NewsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("ngFor should render to correct amount of news",
    fakeAsync(() => {
      let fakeNews = [
        { title: "title 1", by: "author 1" }, 
        { title: "title 2", by: "author 2" }
      ];
      
      newsService.news = fakeNews;
      
      fixture.whenStable().then(() => {
        fixture.detectChanges();
    
        let renderedNews = fixture.debugElement.queryAll(By.css('mat-card'));
        let renderedTitles = fixture.debugElement.queryAll(By.css('mat-card-title'));
        expect(renderedNews.length).toEqual(2);
        expect(renderedTitles.length).toEqual(2);
        expect(renderedTitles[0].nativeElement.innerHTML).toEqual("title 1");
        expect(renderedTitles[1].nativeElement.innerHTML).toEqual("title 2");
    });      
  }));
});
