import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(public _cargaArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  seleccionImagen(event) {
    console.log(event);
    this.imagenSubir = event.target.files[0];
    console.log(this.imagenSubir);
    if (!this.imagenSubir) {
      this.imagenSubir = null;
      return;
    }
    if (this.imagenSubir.type.indexOf('image') < 0) {
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(this.imagenSubir);
    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenTemp = reader.result;
    };
  }

  subirImagen() {
    this._cargaArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, 
      this._modalUploadService.id).subscribe(resp => {
        console.log(resp);
        // TODO hacer comprobacion si resp.ok = true para mandar o no mensaje de error
        this._modalUploadService.notificacion.emit(resp);
        this._modalUploadService.ocultarModal();
        this.cerrarModal();
      });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

}
