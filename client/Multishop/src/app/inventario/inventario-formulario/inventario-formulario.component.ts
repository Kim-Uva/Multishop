import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpRequestService } from '../../share/services/http-request.service';
import { Subject, takeUntil } from 'rxjs';
import { FormErrorMessage } from '../../../form-error-message';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventario-formulario',
  templateUrl: './inventario-formulario.component.html',
  styleUrl: './inventario-formulario.component.css'
})
export class InventarioFormularioComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();


  titleForm: string = 'Crear';
  //Lista de generos
  ProductoList: any[] = [];
  BodegaList: any[] = [];
  //Producto a actualizar
  inventario: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  InventarioForm: FormGroup;
  idProducto: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  isDescripcionDisabled: boolean = true;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: HttpRequestService,
  ) {
    this.formularioReactive()
    this.ProductList()
    this.BodegList()
  }


  ngOnInit(): void {
    console.log('entro')
    const objetoInventario = JSON.parse(localStorage.getItem('objetoInventario'));
    this.ProductList()
    this.BodegList()
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id']
      console.log(this.idProducto);
      if (this.idProducto != undefined) {
        this.isCreate = false
        this.titleForm = 'Actualizar'

        //Obtener producto a actualizar del API
        this.gService
          .create('/inventario/getInventarioByIdBodegaIdProducto', objetoInventario)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log(data)
            this.inventario = data
            //Establecer valores a precargar en el formulario
            this.InventarioForm.setValue({
              idProducto: this.inventario.idProducto,
              idBodega: this.inventario.idBodega,
              cantidad: this.inventario.cantidad,
              cantidadMinima: this.inventario.cantidadMinima,
              cantidadMaxima: this.inventario.cantidadMaxima,
            });


          })


      }


    })

  }


  ProductList() {
    this.ProductoList = null;
    this.gService
      .list('producto')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.ProductoList = data;
      });
  }

  BodegList() {
    this.BodegaList = null;
    this.gService
      .list('bodega')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.BodegaList = data;
      });
  }

  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.InventarioForm = this.fb.group({
      //identificador

      idProducto: [null, Validators.required],
      idBodega: [null, Validators.required],


      cantidad: [null,
        Validators.compose([
          Validators.required
        ])
      ],
      cantidadMaxima: [null,
        Validators.compose([
          Validators.required
        ])
      ],
      cantidadMinima: [null,
        Validators.compose([
          Validators.required
        ])
      ]
    })
  }



  submit(): void {
    //Establecer submit verdadero
    this.submitted = true;
    let can = this.InventarioForm.get('cantidad').value;
    let canMin = this.InventarioForm.get('cantidadMinima').value;
    let canMax = this.InventarioForm.get('cantidadMaxima').value;

    if (can > canMax && can < canMin) {
      this.toastr.error("Revisar las celdas de cantidad producto, cantidad Maxima y minima.");
      return;

    }
    if ((canMin >= canMax && canMax <= canMin)) {
      this.toastr.error("Revisar las celdas de cantidad producto, cantidad Maxima y minima");
      return;

    }


    if (this.InventarioForm.invalid) {
      this.toastr.error("Faltan Datos por llenar");
    }

    //Obtener id categoria del Formulario y Crear arreglo con {id: value}
    let idBodegaForm = this.InventarioForm.get('idBodega').value;
    this.InventarioForm.patchValue({ idBodega: idBodegaForm });

    let idProductoForm = this.InventarioForm.get('idProducto').value;
    this.InventarioForm.patchValue({ idProducto: idProductoForm });

    if (this.isCreate) {
      //Accion API create enviando toda la informacion del formulario
      this.gService
        .create('/inventario', this.InventarioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          this.router.navigate(['/inventario']);
          this.toastr.success("Se ha creado el Inventario correctamente");
        });
    } else {
      //Accion API actualizar enviando toda la informacion del formulario
      this.gService
        .create('/inventario/updateInventario', this.InventarioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          //Obtener respuesta
          this.respProducto = data;
          this.router.navigate(['/inventario']);
          this.toastr.success("Se ha editado el Inventario correctamente");
        });
    }
  }

  public errorHandling = (controlName: string) => {
    let messageError = ''
    const control = this.InventarioForm.get(controlName);
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
    this.InventarioForm.reset();
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