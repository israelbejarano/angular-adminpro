import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any; // para evitar errores del IDE

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde = 0;
  constructor(public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  crearHospital() {
    swal({
      title: 'Crear hospital',
      text: 'ingrese el nombre del hospital',
      content: 'input',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital(valor).subscribe(() => this.cargarHospitales());
    });
  }

  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    console.log('hospital a borrar: ' + JSON.stringify(hospital));
    this._hospitalService.borrarHospital(hospital._id).subscribe((borrado: boolean) => {
      console.log(borrado);
      this.cargarHospitales();
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    console.log(termino);
    this._hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      console.log(hospitales);
      this.hospitales = hospitales;
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales(this.desde).subscribe((hospitales: any) => {
      console.log(hospitales);
      this.hospitales = hospitales;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);
    if (desde >= this._hospitalService.totalHospitales) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }

}
