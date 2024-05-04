import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PinData} from "./utils/interface";
import {PrivacyOptions} from "./utils/enum";
import {CollaboratorComponent} from "./collaborator/collaborator.component";
import {CreatePinComponent} from "./pin/create-pin/create-pin.component";


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
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pin-customers';
  pins = PINS;

  constructor(private modal: NgbModal) {
  }

  openModal(type: 'collaborator'|'pin') {
    switch (type) {
      case 'collaborator':
        this.modal.open(CollaboratorComponent, {
          centered: true,
          size: 'lg'
        })
        break;
      case "pin":
        this.modal.open(CreatePinComponent, {
          centered: true,
          size: 'lg',
        })
        break;
    }
  }
}
