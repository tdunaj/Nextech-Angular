import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from "@angular/platform-browser";

import { NewsSearchComponent } from './news-search.component';
import { NewsService } from '../news.service';


describe('NewsSearchComponent', () => {
  let component: NewsSearchComponent;
  let fixture: ComponentFixture<NewsSearchComponent>;
  let service: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ NewsSearchComponent ],
      providers: [NewsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('getNews method should call the NewsService getNews()', () => {
    let newsService = jasmine.createSpyObj('NewsService', ['getNews']);
    let newsSearchComponent = new NewsSearchComponent(newsService);

    newsSearchComponent.getNews();

    expect(newsService.getNews).toHaveBeenCalledTimes(1);
  });

  it('doSearch method should call the NewsService getNewsByAuthor()', () => {
    let newsService = jasmine.createSpyObj('NewsService', ['getNewsByAuthor']);
    let newsSearchComponent = new NewsSearchComponent(newsService);

    newsSearchComponent.doSearch();

    expect(newsService.getNewsByAuthor).toHaveBeenCalledTimes(1);
  });

  it('clicking the search button should execute the doSearch method', async(() => { 
    spyOn(component, 'doSearch');
  
    let button = fixture.debugElement.nativeElement.querySelector('button');        
    button.click();
    
    fixture.whenStable().then(() => {
      expect(component.doSearch).toHaveBeenCalled();
    });
  }));
});
