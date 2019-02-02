import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    const obs = new Observable(observer => {
      let contador = 1;
      const intervalo = setInterval(() => {
        contador += 1;
        observer.next(contador);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (contador === 2) {
          observer.error('error en el observable');
        }
      }, 1000);
    });
    obs.subscribe(numero => {
      console.log('Subs ', numero);  // callback del next
    }, error => {
      console.error('Error en el obs ', error);  //callback del error
    }, () => {
      console.log('El obs acabó!');  // callback del complete
    });
  }

  ngOnInit() {
  }

}
