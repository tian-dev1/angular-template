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
  productosFiltrados: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProducto()

   }

  private cargarProducto(){
    return new Promise<void>( (resolve, reject)=>{

      this.http.get('https://angular-ab66f-default-rtdb.firebaseio.com/productos_idx.json').subscribe((resp: any) => {
        this.productos = resp;
        this.cargando = false;
        /*
        setTimeout(() =>{
          this.cargando = false;
        }, 2000)
        */
        resolve();
      });


    });
  }

  getProducto( id: string){
    return this.http.get(`https://angular-ab66f-default-rtdb.firebaseio.com/productos/${ id }.json`);

  }
  buscarProducto( termino: string){
    if(this.productos.length === 0){
      //cargar productos
      this.cargarProducto().then(()=>{
        //ejecutar despues de tener los productos
        //aplicar filtros
        this.filtrarProductos(termino);

      })
    }else{
      // aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string){
    //console.log(this.productos);
    this.productosFiltrados= [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod =>{
      
      const categoriaLower = prod.titulo?.toLowerCase();
      const tituloLower = prod.titulo?.toLowerCase();

      if(categoriaLower != undefined && categoriaLower.indexOf(termino)>= 0 || tituloLower!= undefined && tituloLower.indexOf(termino)>= 0 ){
        this.productosFiltrados.push(prod);
      }
    })

  }

}
