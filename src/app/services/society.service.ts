import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


export interface ApiResult {
  page: number;
  results: any[];
  totalPages: number;
  totalResults: number;
}

@Injectable({
  providedIn: 'root'
})
export class SocietyService {

  constructor(private http: HttpClient) { }

  getAllSocietyList(page = 1): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/society`
    );
  }

  getProductList(page = 1): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/stall-product`
    );
  }

  createOrder(page = 1, request: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/stall-order/order`, request );
  }


  getOrderList(page = 1): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/stall-order/page-query?page=0&size=20`
    );
  }

}
