import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';

import env from 'env';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


const config = {
  baseUrl: `http://${env['API_URL']}:${env['API_PORT']}`
}

console.log(config, env)

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private http:HttpClient, private localStorage: LocalStorageServiceService) {}
 
  getWeapons() {
    return this.http.get(config.baseUrl + '/weapons')
  }

  getWeaponsByType(type) {
    return this.http.get(config.baseUrl + `/weapons/type/${type}`)
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

  playerHasSave() {
    let userId = this.localStorage.getCurrentUser().id

    return this.http.get(config.baseUrl + `/users/${userId}/save`)
  }

  saveGame(saveData) {
    // On regarde s'il existe déjà une save
    let currentId = this.localStorage.getCurrentUser().id

    this.http.get(config.baseUrl + `/users/${currentId}/save`).subscribe(data => {
      let save = data['data']
      
      // Si elle existe, on la met à jour, sinon, on la crée
      if(Object.keys(save).length !== 0)
        this.updateSave(saveData, save)
      else
        this.createSave(saveData)
    })
  }

  updateSave(saveData, save) {
    let saveId = save.id

    this.http.put(config.baseUrl + `/saves/${saveId}`, saveData).subscribe()
  }

  createSave(saveData) {
    this.http.post(config.baseUrl + '/saves', saveData).subscribe(data => {

      return this.http.put(config.baseUrl + `/users/${this.localStorage.getCurrentUser().id}`, {id_save: `${data['data'].id}`}).subscribe()
    
    })
  }

  loadSave() {
    let userId = this.localStorage.getCurrentUser().id

    return this.http.get(config.baseUrl + `/users/${userId}/save`)
  }
}
