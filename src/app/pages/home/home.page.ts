import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';
import {New} from "../../interfaces/new";
import {NewService} from "../../services/news.service";
import { DataService, Message } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  news: New[] = []
  lastSpan: number = 0

  constructor(private NewService: NewService) {

  }

  ngOnInit(): void {
    this.NewService.getNews().subscribe(data => {
      this.news = data
    })
  }

  randomSpanning(): String {
    let span = Math.floor(Math.random() * 10) % 4 + 5
    return `span ${span}`
  }
}
