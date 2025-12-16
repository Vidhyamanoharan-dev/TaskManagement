import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  signup(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.base}/signup`, payload);
  }

  login(payload: { email: string; password: string }): Observable<string> {
    // backend returns token as plain text
    return this.http.post(`${this.base}/login`, payload, { responseType: 'text' })
      .pipe(tap(token => this.storeToken(token)));
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
