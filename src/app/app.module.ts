import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {RouterOutlet} from "@angular/router";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterOutlet, NgbTooltip, HttpClientModule,
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
