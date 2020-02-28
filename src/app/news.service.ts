import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  BASE_URL = 'http://localhost:61511/api/news'; //Update to your localhost url

  news: any = [];

  constructor(private http: HttpClient) {     
    this.getNews();
  }

  getNews() {
    
      this.http.get(this.BASE_URL).subscribe(response => {
        this.news = response;  
      }, error => {
        //todo: diplay error and log
      console.error(error);
      });        
  }

  getNewsByAuthor(author: string) {    
    this.news = this.news.filter(newsItem => newsItem.by === author);
  }
}
