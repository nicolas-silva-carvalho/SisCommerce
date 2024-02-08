import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Produto } from '../models/Produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: HttpClient) { }
  baseUrl = environment.apiURL + 'Produto/produtos';

  httpOptions = {
    Headers: new HttpHeaders({'content-type': 'application/json'})
  }

  public getProdutos(): Observable<Produto> {
    return this.http.get<Produto>(this.baseUrl);
  }

  public getProducts() {
    return this.http.get(this.baseUrl);
  }
}
