import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.css']
})
export class NewsSearchComponent implements OnInit {

  author: string = "";

  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
  }

  getNews(): void {
    this.newsService.getNews();    
  }

  doSearch(): void {    
    this.newsService.getNewsByAuthor(this.author);    
  }

}
