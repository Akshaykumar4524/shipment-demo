import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,private dataService: DataService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      order: '',
      shipment: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNo:''
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    this.dataService.setFormData(this.myForm.value)
    this.router.navigate(['/shipment'])
  }

  onReset(){
    this.myForm.reset()
  }
}
