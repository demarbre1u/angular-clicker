import { Injectable } from '@angular/core';

const localStorage = window.localStorage;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {
  constructor() { }

  getCurrentUser() {
    let user = JSON.parse(localStorage.getItem('user'))
    
    return user !== null ? user.username : ''
  }

  setCurrentUser(username) {
    let newUser = JSON.stringify({username: username})
    localStorage.setItem('user', newUser)
  }

  logOut() {
    this.setCurrentUser('')
  }
}
