import {Component, OnInit} from '@angular/core';
import {PinData} from "../../utils/interface";
import {ApiHelperService} from "../../service/api-helper.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-pin-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pin-list.component.html',
  styleUrl: './pin-list.component.scss'
})
export class PinListComponent implements OnInit{
  pins!: PinData[];
  loading: boolean = true;

  constructor(private apiHelper: ApiHelperService) {
  }

  ngOnInit() {
    this.apiHelper.getPinData().subscribe({
      next: data => {
        this.pins = [...data];
        this.loading = false;
      },
      error: error => console.log(error),
    });
  }
}
