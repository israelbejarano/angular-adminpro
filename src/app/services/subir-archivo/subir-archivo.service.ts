import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(public http: HttpClient) { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
    const formData: FormData = new FormData();
    formData.append('imagen', archivo, archivo.name); // el literal 'imagen' es el nombre que lleva el body de nuestra peticion
    return this.http.put(url, formData).pipe(map((resp: any) => {
      return resp;
    }));
  }
}
