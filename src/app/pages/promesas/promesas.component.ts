import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    const promesa = new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        if (contador === 3) {
          // comentar o el resolve() o el reject()
          resolve('OK!');
          // reject('Esto es un error para probar el uso de promesas');
          clearInterval(intervalo);
        }
      }, 1000);
    });
    promesa.then(
      mensaje => console.log('¡Terminó! ', mensaje)
    ).catch(error => {
      console.error('Error en la promesa: ', error);
    });
  }

  ngOnInit() {
  }

}
