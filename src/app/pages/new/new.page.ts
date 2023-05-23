import { Component } from '@angular/core';
import { New } from "../../interfaces/new";
import { ActivatedRoute } from "@angular/router";
import { NewService } from "../../services/news.service";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: 'app-new-page',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage {
  newId: number = 0;
  new: New = {
    id: 0,
    title: '',
    content: '',
    img: '',
  };
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private newService: NewService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.newId = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    this.newService.getNews().subscribe(data => {
      this.new = data.filter(newItem => newItem.id == this.newId)[0];
    });
    this.isFavorite = this.favoritesService.isFavorite(this.new);
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoritesService.removeFavorite(this.new);
    } else {
      this.favoritesService.addFavorite(this.new);
    }
    this.isFavorite = !this.isFavorite;
  }

}


