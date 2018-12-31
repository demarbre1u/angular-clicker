import { Injectable } from '@angular/core';

const localStorage = window.localStorage;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {
  constructor() { }

  getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('user'))

    return !(user === null || Object.keys(user).length === 0) ? user : {}
  }

  setCurrentUser(data) {
    let newUser = JSON.stringify({id: data.id, username: data.name})
    localStorage.setItem('user', newUser)
  }

  addOwnedWeapons(id) {
    let weapons = this.getOwnedWeapons()

    if(! weapons.includes(id)) 
    {
      weapons.push(id)

      localStorage.setItem('weapons', JSON.stringify(weapons))
    } 
  }
  
  getOwnedWeapons() {
    let weapons = localStorage.getItem('weapons')

    if(weapons === null)
      return []
    else 
      return JSON.parse(weapons)
  }

  setOwnedWeapons(ids) {
    localStorage.setItem('weapons', JSON.stringify(ids))
  }

  destroyOwnedWeapons() {
    localStorage.removeItem('weapons')
  }

  getCurrentZone() {
    let zone = localStorage.getItem('zone')

    return zone === null ? 1 : JSON.parse(zone)
  }

  setCurrentZone(id) {
    localStorage.setItem('zone', JSON.stringify(id))
  }

  destroyCurrentZone() {
    localStorage.removeItem('zone')
  }

  logOut() {
    this.setCurrentUser('')
    this.destroyCurrentZone()
    this.destroyOwnedWeapons()
  }
}
