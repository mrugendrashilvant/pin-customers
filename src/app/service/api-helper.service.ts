import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, of} from "rxjs";
import {Customer} from "../utils/interface";

const PARAMS = new HttpParams();

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  constructor(
    public http: HttpClient,
  ) { }

  saveCustomer(customer: Customer) {
    let customers = localStorage.getItem("customerData");
    let newCustomers: Customer[] = [];
    if(customers) {
      newCustomers = [...JSON.parse(customers) as Customer[]];
    }
    newCustomers.push(customer);
    localStorage.setItem("customerData", JSON.stringify(newCustomers));
  }

  getCustomers():Customer[] {
    let customers = localStorage.getItem("customerData");
    let newCustomers: Customer[] = [];
    if(customers) {
      newCustomers = [...JSON.parse(customers) as Customer[]];
    }

    return newCustomers;
  }

  getRegion(region:string) {
    if (region === '') {
      return of([]);
    }
    return this.http
      .get<[any, string[]]>('https://api.first.org/data/v1/countries', {params: PARAMS.set('q', region)})
      .pipe(map((response:any) => response['data']))
      .pipe(map((data: {[key:string]:{country: string, region: string} }) => {
        let reqData:string[] = [];
        for(let [key, value] of Object.entries(data)) {
          if(reqData.includes(value.region)) continue;
          reqData.push(value.region);
        }
        return reqData.slice(0,10)
      }));
  }

  getCountry(country:string, region: string) {
    if(country === '') return of([]);
    return this.http
      .get<[any, string[]]>('https://api.first.org/data/v1/countries', {params: {"q": country, "region": region}})
      .pipe(map((response:any) => response['data']))
      .pipe(map((data: {[key:string]:{country: string, region: string} }) => {
        let reqData:string[] = [];
        for(let [key, value] of Object.entries(data)) {
          reqData.push(value.country);
        }
        return reqData.slice(0,10)
      }));
  }
}
