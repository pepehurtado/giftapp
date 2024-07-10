import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  public gif!: Gif;

  constructor(public gifsService: GifsService) { }

  ngOnInit(): void {
    if (!this.gif) {
      throw new Error('No se ha recibido el gif');
    }
    this.gif.title = this.gif.title ? this.gif.title : 'Sin título';
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  toggleFavorite(gif: Gif): void {
    this.gifsService.toggleFavorite(gif);
  }

  containsFavorite(gif: Gif): boolean {
    return this.gifsService.containsFavorite(gif);
  }
}
