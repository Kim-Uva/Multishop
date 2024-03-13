import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRequestService } from '../../share/services/http-request.service';
import { AuthUserService } from '../../share/services/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthUserService) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenna: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    
    const { correo, contrasenna } = this.loginForm.value;
    this.authService.loginUser({ correo, contrasenna }).subscribe(
      userData => {
        // Manejar el éxito del inicio de sesión, por ejemplo, redirigir a otra página
        console.log('Inicio de sesión exitoso:', userData);
        // Aquí podrías redirigir al usuario a otra página
      },
      error => {
        // Manejar errores de inicio de sesión, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error al iniciar sesión:', error);
        this.error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      }
    );
  }
}
