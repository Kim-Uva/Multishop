import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpRequestService } from '../../share/services/http-request.service';
import { AuthUserService } from '../../share/services/auth-user.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  datos: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private httpRequest: HttpRequestService) {
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


    this.httpRequest.get('usuario/loginUser', correo).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {


      this.datos = data


      console.log(this.datos.contrasenna)
    })
    if (this.datos.contrasenna == contrasenna) {
      localStorage.setItem("idUsuario", this.datos.id)
      console.log("Usuario Iniciado")
      this.router.navigate(['/producto'])
    } else {
      console.log("La Contrasenna es incorrecta")
    }



  }
}
