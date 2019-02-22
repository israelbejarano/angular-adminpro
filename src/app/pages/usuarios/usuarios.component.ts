import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { Validators } from '@angular/forms';

declare var swal: any; // para evitar errores del IDE

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;
  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    console.log(termino);
    this._usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    console.log('usuario a borrar: ' + JSON.stringify(usuario));
    if (usuario._id === this._usuarioService.usuario._id) { // el usuario del servicio es el usuario que esta logeado
      swal('No se puede borrar usuario', 'No te puedes borrar a ti mismo', 'error');
      return;
    }
    swal({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe((borrado: boolean) => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
  }

}
