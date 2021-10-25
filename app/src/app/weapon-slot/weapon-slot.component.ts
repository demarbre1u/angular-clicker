import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalStorageServiceService } from '../service/local-storage-service.service';

@Component({
  selector: 'app-weapon-slot',
  templateUrl: './weapon-slot.component.html',
  styleUrls: ['./weapon-slot.component.css']
})
export class WeaponSlotComponent implements OnInit {
  @Output() weaponBought: EventEmitter<any> = new EventEmitter()

  @Input() weapon: any
  @Input() gold: number
  @Input() playerDamage: number
  @Input() playerAutoDamage: number

  isBought: boolean = false

  constructor(private localStorage: LocalStorageServiceService) {}

  ngOnInit() {
    let ownedWeapons = this.localStorage.getOwnedWeapons()

    if(ownedWeapons.includes(`${this.weapon.id}`))
      this.isBought = true
  }

  buyWeapon($event: any) {
    if(this.gold >= this.weapon.price)
    {
      this.gold -= this.weapon.price
      this.playerDamage += this.weapon.dmg
      this.playerAutoDamage += this.weapon.auto

      this.weaponBought.emit({gold: this.gold, damage: this.playerDamage, auto: this.playerAutoDamage})

      this.isBought = true

      this.localStorage.addOwnedWeapons(this.weapon.id)
    }
  }
}
