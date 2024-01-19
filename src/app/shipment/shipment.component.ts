import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faFilter } from "@fortawesome/free-solid-svg-icons"
import { ShipmentDataService } from './services/shipment-data.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrl: './shipment.component.css'
})
export class ShipmentComponent {
  formData: any;
  shipmentList:any[]=[]
  faChevronLeft = faChevronLeft
  faFilter = faFilter
  isPopOverOpen:boolean=false;
  filterStatus=[
    "Ready for Backroom Pick",
    "Backroom Pick In Progress",
    "Ready for Customer Pickup",
    "Picked",
    "Cancelled",
    "Ready for Packing",
    "Packing In Progress",
    "Packed",
    "Shipped"
  ]
  selectedFilters:any[]=[]
  page:number=1;
  pageSize:number=10;
  shipmentListAll:any[]=[]

  constructor(private router: Router, private route: ActivatedRoute, private shipmentDataService: ShipmentDataService,private dataService:DataService) {

  }

  ngOnInit() {
    const {data} = history.state
    this.formData=data;
    this.dataService.searchResult$.subscribe((res)=>{
      if(res){
        this.shipmentListAll=res
        this.shipmentList=res?.slice(0,this.pageSize)
      }
    }),(err: Error) => console.log(err)
  }

  handleClick(shipId:any) {
    this.router.navigate(['details/'+shipId], { relativeTo: this.route })
  }

  handleClickButton() {
    history.back()
  }

  handleClose() {
    this.router.navigate(['/home'])
  }

  handlePopOver(){
    this.isPopOverOpen=!this.isPopOverOpen;
  }

  handleClosePopOver(){
    this.isPopOverOpen=false
  }

  handleApplyfilter(){
    this.callService();
    this.handleClosePopOver()
  }

  callService(){
    this.dataService.updateFilter(this.selectedFilters)
  }

  handleSelctFilter(status:any){
    if(this.selectedFilters?.includes(status)){
      const index=this.selectedFilters?.indexOf(status);
      this.selectedFilters= this.selectedFilters.filter((item)=>item!==status)
    }else{
      this.selectedFilters.push(status)
    }
  }

  handleResetFilter(){
    this.selectedFilters=[]
    this.callService()
    this.handleClosePopOver()
  }

  onCardScroll(event: any) {
    const target = event.target;
    const scrollPosition = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    if (scrollPosition >= scrollHeight - clientHeight) {
      this.page++;
      this.shipmentList=this.shipmentListAll?.slice(0,this.page*this.pageSize)
    }
  }

  ngOnDestroy() {
    this.dataService.updateFilter([])
  }
}
