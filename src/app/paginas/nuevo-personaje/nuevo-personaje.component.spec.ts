import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPersonajeComponent } from './nuevo-personaje.component';

describe('NuevoPersonajeComponent', () => {
  let component: NuevoPersonajeComponent;
  let fixture: ComponentFixture<NuevoPersonajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPersonajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
