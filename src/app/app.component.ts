import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NgbModal, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {PinData} from "./utils/interface";
import {PrivacyOptions} from "./utils/enum";
import {CustomerComponent} from "./customer/customer.component";


const PINS: PinData[] = [
  {
    title: "Pin1",
    image: "",
    collaborators: [{name: "Apple", country: "India", email: "@gmial", region: "Maharashtra"}],
    privacy: PrivacyOptions.PUBLIC
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgbTooltip],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pin-customers';
  pins = PINS;

  constructor(private modal: NgbModal) {
  }

  openModal(type: 'customer'|'pin') {
    switch (type) {
      case 'customer':
        this.modal.open(CustomerComponent, {
          centered: true,
          size: 'lg'
        })
        break;
      case "pin":
        break;
    }
  }
}
