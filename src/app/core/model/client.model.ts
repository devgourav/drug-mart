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
  address: Map<string, string> = new Map();
  notes: string;

  constructor(name: string, phoneNumber: string, emailId: string,
    website: string, GSTIN: string, contactPersonName: string,
    contactPersonPhoneNumber: string, contactPersonEmailId: string, address: Map<string, string>, notes: string) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.emailId = emailId;
    this.website = website;
    this.GSTIN = GSTIN;
    this.contactPersonName = contactPersonName;
    this.contactPersonPhoneNumber = contactPersonPhoneNumber;
    this.contactPersonEmailId = contactPersonEmailId;
    this.notes = notes;
    this.address = address;
  }
}
