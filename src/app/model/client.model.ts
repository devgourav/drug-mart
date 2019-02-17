import { Address } from './address.model';

export class Client {
  id: string;
  name: string;
  phoneNumber: string;
  emailId: string;
  website: string;
  GSTIN: string;
  contactPersonName: string;
  contactPersonPhoneNumber: string;
  contactPersonEmailId: string;
  address: Address;
  notes: string;
}
