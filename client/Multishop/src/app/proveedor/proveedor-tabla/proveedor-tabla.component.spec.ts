import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorTablaComponent } from './proveedor-tabla.component';

describe('ProveedorTablaComponent', () => {
  let component: ProveedorTablaComponent;
  let fixture: ComponentFixture<ProveedorTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedorTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProveedorTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
