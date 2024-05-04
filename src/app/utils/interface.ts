import {PrivacyOptions} from "./enum";

export interface Customer {
  name: string,
  email:string,
  region: string,
  country?: string,
}

export interface PinData {
  title: string,
  image: string,
  collaborators: Customer[],
  privacy: PrivacyOptions
}
