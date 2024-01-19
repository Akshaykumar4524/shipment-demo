import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipmentDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getShipDetails(shipNo:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('ShipmentNo',shipNo)
    return this.http.get(`${this.apiUrl}/shipDetails`,{params})
  }
}
