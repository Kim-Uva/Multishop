import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpRequestService } from '../../share/services/http-request.service';
import { UbicacionesService } from '../../share/services/ubicaciones.service';
import { FormErrorMessage } from '../../../form-error-message';

@Component({
  selector: 'app-proveedor-formulario',
  templateUrl: './proveedor-formulario.component.html',
  styleUrl: './proveedor-formulario.component.css'
})
export class ProveedorFormularioComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();


  titleForm: string = 'Crear';
  provincias: any[] = [];
  cantones: any;
  distritos: any[] = [];
  //Producto a actualizar
  proveedorInfo: any;
  ubicacionInfo: any;
  //Respuesta del API crear/modificar
  respProveedor: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  proveedorForm: FormGroup;
  idProveedor: number = 0;
  idUbicacion: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  isDescripcionDisabled: boolean = true; 


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: HttpRequestService,
    private ubicacion: UbicacionesService
  ) {

this.listaProvincias()
  }

  listaProvincias() {
    
    this.ubicacion.getProvincias().subscribe({
      next: provincias => {
        // Verifica si las provincias son un objeto y conviértelas en una matriz si es necesario
        if (typeof provincias === 'object' && !Array.isArray(provincias)) {
          this.provincias = Object.keys(provincias).map(key => provincias[key]);
        } else {
          this.provincias = provincias;
        }
      },
      
      error: error => {
        console.error('Error al obtener las provincias:', error);
      }
    });

  }

  listaCantones(idProvincia: number) {
    this.ubicacion.getCantonByPronvicia(idProvincia).subscribe({
      next: cantones => {
        // Verifica si los cantones son un objeto y conviértelos en una matriz si es necesario
        if (typeof cantones === 'object' && !Array.isArray(cantones)) {
          this.cantones = Object.keys(cantones).map(key => cantones[key]);
        } else {
          this.cantones = cantones;
        }
      },
      error: error => {
        // Maneja cualquier error que ocurra durante la solicitud HTTP
        console.error('Error al obtener los cantones:', error);
      }
    });
  }

  listaDistritos(idProvincia: number, idCanton: number) {
    this.ubicacion.getDistritoByCantonYProvincia(idProvincia, idCanton).subscribe({
      next: distritos => {
        // Aquí puedes manejar la lista de distritos recibida
        console.log(distritos);
      },
      error: error => {
        // Maneja cualquier error que ocurra durante la solicitud HTTP
        console.error('Error al obtener los distritos:', error);
      }
    });
  }

  ngOnInit(): void {
    console.log('entro')
    this.listaProvincias();

    this.activeRouter.params.subscribe((params: Params) => {
      this.idProveedor = params['id']
      console.log(this.idProveedor);
      if (this.idProveedor != undefined) {
        this.isCreate = false
        this.titleForm = 'Actualizar'
        //Obtener proveedor a actualizar del API
        this.gService
          .get('proveedor', this.idProveedor)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            console.log(data)
            this.proveedorInfo = data
            //Establecer valores a precargar en el formulario
            this.proveedorForm.setValue({
              id: this.proveedorInfo.id,
              identificacion: this.proveedorInfo.identificacion,
              nombreProveedor:this.proveedorInfo.nombreProveedor,

              correoElectronico: this.proveedorInfo.correoElectronico,
              telefono: this.proveedorInfo.telefono,
              ubicacion: this.proveedorInfo.idUbicacion,
            
  
   
             
            });


          })


     
      }
      

    })
    this.formularioReactive();


  }

  formularioReactive() {
    //[null, Validators.required]
    this.proveedorForm = this.fb.group({
      //identificador
      id: [null, null],
      identificacion: [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])
      ],
      nombreProveedor: [null, Validators.required],
      ubicacion: [null, Validators.required],
      correoElectronico: [null, Validators.required], 

      telefono: [null,
        Validators.compose([
          Validators.required
        ])
      ],


    
    })
  }
  onProvinciaChange(): void {
    const provinciaId = this.proveedorForm.get('ubicacion').value;
    this.cantones = this.listaCantones(provinciaId);
    this.proveedorForm.get('idCanton').setValue(null);
    this.proveedorForm.get('idDistrito').setValue(null);
}

  submit(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.proveedorForm.invalid) {
      return;
    }
    
  const formValue = this.proveedorForm.value;
  const ubicacionData = {
    idProvincia: formValue.provincia,
    idCanton: formValue.canton,
    idDistrito: formValue.distrito,
    direccionExacta: formValue.direccionExacta
  };

    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService.create('/proveedor', this.proveedorForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProveedor = data;
          this.router.navigate(['/proveedor/tabla']);

        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('/proveedor', this.proveedorForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProveedor = data;

          this.router.navigate(['/proveedor/tabla']);
        });

    }
  }

  public errorHandling = (controlName: string) => {
    let messageError = ''
    const control = this.proveedorForm.get(controlName);
    if (control.errors) {
      for (const message of FormErrorMessage) {

        if (control &&
          control.errors[message.forValidator] &&
          message.forControl == controlName) {
          messageError = message.text;
        }
      }
      return messageError
    } else {
      return false
    }
  };
  onReset() {
    this.submitted = false;
    this.proveedorForm.reset();
  }
  onBack() {
    this.router.navigate(['/producto/tabla']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}