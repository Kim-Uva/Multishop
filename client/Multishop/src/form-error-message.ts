export class ErrorMessage {
    constructor(
      public forControl: string,
      public forValidator: string,
      public text: string
    ) { }
  }
//Mensajes de errores de validación
export const FormErrorMessage = [
  new ErrorMessage('nombre', 'required', 'El Nombre es requerido'),
  new ErrorMessage('nombre', 'minlength', 'El nombre debe tener 3 carácteres mínimo'),
  new ErrorMessage('descripcion', 'required', 'La descripción es requerida'),
  new ErrorMessage('precio', 'required', 'El precio es requerido'),
  new ErrorMessage('precio', 'pattern', 'El precio solo acepta números con dos decimales'),
  new ErrorMessage('categoria', 'required', 'Debes seleccionar una categoría'),
  new ErrorMessage('subcategoria', 'required', 'Debes seleccionar una subcategoria')

];