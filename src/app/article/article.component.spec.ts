import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { NewsService } from '../news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { of } from 'rxjs';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let newsService: NewsService;
  let activatedRoute: ActivatedRoute;

  //this.route.snapshot.params.id;
  const fakeActivatedRoute = {
    snapshot: {
      params: {
        id: {
          get(): number {
            return 123;
        }
        
        }
      }
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ ArticleComponent ],
      providers: [ NewsService, {provide: ActivatedRoute, useValue: fakeActivatedRoute} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    newsService = TestBed.get(NewsService);
    //activatedRoute = TestBed.get(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isUrl method should return true for a proper url', () => {
    let properUrl = 'https://testurl.com';

    let result = component.isUrl(properUrl);

    expect(result).toBeTrue();
  });

  it('isUrl method should return false for improper url', () => {
    let properUrl = 'this is not a url';

    let result = component.isUrl(properUrl);

    expect(result).toBeFalse();
  }); 

  it('ngOnInit should call the newsService and correctly set the article property', () => {
    let fakeArticle = 'this is a test article';    

    spyOn(newsService, 'getArticle')    
    .and.returnValue(Promise.resolve(fakeArticle));
    
    component.ngOnInit().then(response => {
      expect(component.article).toEqual(fakeArticle);
      expect(newsService.getArticle).toHaveBeenCalled();
    });    
  });

});
