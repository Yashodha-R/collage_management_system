import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  UserInfoUrl = 'assets/json-data/user.json';

  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get(this.UserInfoUrl);
  }
}
