import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { New } from '../interfaces/new';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private database: SQLiteObject | undefined;
  private favoriteNews: New[] = [];
  private favoritesSubject: BehaviorSubject<New[]> = new BehaviorSubject<New[]>([]);

  favorites$ = this.favoritesSubject.asObservable();

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
    this.loadFavoritesFromDatabase();
  }

  private async initializeDatabase() {
    this.database = await this.sqlite.create({
      name: 'favorites.db',
      location: 'default'
    });

    await this.database.executeSql('CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY, title TEXT, content TEXT, img TEXT)');
  }

  private async loadFavoritesFromDatabase() {
    const result = await this.database?.executeSql('SELECT * FROM favorites', []);
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        const item = result.rows.item(i);
        const favorite: New = {
          id: item.id,
          title: item.title,
          content: item.content,
          img: item.img
        };
        this.favoriteNews.push(favorite);
      }
      this.favoritesSubject.next(this.favoriteNews);
    }
  }

  async addFavorite(newItem: New) {
    if (!this.isFavorite(newItem)) {
      this.favoriteNews.push(newItem);
      await this.database?.executeSql('INSERT INTO favorites (id, title, content, img) VALUES (?, ?, ?, ?)',
        [newItem.id, newItem.title, newItem.content, newItem.img]);
      this.favoritesSubject.next(this.favoriteNews);
    }
  }

  async removeFavorite(newItem: New) {
    const index = this.favoriteNews.findIndex(item => item.id === newItem.id);
    if (index !== -1) {
      this.favoriteNews.splice(index, 1);
      await this.database?.executeSql('DELETE FROM favorites WHERE id = ?', [newItem.id]);
      this.favoritesSubject.next(this.favoriteNews);
    }
  }

  isFavorite(newItem: New): boolean {
    return this.favoriteNews.some(item => item.id === newItem.id);
  }
}




