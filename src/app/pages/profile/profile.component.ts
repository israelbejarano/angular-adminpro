import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioService.acualizarUsuario(this.usuario).subscribe(resp => {
      console.log(resp);
    });
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
    }
  }

  cambiarImagen() {
    this._usuarioService.cambiarimagen(this.imagenSubir, this.usuario._id);
  }
}
