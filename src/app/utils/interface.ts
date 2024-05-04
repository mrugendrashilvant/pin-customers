import {PrivacyOptions} from "./enum";

export interface Collaborator {
  name: string,
  email:string,
  region: string,
  country?: string,
}

export interface PinData {
  title: string,
  image: string,
  collaborators: Collaborator[],
  privacy: PrivacyOptions
}
