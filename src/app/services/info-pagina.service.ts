import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor( private http: HttpClient) {

    this.cargarInfo();
    this.cargarEquipo();
    
  }

  private cargarInfo(){
    // Leer archivo JSON
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
      this.cargada = true;
      this.info= resp;
    });
  }

  private cargarEquipo(){
    // Leer archivo JSON
    this.http.get('https://angular-ab66f-default-rtdb.firebaseio.com/equipo.json').subscribe((resp: any) => {
      this.cargada = true;
      this.equipo= resp;
    });
  }

}
