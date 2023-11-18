import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegaloComponent } from './regalo.component';

describe('RegaloComponent', () => {
  let component: RegaloComponent;
  let fixture: ComponentFixture<RegaloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegaloComponent]
    });
    fixture = TestBed.createComponent(RegaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
