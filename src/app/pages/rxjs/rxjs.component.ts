import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    this.regresaObservable().pipe(retry(2))  //retry 2 indica que hace dos intentos y para
    .subscribe(numero => {
      console.log('Subs ', numero);  // callback del next
    }, error => {
      console.error('Error en el obs ', error);  //callback del error
    }, () => {
      console.log('El obs acabó!');  // callback del complete
    });
  }

  ngOnInit() {
  }

  regresaObservable(): Observable<number> {
    const obs = new Observable<number>(observer => {
      let contador = 1;
      const intervalo = setInterval(() => {
        contador += 1;
        observer.next(contador);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (contador === 2) {
          clearInterval(intervalo);
          observer.error('error en el observable');
        }
      }, 1000);
    });
    return obs;
  }

}
