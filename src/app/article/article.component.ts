import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { NewsService } from '../news.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: string = '';

  constructor(private newsService:NewsService, private route:ActivatedRoute) { }

  async ngOnInit() {    
    let articleId = this.route.snapshot.params.id
    this.article = await this.newsService.getArticle(articleId);
    //console.log(response);
  }

}
