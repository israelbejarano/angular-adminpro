import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde = 0;
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService, public _hospitalService: HospitalService,
    public router: Router, public activatedRoute: ActivatedRoute, public _modalUploadService: ModalUploadService) {
      activatedRoute.params.subscribe(params => {
        const id = params['id']; // este 'id' viene del nombre que hemos puesto en el routes { path: 'medico/:id', ...
        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
      });
    }

  ngOnInit() {
    this._hospitalService.cargarHospitalesSinPaginar().subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    });

    this._modalUploadService.notificacion.subscribe(resp => {
      console.log(resp);
      this.medico.img = resp.medico.img;
    });
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe(medico => {
      console.log(medico);
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe(medico => {
      console.log(medico);
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambioHospital(id: string) {
    console.log(id);
    this._hospitalService.obtenerHospital(id).subscribe(hospital => {
      console.log(hospital);
      this.hospital = hospital;
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
