import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso = 50;
  @Input() leyenda = 'Leyenda';
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  @ViewChild('txtProgress') txtProgress: ElementRef;  // for separate html components, in template #txtProgress

  constructor() {
    console.log('Leyenda en el constructor', this.leyenda);
    console.log('progreso en el constructor', this.progreso);
   }

  ngOnInit() {
    console.log('Leyenda en el ngOnInit', this.leyenda);
    console.log('progreso en el ngOnInit', this.progreso);
  }

  cambiarValor( valor: number) {
    if (this.progreso > 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  onChanges(newValue: number) {
    console.log(newValue);
    console.log(this.txtProgress);

    if ( newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }
}
