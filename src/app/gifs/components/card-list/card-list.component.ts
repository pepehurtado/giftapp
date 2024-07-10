import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  constructor(public gifService : GifsService) { }


  @Input()
  public gifs: Gif[] = [];

  loadNextPage(): void {
    this.gifService.loadNextPage();
  }

  loadPreviousPage(): void {
    this.gifService.loadPreviousPage();
  }
}
