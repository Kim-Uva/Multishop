import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductoModule } from './producto/producto.module';
import { HomeModule } from './home/home.module';
import { ToastrModule } from 'ngx-toastr';
import { ReporteGraficoComponent } from './reporte-grafico/reporte-grafico.component';
import { ReporteGraficoModule } from './reporte-grafico/reporte-grafico.module';
import { InventarioModule } from './inventario/inventario.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { OrdenCompraModule } from './orden-compra/orden-compra.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,
    HomeModule,
    ReporteGraficoModule,
    InventarioModule,
    OrdenCompraModule,
    ProductoModule,
    ProveedorModule,
    AppRoutingModule,
    //Siempre ir al final

  ],
  providers: [

    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
