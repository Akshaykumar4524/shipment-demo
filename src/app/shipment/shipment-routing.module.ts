import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentComponent } from './shipment.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [{ path: '', component: ShipmentComponent },{path:'details/:shipId',component:DetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentRoutingModule { }
