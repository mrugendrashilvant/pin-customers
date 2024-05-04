import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CollaboratorComponent} from "./collaborator/collaborator.component";
import {CreatePinComponent} from "./pin/create-pin/create-pin.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private modal: NgbModal,
  ) {
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
