import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Response } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  BASE_URL: string = 'http://localhost:61511/api/news'; //Update to your localhost url

  news: any = [];

  constructor(private http: HttpClient) {     
    this.getNews();
  }

  getNews(): void {
    
      this.http.get(this.BASE_URL).subscribe(response => {
        this.news = response;  
      }, error => {
        //todo: diplay error and log
      console.error(error);
      });        
  }

  getNewsByAuthor(author: string): void {    
    this.news = this.news.filter(newsItem => newsItem.by === author);
  }

  async getArticle(articleId: number): Promise<string> {
    let article = await this.http.get(this.BASE_URL + '/article/' + articleId,  { responseType: 'text' }).toPromise();
    return article;    
  }
}
