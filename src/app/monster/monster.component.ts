import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {
  @Output() zoneChange: EventEmitter<any> = new EventEmitter()
  @Output() monsterDied: EventEmitter<any> = new EventEmitter()
  
  @Input() playerDamage: number 
  @Input() playerAutoDamage: number 

  zoneList = []
  monsterList = []

  currentMonster: any = {}
  currentZone: any = {}

  zoneProgress: number = 0
  zoneProgressPercent: number = 0

  hp: number
  hpPercent: number

  constructor(private httpService: HttpClientService) { 
    this.httpService.getZones().subscribe(data => {
      this.zoneList = data['data']
      this.currentZone = this.zoneList[0]

      this.httpService.getMonstersByZone(this.zoneList[0].id).subscribe(data => {
        this.monsterList = data['data']
  
        this.currentMonster = this.monsterList[0]
        this.hp = this.currentMonster.hpMax
      })

      this.zoneChange.emit({bg: this.currentZone.bg})

      this.zoneProgress = 0
      this.zoneProgressPercent = this.zoneProgress / this.currentZone.limiter * 100
    })
  }

  ngOnInit() {}

  clickedMonster() {

    let isCrit = Math.round(Math.random() * 10) === 0

    let damage = this.playerDamage * (isCrit ? 1.5 : 1)

    this.hp -= damage;
    this.hpPercent = this.hp / this.currentMonster.hpMax * 100
    if(this.hpPercent <= 0) 
    {
      let gold = this.currentMonster.gold + Math.round(Math.random() * 1)
      this.monsterDied.emit({monsterName: this.currentMonster.name, gold})

      this.changeMonster()
    }
  }

  autoDamage() {
    let damage = this.playerAutoDamage

    this.hp -= damage;
    this.hpPercent = this.hp / this.currentMonster.hpMax * 100
    if(this.hpPercent <= 0) 
    {
      let gold = this.currentMonster.gold + Math.round(Math.random() * 1)
      this.monsterDied.emit({monsterName: this.currentMonster.name, gold})

      this.changeMonster()
    }
  }

  changeMonster() {
    let totalDamages = this.playerAutoDamage + this.playerDamage

    this.zoneProgress++
    this.zoneProgressPercent = this.zoneProgress / this.currentZone.limiter * 100

    if(this.zoneProgressPercent >= 100 && this.currentZone.id < this.zoneList.length)
    {
      this.currentZone = this.zoneList[ this.currentZone.id ]
      
      this.httpService.getMonstersByZone(this.currentZone.id).subscribe(data => {
        this.monsterList = data['data']
  
        this.currentMonster = this.monsterList[0]
      })

      this.zoneChange.emit({bg: this.currentZone.bg})
      this.zoneProgress = 0
    }
    else
    {
      this.currentMonster = this.monsterList[ this.currentMonster.id % this.monsterList.length ]
    }

    this.zoneProgressPercent = this.zoneProgress / this.currentZone.limiter * 100

    this.hpPercent = 100
    this.hp = this.currentMonster.hpMax
  }
}
