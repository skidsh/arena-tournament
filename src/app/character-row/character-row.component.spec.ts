import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterRowComponent } from './character-row.component';

describe('CharacterRowComponent', () => {
  let component: CharacterRowComponent;
  let fixture: ComponentFixture<CharacterRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
