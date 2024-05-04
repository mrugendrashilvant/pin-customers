import {Component, inject, OnInit} from '@angular/core';
import {NgbActiveModal, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {Customer} from "../../utils/interface";
import {ApiHelperService} from "../../service/api-helper.service";
import {IDropdownSettings, NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@Component({
  selector: 'app-create-pin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgbTypeahead,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './create-pin.component.html',
  styleUrl: './create-pin.component.scss'
})
export class CreatePinComponent implements OnInit{
  modal = inject(NgbActiveModal);
  pinForm!:FormGroup<{
    title: FormControl<string | null>,
    customers: FormControl<Customer[] | null>,
    privacy: FormControl<string | null>
  }>
  customers!:Customer[];
  settings!:IDropdownSettings
  selectedCustomers!: Customer[];

  constructor(private apiHelper: ApiHelperService) {
  }

  ngOnInit() {
    this.setMultiselectSettings();
    setTimeout(()=>{
      this.customers = this.apiHelper.getCustomers();
    },)

    this.setForm();
  }

  setMultiselectSettings() {
    this.settings= {
      singleSelection: false,
      textField: 'name',
      idField:'email',
      enableCheckAll: true,
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
  }

  setForm() {
    this.pinForm = new FormGroup({
      title: new FormControl("", Validators.required),
      customers: new FormControl(this.selectedCustomers, Validators.required),
      privacy: new FormControl("", Validators.required),
    });
  }

  resetForm() {
    this.setForm();
  }

  onSubmit(ev:SubmitEvent) {
    ev.preventDefault();
    this.pinForm.markAsTouched();
    if(this.pinForm.valid){
      console.log(this.pinForm.getRawValue());
    }

  }
}
