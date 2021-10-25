import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponSlotComponent } from './weapon-slot.component';

describe('WeaponSlotComponent', () => {
  let component: WeaponSlotComponent;
  let fixture: ComponentFixture<WeaponSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
