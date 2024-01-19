import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Subscription, skip } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  myForm!: FormGroup;
  subcription!: Subscription;

  constructor(private fb: FormBuilder,private router:Router,private dataService:DataService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      OrderNo: '',
      shipment: '',
      firstName: '',
      lastName: '',
      EMailID: '',
      phoneNo:''
    });
  }

  onSubmit() {
    this.dataService.updateFormData(this.myForm.value)
    if(this.subcription){
      this.subcription?.unsubscribe()
    }
    this.subcription= this.dataService.searchResult$.pipe(skip(1)).subscribe((res)=>{
      if(res?.length===1){
        this.router.navigate(['/shipment/details/'+res?.[0]?.ShipmentNo])
      }
      else{
        this.router.navigate(['/shipment'])
      }
    })
  }

  onReset(){
    this.myForm.reset()
  }

  ngOnDestroy(){
    if(this.subcription){
      this.subcription?.unsubscribe()
    }
  }
}
