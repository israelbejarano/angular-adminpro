import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    if (!img) {
      return url + '/usuario/xxx';
    }

    // imagen de google
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuario':
        url += '/usuario' + img;
      break;
      case 'medico':
        url += '/medico' + img;
      break;
      case 'hospital':
        url += '/hospital' + img;
      break;
      default:
        console.log('tipo de imagen no válido, usuario, medico, hospital');
        url += '/usuario/xxx';
    }
    return url;
  }

}
