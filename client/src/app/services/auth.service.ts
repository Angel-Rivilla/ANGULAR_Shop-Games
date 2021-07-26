import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.API_URI}/users`);
  }

  getUser(idUser: string){
    return this.http.get(`${this.API_URI}/users/${idUser}`);
  }

  deleteUser(idUser: string){
    return this.http.delete(`${this.API_URI}/users/${idUser}`);
  }

  saveUser(user: User){
    return this.http.post(`${this.API_URI}/users`,user);
  }

  updateUser(idUser: string|number, updatedUser: User): Observable<User>{
    return this.http.put(`${this.API_URI}/users/${idUser}`, updatedUser);
  }

  
}
