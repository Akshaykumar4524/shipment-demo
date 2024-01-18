import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.css'
})
export class ShipmentComponent {
  formData: any;

  constructor( private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.formData$.subscribe(formData => {
      this.formData = formData;
      console.log(this.formData);
    });
  }
}
