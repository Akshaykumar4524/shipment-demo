import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentRoutingModule } from './shipment-routing.module';
import { ShipmentComponent } from './shipment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ShipmentComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    ShipmentRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
  ]
})
export class ShipmentModule { }
