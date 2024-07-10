import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private giftservice : GifsService) { }

  get tags(): string[] {
    return this.giftservice.tagsHistory;
  }

  searchTag(tag: string): void {
    this.giftservice.searchTag(tag);
  }

  loadFavorites(): void {
    this.giftservice.loadFavorites();
  }

}
