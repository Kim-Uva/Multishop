import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { ProductoModule } from './producto/producto.module';
import { OrdenCompraModule } from './orden-compra/orden-compra.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { BodegaModule } from './bodega/bodega.module';
import { InventarioModule } from './inventario/inventario.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { ServicesModule } from './share/services/services.module';
import { ToastrModule } from 'ngx-toastr';
import { InventarioListaComponent } from './inventario/inventario-lista/inventario-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    InventarioListaComponent
  ],
  imports: [
    BrowserModule, // importar HttpClientModule después BrowserModule.
    // comunicarse con un servidor a través del protocolo HTTP
    HttpClientModule, // Debe agregar el import respectivo
    
    // importar los módulos creados propios en orden 
    CoreModule,
    ShareModule,
    HomeModule,
    ToastrModule.forRoot(), 
    ProductoModule,
    OrdenCompraModule,
    ProveedorModule,
    BodegaModule,
    InventarioModule,
    ServicesModule,
    // al final el gestor de las rutas principal 
    AppRoutingModule
      ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
