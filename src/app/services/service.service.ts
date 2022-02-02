import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  addAddressData(body: any): Observable<any> {
    return this.httpClient.post(environment.baseUrl+"/create", body);
  }

  getAllAddressData(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + "/get");
  }

  deleteAddress(id : any): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + "/delete/"+id);
  }

}




