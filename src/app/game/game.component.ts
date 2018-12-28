import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MonsterComponent } from '../monster/monster.component';
import { LocalStorageServiceService } from '../service/local-storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'], 
})
export class GameComponent implements OnInit {
  @ViewChild('monster')
  private monster: MonsterComponent;
  
  data: string = ""
  html:SafeHtml
  
  username: String
  currentBg: String
  playerDamage: number = 2
  playerAutoDamage: number = 0
  gold: number = 0

  weapons = []
  
  constructor(private sanitizer: DomSanitizer, private httpService: HttpClientService, private localStorage: LocalStorageServiceService, private router: Router) {}

  ngOnInit() {
    this.username = this.localStorage.getCurrentUser()

    this.httpService.getWeapons().subscribe(data => {
      this.weapons = data['data'].sort( (a, b) => a.price - b.price )
    })

    setInterval( () => {
      if(this.playerAutoDamage !== undefined && this.playerAutoDamage > 0)
        this.monster.autoDamage()
    }, 1000)
  }

  monsterDied($event) {
    this.addGoldLog($event)
    this.addMonsterDiedLog($event)
  }

  addMonsterDiedLog($event) {
    this.data = `<span>The ${$event.monsterName} died.</span><br/>` + this.data
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.data)
  }

  addGoldLog($event) {
    this.gold += $event.gold

    this.data = `<span>You got ${$event.gold} golds.</span><br/>` + this.data
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.data)
  }

  weaponBought($event) {
    this.gold = $event.gold
    this.playerDamage = $event.damage
    this.playerAutoDamage = $event.auto
  }

  logOut() {
    this.localStorage.logOut()

    this.router.navigate(['/'])
  }

  changeZoneBackground(bg) {
    this.currentBg = `url('${bg.bg}')`
  }
}
