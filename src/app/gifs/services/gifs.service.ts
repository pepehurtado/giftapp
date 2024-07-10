import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  public gifList: Gif[] = [];
  public favorites: Gif[] = [];
  private apiKey: string = environment.apiKey;
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  private _currentOffset: number = 0;
  private _currentQuery: string = '';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  async searchTag(tag: string, offset: number = 0): Promise<void> {
    if (tag.trim().length === 0) {
      return;
    }
    this._currentQuery = tag;
    this._currentOffset = offset;

    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '12')
      .set('offset', offset.toString());

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
      });
  }

  loadNextPage(): void {
    this._currentOffset += 12;
    this.searchTag(this._currentQuery, this._currentOffset);
  }

  loadPreviousPage(): void {
    if (this._currentOffset > 0) {
      this._currentOffset -= 12;
      this.searchTag(this._currentQuery, this._currentOffset);
    }
  }

  private saveLocalStorage(): void {
    localStorage.setItem('tags', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const tags = localStorage.getItem('tags');
    if (tags) {
      this._tagsHistory = JSON.parse(tags);
      if (this._tagsHistory.length > 0) {
        this.searchTag(this._tagsHistory[0]);
      }
    }
  }

  toggleFavorite(gif: Gif): void {
    const index = this.favorites.findIndex(fav => fav.id === gif.id);
    if (index === -1) {
      this.favorites.push(gif);
    } else {
      this.favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  containsFavorite(gif: Gif): boolean {
    return this.favorites.some(fav => fav.id === gif.id);
  }

  loadFavorites(): void {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.gifList = JSON.parse(favorites);
    }
  }
}
