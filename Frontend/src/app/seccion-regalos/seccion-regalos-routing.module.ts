import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeccionRegalosComponent } from './seccion-regalos.component';
import { CategoriaRegaloComponent } from '../categoria-regalo/categoria-regalo.component';

const routes: Routes = [
  {
    path: 'seccion-regalos',
    component: SeccionRegalosComponent,
    children: [{ path: ':category', component: CategoriaRegaloComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeccionRegalosRoutingModule {}
