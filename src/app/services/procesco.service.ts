import { Injectable } from "@angular/core";
import { UserInterface } from "../Interfaces/user.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class ProcescoService {
  public nodeUrl: string;

  constructor(private http: HttpClient) {
    this.nodeUrl = "https://www.acesco.com.co/acescoservice/public/api/auth";
  }

  getHeader() {
    const token = this.getCurrentToken();
    return new HttpHeaders({
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    });
  }

  getClassificationsList() {
    const url = `${this.nodeUrl}/classifications`;
    const headers = this.getHeader();
    return this.http
      .get(url, { headers })
      .pipe(map((data: any) => data.classifications));
  }

  getCountriesList() {
    const url = `${this.nodeUrl}/countries`;
    const headers = this.getHeader();
    return this.http
      .get(url, { headers })
      .pipe(map((data: any) => data.countries));
  }

  getDocumentTypeList() {
    const url = `${this.nodeUrl}/documents`;
    const headers = this.getHeader();
    return this.http
      .get(url, { headers })
      .pipe(map((data: any) => data.documents));
  }

  getActividadesEconomicasList() {
    const url = `${this.nodeUrl}/actividades-economicas`;
    const headers = this.getHeader();
    return this.http
      .get(url, { headers })
      .pipe(map((data: any) => data.act_economicas));
  }

  getCurrencies() {
    const url = `${this.nodeUrl}/currencies`;
    const headers = this.getHeader();
    return this.http
      .get(url, { headers })
      .pipe(map((data: any) => data.currencies));
  }

  getLanguages() {
    const url = `${this.nodeUrl}/languages`;
    const headers = this.getHeader();
    return this.http
      .get(url, { headers })
      .pipe(map((data: any) => data.languages));
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
    return this.http.get(url, { headers }).pipe(map((data: any) => data.user));
  }

  getAllUsers(search?: any) {
    let url = `${this.nodeUrl}/users`;
    if (typeof search === "number") {
      url = `${this.nodeUrl}/users?page=${search}`;
    }

    if (typeof search === "string") {
      url = `${this.nodeUrl}/users?search=${search}`;
    }

    const headers = this.getHeader();
    return this.http
      .get(url, { headers })
      .pipe(map((response: any) => response));
  }

  adminApproval(id: any, params: any) {
    const url = `${this.nodeUrl}/users/${id}}`;
    const headers = this.getHeader();
    return this.http.put(url, params, { headers });
  }
  getRepresentative(id: number) {
    const url = `${this.nodeUrl}/representative/${id}}`;
    const headers = this.getHeader();
    return this.http.get(url, { headers });
  }
  getUserById(id: any) {
    const url = `${this.nodeUrl}/users/${id}}`;
    const headers = this.getHeader();
    return this.http.get(url, { headers }).pipe(map((data: any) => data.user));
  }

  getStepById(id: number, query: string) {
    const url = `${this.nodeUrl}/${query}/${id}`;
    const headers = this.getHeader();
    return this.http.get(url, { headers });
  }

  putFile(formData: any) {
    const url = `${this.nodeUrl}/upload-stage-b`;
    const token = this.getCurrentToken();
    const headers = new HttpHeaders({
      //'Content-Type': 'multipart/form-data',
      Accept: " application/json",
      Authorization: `Bearer ${token}`
    });
    return this.http.post(url, formData, { headers });
  }

  getCurrentToken() {
    return JSON.parse(localStorage.getItem("acctkn"));
  }

  updateUser(params: object, query: string) {
    const url = `${this.nodeUrl}/${query}`;
    const headers = this.getHeader();
    return this.http.post(url, params, { headers });
  }

  GET_FILE(url: string) {
    return this.http.get(`${this.nodeUrl}/${url}`, {
      responseType: "arraybuffer"
    });
  }
}
