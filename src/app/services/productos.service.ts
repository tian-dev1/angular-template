import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[]=[];

  constructor( private http: HttpClient ) {

    this.cargarProducto()

   }

  private cargarProducto(){
    this.http.get('https://angular-ab66f-default-rtdb.firebaseio.com/productos_idx.json').subscribe((resp: any) => {

        console.log(resp);
        this.productos = resp;
        this.cargando = false;

        /*
        setTimeout(() =>{
          this.cargando = false;
        }, 2000)
        */

      });
  }

}
