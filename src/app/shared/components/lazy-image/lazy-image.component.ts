import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit{

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('No se ha recibido la url de la imagen');
  }

  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  onLoad(): void {
    this.hasLoaded = true;
  }


}
