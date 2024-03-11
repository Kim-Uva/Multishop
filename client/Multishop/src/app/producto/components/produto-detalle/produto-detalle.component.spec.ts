import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoDetalleComponent } from './produto-detalle.component';

describe('ProdutoDetalleComponent', () => {
  let component: ProdutoDetalleComponent;
  let fixture: ComponentFixture<ProdutoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
