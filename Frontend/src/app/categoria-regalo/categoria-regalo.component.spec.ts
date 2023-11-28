import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaRegaloComponent } from './categoria-regalo.component';

describe('CategoriaRegaloComponent', () => {
  let component: CategoriaRegaloComponent;
  let fixture: ComponentFixture<CategoriaRegaloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaRegaloComponent]
    });
    fixture = TestBed.createComponent(CategoriaRegaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
