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
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => {
            console.log(data)
            this.productoInfo = data
            //Establecer valores a precargar en el formulario
            this.productoForm.setValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              codigoProducto: this.productoInfo.codigoProducto,
              estadoProducto: this.productoInfo.estadoProducto,

              descripcion: this.productoInfo.descripcion,
              stock: this.productoInfo.stock,
              precio: this.productoInfo.precio,
              categoria: this.productoInfo.idCategoria,
              subCategoria: this.productoInfo.idSubCategoria,
            });


          })


      }


    })

  }

  //Para el sku
  generarSKU(): string {
    const catSelect = this.categoriasList.find(categoria => categoria.id === this.productoForm.value.categoria);
    const subCatSelect = this.subCategoriasList.find(subCategoria => subCategoria.id === this.productoForm.value.subCategoria);

    if (catSelect && subCatSelect) {
      const categoriaCod = catSelect.nombre.substring(0, 3).toUpperCase();
      const subCategoriaCod = subCatSelect.nombre.substring(0, 3).toUpperCase();
      const idCodigo = this.productoForm.value.id?.toString().padStart(2, "0"); // 2 dígitos para el ID

      return `${categoriaCod}_${subCategoriaCod}_${idCodigo}`;
    } else {
      // Manejo de error si no se encuentran las categorías seleccionadas
      return '';
    }
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
      codigoProducto: [null, Validators.required],
      estadoProducto: [true, Validators.required], //Por ser boolean

      precio: [null,
        Validators.compose([
          Validators.required
        ])
      ],
      stock: [null,
        Validators.compose([
          Validators.required
        ])
      ],
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
    //Obtener id categoria del Formulario y Crear arreglo con {id: value}
    let categoriaForm = this.productoForm.get('categoria').value;

    this.productoForm.patchValue({ categoria: categoriaForm });

    let subCategoriaForm = this.productoForm.get('subCategoria').value;
    this.productoForm.patchValue({ subcategorias: subCategoriaForm });

    this.productoForm.patchValue({ codigoProducto: this.generarSKU() });

    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('/producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          this.router.navigate(['/producto/tabla']);

        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .update('/producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;

          this.router.navigate(['/producto/tabla']);
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
    this.router.navigate(['/producto/tabla']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}