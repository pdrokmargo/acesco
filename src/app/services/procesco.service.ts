import {Injectable} from '@angular/core';
import {UserInterface} from '../Interfaces/user.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcescoService {
  nodeUrl: string;

  constructor(private http: HttpClient) {
    this.nodeUrl = 'http://acescocambiatutecho.com/acescoservice/public/api/auth';
  }

  getHeader() {
    const token = this.getCurrentToken();
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getClassificationsList() {
    const url = `${this.nodeUrl}/classifications`;
    const headers = this.getHeader();
    return this.http.get(url, {headers}).pipe(map((data: any) => data.classifications));
  }

  getCointriesList() {
    const url = `${this.nodeUrl}/countries`;
    const headers = this.getHeader();
    return this.http.get(url, {headers}).pipe(map((data: any) => data.countries));
  }

  createNewUser(data: UserInterface) {
    const url = `${this.nodeUrl}/signup`;
    return this.http.post(url, data);
  }

  validateUser(data) {
    const url = `${this.nodeUrl}/login`;
    return this.http.post(url, data);
  }

  getLogedUser() {
    const url = `${this.nodeUrl}/user`;
    const headers = this.getHeader();
    return this.http.get(url, {headers}).pipe(map((data: any) => data.user));
  }

  getAllUsers() {
    const url = `${this.nodeUrl}/users`;
    const headers = this.getHeader();
    return this.http.get(url, {headers}).pipe(map((response: any) => response.users));
  }

  adminApproval(id: any, params: any) {
    const url = `${this.nodeUrl}/users/${id}}`;
    const headers = this.getHeader();
    return this.http.put(url, params, {headers});
  }

  getUserById(id: any) {
    const url = `${this.nodeUrl}/users/${id}}`;
    const headers = this.getHeader();
    return this.http.get(url, {headers}).pipe(map((data: any) => data.user));
  }

  getStepById(id: string, query: string) {
    const url = `${this.nodeUrl}/${query}/${id}`;
    const headers = this.getHeader();
    return this.http.get(url, {headers});
  }

  getCurrentToken() {
    return JSON.parse(localStorage.getItem('acctkn'));
  }

  updateUser(params: object, query: string) {
    const url = `${this.nodeUrl}/${query}`;
    const headers = this.getHeader();
    console.log(params);
    return this.http.post(url, params, {headers});
  }
}
