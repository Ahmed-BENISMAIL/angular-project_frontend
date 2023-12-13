import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact';
  constructor(private http: HttpClient) {}

  submitContactForm(contact: Contact): Observable<any> {
    const endpoint = `${this.apiUrl}/contact`; // Replace 'contact' with your actual API endpoint
    return this.http.post(endpoint, contact);
  }
}
