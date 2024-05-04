import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {PinData} from "./utils/interface";
import {PrivacyOptions} from "./utils/enum";


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
}
