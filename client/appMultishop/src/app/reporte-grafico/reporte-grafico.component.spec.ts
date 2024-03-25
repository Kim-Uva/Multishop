import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGraficoComponent } from './reporte-grafico.component';

describe('ReporteGraficoComponent', () => {
  let component: ReporteGraficoComponent;
  let fixture: ComponentFixture<ReporteGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteGraficoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
