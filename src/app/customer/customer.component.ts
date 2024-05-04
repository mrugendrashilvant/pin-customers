import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgbActiveModal, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {catchError, debounceTime, distinctUntilChanged, Observable, of, OperatorFunction, switchMap, tap} from "rxjs";
import {ApiHelperService} from "../service/api-helper.service";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgbTypeahead
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  modal = inject(NgbActiveModal);
  registerUser = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    region: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  disabled: boolean = false;
  searching: boolean = false;
  searchFailed: boolean = false;
  countrySearchFailed: boolean = true;
  regionSelected: boolean = false

  constructor(private apiHelper: ApiHelperService) {
  }

  onSubmit(ev: SubmitEvent) {
    ev.preventDefault();
  }

  searchCountry: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap((country) => {
          let region = this.registerUser.controls.region.value;
          if (region) {
            return this.apiHelper.getCountry(country, region).pipe(
              tap(() => this.countrySearchFailed = false),
              catchError(() => {
                this.countrySearchFailed = true;
                return of([]);
              }))
          }
          console.log("select region first")
          this.regionSelected = false;
          return of([])
        }
      ),
      tap(() => this.regionSelected = false)
    )

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(region =>
        this.apiHelper.getRegion(region).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  formatter = (x: string) => {
    if (x) {
      return x;
    }
    return '';
  }
}
