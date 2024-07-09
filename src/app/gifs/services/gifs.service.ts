import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];
  public gifList : Gif[] = [];
  private apiKey: string = 'QEu9MwNY4adYF7NoRCrZj6Sn0qe1Fj6Y';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  async searchTag(tag:string) : Promise<void> {
    if (tag.trim().length === 0) {
      return;
    }
    //Si existe lo ponemos el primero
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
    }
    this._tagsHistory.unshift(tag);
    //Poner un maximo de 10
    this._tagsHistory = this._tagsHistory.splice(0, 15);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('q', tag)
    .set('limit', '10')

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( resp => {
        this.gifList = resp.data;
        console.log({gifs : this.gifList });
      });
  }

  constructor(private http: HttpClient) { }

}
