import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpRequestService } from '../../../share/services/http-request.service';
import { Subject, takeUntil } from 'rxjs';
import { FormErrorMessage } from '../../../../form-error-message';

@Component({
  selector: 'app-produto-formulario',
  templateUrl: './produto-formulario.component.html',
  styleUrl: './produto-formulario.component.css'
})
export class ProdutoFormularioComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();


  titleForm: string = 'Crear';
  //Lista de generos
  categoriasList: any[] = [];
  subCategoriasList: any[] = [];
  //Producto a actualizar
  productoInfo: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  productoForm: FormGroup;
  idProducto: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: HttpRequestService,
  ) {
    this.formularioReactive()
    this.listCategoria()
    this.listSubCategoria()
  }


  ngOnInit(): void {
    console.log('entro')

    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id']
      console.log(this.idProducto);
      if (this.idProducto != undefined) {
        this.isCreate = false
        this.titleForm = 'Actualizar'
        //Obtener producto a actualizar del API
        this.gService
          .get('producto/', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            console.log(data)
            this.productoInfo = data
            //Establecer valores a precargar en el formulario
            this.productoForm.setValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              descripcion: this.productoInfo.descripcion,
              stock: this.productoInfo.stock,
              precio: this.productoInfo.precio,
              categoria: this.productoInfo.idCategoria,
              subCategoria: this.productoInfo.idSubCategoria
            })
          })
        //[{id:5, nombre: valor, ..}]
        //[5,4]
      }
    })
  }

  listCategoria() {
    this.categoriasList = null;
    this.gService
      .list('categoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.categoriasList = data;
      });
  }

  listSubCategoria() {
    this.subCategoriasList = null;
    this.gService
      .list('subcategoria')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.subCategoriasList = data;
      });
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.productoForm = this.fb.group({
      //identificador
      id: [null, null],
      nombre: [null, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])
      ],
      descripcion: [null, Validators.required],
      precio: [null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+[.,]{1,1}\[0-9]{2,2}$')
        ])
      ],
      stock: [null, Validators.required],
      categoria: [null, Validators.required],
      subCategoria: [null, Validators.required]
    })
  }



  submit(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if (this.productoForm.invalid) {
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let categoriaForm = this.productoForm.get('categoria').value
      .map((x: any) => ({ ['id']: x }))
    //Asignar valor al formulario
    //setValue
    this.productoForm.patchValue({ categoria: categoriaForm })
    console.log(this.productoForm.value);

    let subCategoriaForm = this.productoForm.get('subcategoria').value
      .map((x: any) => ({ ['id']: x }))
    //Asignar valor al formulario
    //setValue
    this.productoForm.patchValue({ subcategorias: subCategoriaForm })
    console.log(this.productoForm.value);

    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          this.router.navigate(['/tablaProducto']);

        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;

          this.router.navigate(['/tablaProducto']);
        });

    }
  }

  public errorHandling = (controlName: string) => {
    let messageError = ''
    const control = this.productoForm.get(controlName);
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
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/tablaProducto']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}