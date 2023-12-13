// src/app/contacts/contact/contact.component.ts

import { Component } from '@angular/core';
import { Contact } from '../contacts';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contact: Contact = {
    id: Object, // Make sure to assign an appropriate value here based on your requirements
    firstname: '',
    lastname: '',
    email: '',
    message: '',
  };

  constructor(private contactService: ContactService) {}

  submitForm() {
    this.contactService.submitContactForm(this.contact).subscribe(
      (data: any) => {
        console.log('Contact form submitted successfully', data);
      },
      (error: any) => {
        console.error('Error submitting contact form', error);
      }
    );
  }
}
