import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpRequestService } from '../../share/services/http-request.service';
import { UbicacionesService } from '../../share/services/ubicaciones.service';
import { FormErrorMessage } from '../../../form-error-message';
import { ubicacionParseo } from '../interfaces/ubicacionParseo';

@Component({
  selector: 'app-proveedor-formulario',
  templateUrl: './proveedor-formulario.component.html',
  styleUrl: './proveedor-formulario.component.css',
})
export class ProveedorFormularioComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  titleForm: string = 'Crear';

  //Ubicaciones
  provincias!: ubicacionParseo[];
  cantones!: ubicacionParseo[];
  distritos!: ubicacionParseo[];

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
  ) {}

  listaProvincias() {
    this.ubicacion.getProvincias().subscribe({
      next: (provincias: { [key: string]: string }) => {
        let tempProvincias: ubicacionParseo[] = Object.keys(provincias).map(
          (key) => {
            return { id: Number.parseInt(key), nombre: provincias[key] };
          }
        );
        this.provincias = tempProvincias;
      },
      error: (error) => {
        console.error('Error al obtener las provincias:', error);
      },
    });
  }

  listaCantones() {
    let idProvincia: number = Number.parseInt(
      this.proveedorForm.value.idProvincia
    );

    this.ubicacion.getCantonByPronvicia(idProvincia).subscribe({
      next: (cantones) => {
        let tempCantones: ubicacionParseo[] = Object.keys(cantones).map(
          (key) => {
            return { id: Number.parseInt(key), nombre: cantones[key] };
          }
        );
        this.cantones = tempCantones;
        // this.distritos = [];
        // this.proveedorForm.patchValue({
        //   idCanton: '',
        //   idDistrito: '',
        // });
      },
      error: (error) => {
        // Maneja cualquier error que ocurra durante la solicitud HTTP
        console.error('Error al obtener los cantones:', error);
      },
    });
  }

  listaDistritos() {
    let idProvincia: number = Number.parseInt(
      this.proveedorForm.value.idProvincia
    );
    let idCanton: number = Number.parseInt(this.proveedorForm.value.idCanton);

    this.ubicacion
      .getDistritoByCantonYProvincia(idProvincia, idCanton)
      .subscribe({
        next: (distritos) => {
          let tempDistritos: ubicacionParseo[] = Object.keys(distritos).map(
            (key) => {
              return { id: Number.parseInt(key), nombre: distritos[key] };
            }
          );
          this.distritos = tempDistritos;
          // this.proveedorForm.patchValue({
          //   idDistrito: '',
          // });
        },
        error: (error) => {
          // Maneja cualquier error que ocurra durante la solicitud HTTP
          console.error('Error al obtener los distritos:', error);
        },
      });
  }

  ngOnInit(): void {
    this.formularioReactive();
    this.listaProvincias();

    this.activeRouter.params.subscribe((params: Params) => {
      this.idProveedor = params['id'];
      console.log(this.idProveedor);
      if (this.idProveedor != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        //Obtener proveedor a actualizar del API
        this.gService
          .get('proveedor', this.idProveedor)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            console.log(data);
            this.proveedorInfo = data;
            //Establecer valores a precargar en el formulario
            this.proveedorForm.setValue({
              id: this.proveedorInfo.id,
              identificacion: this.proveedorInfo.identificacion,
              nombreProveedor: this.proveedorInfo.nombreProveedor,
              correoElectronico: this.proveedorInfo.correoElectronico,
              telefono: this.proveedorInfo.telefono,
              idProvincia: this.proveedorInfo.ubicacion?.idProvincia || '',
              idCanton: this.proveedorInfo.ubicacion?.idCanton || '',
              idDistrito: this.proveedorInfo.ubicacion?.idDistrito || '',
              direccionExacta:
                this.proveedorInfo.ubicacion?.direccionExacta || '',
            });

            this.listaCantones();
            this.listaDistritos();
          });
      }
    });
  }

  formularioReactive() {
    //[null, Validators.required]
    this.proveedorForm = this.fb.group({
      //identificador
      id: [null, null],
      identificacion: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      nombreProveedor: [null, Validators.required],
      idProvincia: [null, Validators.required],
      idCanton: [null, Validators.required],
      idDistrito: [null, Validators.required],
      direccionExacta: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ]),
      ],
      correoElectronico: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      telefono: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.pattern('')
        ]),
      ],
    });
  }

  submit(): void {
    if (this.proveedorForm.invalid) return;

    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación

    const formValue = this.proveedorForm.value;
    //const ubicacionData = {
    //  idProvincia: formValue.provincia,
    // idCanton: formValue.canton,
    //  idDistrito: formValue.distrito,
    //  direccionExacta: formValue.direccionExacta
    // };

    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('/proveedor', this.proveedorForm.value)
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
    let messageError = '';
    const control = this.proveedorForm.get(controlName);
    if (control.errors) {
      for (const message of FormErrorMessage) {
        if (
          control &&
          control.errors[message.forValidator] &&
          message.forControl == controlName
        ) {
          messageError = message.text;
        }
      }
      return messageError;
    } else {
      return false;
    }
  };

  onReset() {
    this.submitted = false;
    this.proveedorForm.reset();
  }

  onBack() {
    this.router.navigate(['/proveedor/tabla']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}
