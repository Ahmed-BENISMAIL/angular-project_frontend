// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint: string = 'http://localhost:8080/api/auth';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  // Sign-up
  signUp(user: any): Observable<any> {
    const api = `${this.endpoint}/register`;
    return this.http.post(api, user, { headers: this.headers, withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: any): void {
    this.http.post<any>(`${this.endpoint}/login`, user, { headers: this.headers })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('refresh_token', res.refreshToken);
        },
        error: (e: any) => {
          console.error(e);
          alert('Error during login. Please check your credentials.');
        },
        complete: () => {
          this.router.navigate(['products']);
        }
      });
  }

  // Get Token
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Check if logged in
  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }

  // Logout
  doLogout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['login']);
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(msg);
    return throwError(msg);
  }

  // Refresh Token
  refreshToken(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(`${this.endpoint}/users/refreshToken/`, { refreshToken: token }, httpOptions);
  }
}
