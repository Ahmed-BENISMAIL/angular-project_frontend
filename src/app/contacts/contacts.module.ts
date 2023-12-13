// src/app/contacts/contacts.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [ContactComponent],
})
export class ContactsModule {}
