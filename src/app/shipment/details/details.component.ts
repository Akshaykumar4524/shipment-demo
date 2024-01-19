import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft} from "@fortawesome/free-solid-svg-icons"
import { ShipmentDataService } from '../services/shipment-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  faChevronLeft=faChevronLeft;
  shipNo:any;
  shipmentdetail:any;
  isHided:boolean=false
  constructor(private router : Router,private shipmentDataService:ShipmentDataService,private route:ActivatedRoute){

  }
  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.shipNo=params['shipId']
    })
    this.shipmentDataService.getShipDetails(this.shipNo).subscribe((res)=>{
      this.shipmentdetail=res?.[0]
    }),
    (err:any)=>console.log(err)
  }

  handleClickButton(){
    history.back()
  }

  handleClose(){
    this.router.navigate(['/home'])
  }

  handleClickshowHide(){
    this.isHided=!this.isHided
  }

}
