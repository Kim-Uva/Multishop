import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent,
  
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class HomeModule { }
