import {Component, inject, OnInit} from '@angular/core';
import {NgbActiveModal, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {Customer} from "../../utils/interface";
import {ApiHelperService} from "../../service/api-helper.service";

@Component({
  selector: 'app-create-pin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgbTypeahead
  ],
  templateUrl: './create-pin.component.html',
  styleUrl: './create-pin.component.scss'
})
export class CreatePinComponent implements OnInit{
  modal = inject(NgbActiveModal);
  pinForm = new FormGroup({
    title: new FormControl("", Validators.required),
    customers: new FormControl("", Validators.required),
    privacy: new FormControl("", Validators.required),
  });
  customers!:Customer[];

  constructor(private apiHelper: ApiHelperService) {
  }

  ngOnInit() {
    this.customers = this.apiHelper.getCustomers();
  }

  onSubmit(ev:SubmitEvent) {
    ev.preventDefault();
  }
}
