import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000';

  private formDataSubject = new BehaviorSubject<any>(null);
  private filterSubject = new BehaviorSubject<any[]>([]);
  private searchResultSubject = new BehaviorSubject<any[]>([]);

  formData$ = this.formDataSubject.asObservable();
  filter$ = this.filterSubject.asObservable();
  searchResult$ = this.searchResultSubject.asObservable();

  constructor(private http: HttpClient,private router:Router) {
    combineLatest([this.formData$, this.filter$])
      .pipe(
        switchMap(([formData, filter]) => this.updateSearchResult(formData, filter))
      )
      .subscribe((result: any) => {
        this.searchResultSubject.next(result);
      });
  }

  updateFormData(data: any) {
    this.formDataSubject.next(data);
  }

  updateFilter(filter: any[]) {
    this.filterSubject.next(filter);
  }
  getAllShipments():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Shipment`);
  }

  private updateSearchResult(filterParams: any, selectedStatus: any[]): any {
    if(!filterParams || Object.values(filterParams).every((item)=>item==="")){
      return this.getAllShipments().pipe(
        map((items:any)=> items.filter((data:any)=>{return (selectedStatus.length===0 || selectedStatus?.includes(data?.Status))}))
      )
    }
   return this.getAllShipments().pipe(
      map((data:any) => data?.filter((item:any)=>{
        return (
          (item?.BillToAddress?.EMailID===filterParams?.EMailID
          || item?.OrderNo===filterParams?.OrderNo
          || item?.ShipmentNo===filterParams?.shipment
          || item?.BillToAddress?.FirstName=== filterParams?.firstName
          || item?.BillToAddress?.LastName=== filterParams?.lastName
          || item?.BillToAddress?.DayPhone=== filterParams?.phoneNo) && (
            selectedStatus.length===0 || selectedStatus?.includes(item?.Status)
          )
          )
      }))
    )
  }
}
