import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const config = {
  baseUrl: 'http://192.168.0.35:8080'
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http:HttpClient) {}
 
  getWeapons() {
    return this.http.get(config.baseUrl + '/weapons')
  }

  getMonsters() {
    return this.http.get(config.baseUrl + '/monsters')
  }

  getMonstersByZone(idZone) {
    return this.http.get(config.baseUrl + `/monsters/${idZone}/zone`)
  }

  getZones() {
    return this.http.get(config.baseUrl + '/zones')
  }

  getZoneById(id: number) {
    return this.http.get(config.baseUrl + `/zones/${id}`)
  }

  createUser(name: string) {
    return this.http.post(config.baseUrl + '/users', {name: name})
  }

  getUserByName(name: string) {
    return this.http.get(config.baseUrl + '/users/' + name)
  }
}
