import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, map,of} from "rxjs";
import {Collaborator, PinData} from "../utils/interface";

const PARAMS = new HttpParams();

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {
  pinData$: BehaviorSubject<PinData[]> = new BehaviorSubject<PinData[]>([]);

  constructor(
    public http: HttpClient,
  ) { }

  saveCustomer(collaborator: Collaborator) {
    let collaborators = localStorage.getItem("collaboratorData");
    let newCollaborators: Collaborator[] = [];
    if(collaborators) {
      newCollaborators = [...JSON.parse(collaborators) as Collaborator[]];
    }
    newCollaborators.push(collaborator);
    localStorage.setItem("collaboratorData", JSON.stringify(newCollaborators));
  }

  savePinData(pinData: PinData) {
    let pins = localStorage.getItem("pinData");
    let newPins: PinData[] = [];
    if(pins) {
      newPins = [...JSON.parse(pins) as PinData[]];
    }
    newPins.push(pinData);
    this.pinData$.next(newPins);
    localStorage.setItem("pinData", JSON.stringify(newPins));
  }

  getCustomers():Collaborator[] {
    let collaborators = localStorage.getItem("collaboratorData");
    let newCollaborators: Collaborator[] = [];
    if(collaborators) {
      newCollaborators = [...JSON.parse(collaborators) as Collaborator[]];
    }
    return newCollaborators;
  }

  getPinData() {
    let pins = localStorage.getItem("pinData");
    if(pins) {
      this.pinData$.next([...JSON.parse(pins) as PinData[]]);
    }
    else {
      this.pinData$.next([]);
    }
    return this.pinData$;
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
