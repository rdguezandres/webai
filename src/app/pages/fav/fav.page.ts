import { Component } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { New } from '../../interfaces/new';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavoritesPage {
  favorites: New[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }
}

