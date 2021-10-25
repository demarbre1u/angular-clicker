import { Component, OnInit, ViewChild } from '@angular/core';
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
  
  dataGeneral: string = ""
  dataDamage: string = ""
  htmlGeneral:SafeHtml
  htmlDamage:SafeHtml
  isDataLoaded: boolean = false
  
  username: String
  currentBg: String
  playerDamage: number = 2
  playerAutoDamage: number = 0
  gold: number = 0
  
  limiter: number = 0
  id_zone: number = 1
  zoneProgress: number = 0
  zoneProgressPercent: number = 0 

  weapons = []
  magics = []
  
  constructor(private sanitizer: DomSanitizer, private httpService: HttpClientService, private localStorage: LocalStorageServiceService, private router: Router) {
    this.httpService.playerHasSave().subscribe(data => {
      let saveData = data['data']
      
      this.username = this.localStorage.getCurrentUser().username

      if(Object.keys(saveData).length === 0)
        this.loadGame()
      else
        this.loadSave()
      
      this.isDataLoaded = true
    })
  }

  ngOnInit() {
    setInterval( () => {
      if(this.playerAutoDamage !== undefined && this.playerAutoDamage > 0)
        this.monster.autoDamage()
    }, 1000)
  }

  loadGame() {
    this.loadWeapons()    
  
    this.httpService.getZoneById(1).subscribe(data => {
        let zone = data['data']
  
        this.limiter = zone.limiter
      })
  }

  loadSave() {
    this.httpService.loadSave().subscribe(data => {
      let saveData = data['data']

      this.gold = saveData.gold
      this.playerDamage = saveData.dmg
      this.playerAutoDamage = saveData.auto

      let weapons = saveData.weapons.split(';')
      this.localStorage.setOwnedWeapons(weapons)
      this.loadWeapons()
  
      this.zoneProgress = saveData.progress
      this.id_zone = saveData.id_zone
      this.localStorage.setCurrentZone(this.id_zone)
      this.httpService.getZoneById( this.id_zone ).subscribe(data => {
        let zone = data['data']
  
        this.limiter = zone.limiter
        this.zoneProgressPercent = this.zoneProgress / this.limiter * 100
      })
    })
  }

  loadWeapons() {
    this.httpService.getWeaponsByType(0).subscribe(data => {
      this.weapons = data['data'].sort( (a, b) => a.price - b.price )
    })
    this.httpService.getWeaponsByType(1).subscribe(data => {
      this.magics = data['data'].sort( (a, b) => a.price - b.price )
    })
  }

  monsterDied($event) {
    this.addGoldLog($event)
    this.addMonsterDiedLog($event)
  }

  addMonsterDiedLog($event) {
    let monsterHTML = `<span style="color: #95a5a6">${$event.monsterName}</span>`

    this.dataGeneral = `<span>The ${monsterHTML} died.</span><br/>` + this.dataGeneral
    this.htmlGeneral = this.sanitizer.bypassSecurityTrustHtml(this.dataGeneral)
  }

  addGoldLog($event) {
    this.gold += $event.gold

    let goldIcon = '<img src="assets/img/icon/coins.svg" alt="golds" style="width: 16px; height: 16px">'

    this.dataGeneral = `<span>You got ${$event.gold} ${goldIcon}.</span><br/>` + this.dataGeneral
    this.htmlGeneral = this.sanitizer.bypassSecurityTrustHtml(this.dataGeneral)
  }

  addSavedLog() {
    this.dataGeneral = `<span style="color: #16a085">Your progression has been saved!</span><br/>` + this.dataGeneral
    this.htmlGeneral = this.sanitizer.bypassSecurityTrustHtml(this.dataGeneral)
  }

  addMonsterDamage($event) {
    let icon
    let html = ""

    switch($event.type) {
      case 'crit': 
        let critHTML = '<span style="color: #95a5a6">Critical hit</span>'
        icon = '<img src="assets/img/icon/sword.svg" alt="sword" style="width: 16px; height: 16px">'
       
        html = `<span>${critHTML} ! You dealt ${$event.damage} ${icon}.</span><br/>`
        break;
      case 'normal':
        icon = '<img src="assets/img/icon/sword.svg" alt="sword" style="width: 16px; height: 16px">'
        
        html = `<span>You dealt ${$event.damage} ${icon}.</span><br/>`
        break;
      case 'auto':
        icon = '<img src="assets/img/icon/magic.svg" alt="sword" style="width: 16px; height: 16px">'
       
        html = `<span>You dealt ${$event.damage} ${icon} using magic.</span><br/>`
        break;
    }

    this.dataDamage = html + this.dataDamage
    this.htmlDamage = this.sanitizer.bypassSecurityTrustHtml(this.dataDamage)
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

  updateZoneProgress(data) {
    this.zoneProgress = data.zoneProgress
    this.zoneProgressPercent = data.zoneProgressPercent
    this.limiter = data.limiter
  }

  saveGame() {
    let saveData = {
      gold: `${this.gold}`,
      dmg: `${this.playerDamage}`,
      auto: `${this.playerAutoDamage}`,
      progress: `${this.zoneProgress}`,
      weapons: `${this.localStorage.getOwnedWeapons().join(';')}`,
      id_zone: `${this.localStorage.getCurrentZone()}`
    }

    this.httpService.saveGame(saveData)

    this.addSavedLog()
  }
}
