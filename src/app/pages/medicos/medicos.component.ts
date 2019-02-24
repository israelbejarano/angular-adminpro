import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde = 0;
  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde).subscribe((medicos: any) => {
      console.log(medicos);
      this.medicos = medicos;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    console.log(termino);
    this._medicoService.buscarMedicos(termino).subscribe((medicos: Medico[]) => {
      console.log(medicos);
      this.medicos = medicos;
    });
  }

  borrarMedico(medico: Medico) {
    console.log('medico a borrar: ' + JSON.stringify(medico));
    this._medicoService.borrarMedico(medico._id).subscribe((borrado: boolean) => {
      console.log(borrado);
      this.cargarMedicos();
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);
    if (desde >= this._medicoService.totalMedicos) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarMedicos();
  }

}
