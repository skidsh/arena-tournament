import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArenaLadderComponent } from './arena-ladder.component';

describe('ArenaLadderComponent', () => {
  let component: ArenaLadderComponent;
  let fixture: ComponentFixture<ArenaLadderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArenaLadderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaLadderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
