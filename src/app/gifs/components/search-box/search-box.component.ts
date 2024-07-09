import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    console.log(newTag);
    this.tagInput.nativeElement.value = '';
  }

  @ViewChild('txtInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService : GifsService) { }

}
