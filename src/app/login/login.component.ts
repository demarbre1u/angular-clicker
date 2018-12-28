import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { LocalStorageServiceService } from '../service/local-storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username: ElementRef

  constructor(private httpService: HttpClientService, private localStorage: LocalStorageServiceService, private router: Router) { }

  ngOnInit() {
    let currentUser = this.localStorage.getCurrentUser()

    if(currentUser !== '')
      this.router.navigate(['/game'])
  }

  sendForm($event) {
    let name = this.username.nativeElement.value

    // Si le champ est vide, on ne fait rien
    if(name === '') return;

    // On regarde si le nom existe deja en base de données
    this.httpService.getUserByName(name).subscribe(data => {
    }, error => {
      this.httpService.createUser(name)
    })

    // On envoie un event avec le nom du user pour l'afficher dans le header
    this.localStorage.setCurrentUser(name)

    this.router.navigate(['/game']);
  }
}
