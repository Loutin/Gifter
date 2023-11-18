import { Component, Input, OnInit } from '@angular/core';
import { Regalo } from 'src/interfaces/regalo.interface';
import { RegaloService } from '../regalo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria-regalo',
  templateUrl: './categoria-regalo.component.html',
  styleUrls: ['./categoria-regalo.component.css']
})
export class CategoriaRegaloComponent implements OnInit {
  public category!: string;

  public regalos: Regalo[] = [];

  constructor(private regaloService: RegaloService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      console.log("CATEGORIA: ", this.category);
      this.cargarRegalos();
    });
  }

  async cargarRegalos() {
    this.regalos = await this.regaloService.getRegalosPorCategoria(this.category);
    console.log(this.regalos);
  }
}
