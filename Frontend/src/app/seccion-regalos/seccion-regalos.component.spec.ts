import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionRegalosComponent } from './seccion-regalos.component';

describe('SeccionRegalosComponent', () => {
  let component: SeccionRegalosComponent;
  let fixture: ComponentFixture<SeccionRegalosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeccionRegalosComponent]
    });
    fixture = TestBed.createComponent(SeccionRegalosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
