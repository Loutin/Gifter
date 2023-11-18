import { Component, Input } from '@angular/core';
import { Regalo } from 'src/interfaces/regalo.interface';

@Component({
  selector: 'app-regalo',
  templateUrl: './regalo.component.html',
  styleUrls: ['./regalo.component.css']
})
export class RegaloComponent {
  @Input()
  public regalo!: Regalo;
}
