import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../interfaces/producto';
import { MisPedidos } from '../interfaces/mis-pedidos';
import { Login, Respuesta, UsuarioAutenticado } from '../interfaces/login';
import { CookieService } from 'ngx-cookie-service';
import { RespuestaCarrito } from '../interfaces/carrito';
import { Registro, RespuestaRegistro } from '../interfaces/registro';
import { RespuestaDelete, User, UserUpdate } from '../interfaces/user';

const httpOptions={
  headers:new HttpHeaders({'Content-Type':'application/json',}),
};

@Injectable({
  providedIn: 'root'
})
export class ServiciosApi {

  private respuesta!: UsuarioAutenticado;
  private apiUrl = 'http://localhost:8080';
  private url = "";

  constructor(private http: HttpClient, private cookieService : CookieService) {
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/producto/getAll`);
  }

  getPedidosByToken() : Observable<MisPedidos[]>{
    let cookie : string = this.cookieService.get("jwt");
    return this.http.get<MisPedidos[]>(`${this.apiUrl}/pedidoproducto/getPedidosByToken/${cookie}`);
  }

  getToken(user : Login){
    this.url = `${this.apiUrl}/user/getToken`;
    return this.http.post<Respuesta>(this.url,user,httpOptions);
  }

  getUser(){
    let cookie : string = this.cookieService.get("jwt");
    return this.http.get<UsuarioAutenticado>(`${this.apiUrl}/user/getUser/${cookie}`);
  }

  getProdutosById(){
    let cookie: string = this.cookieService.get("carrito");

    cookie = cookie.replace("[", "").replace("]", "");
    cookie.split(",");

    return this.http.get<Producto[]>(`${this.apiUrl}/producto/getProductosById/${cookie}`);
  }

  insertPedido(productos : Producto[]){
    let cookie : string = this.cookieService.get("jwt");
    this.url = `${this.apiUrl}/pedidoproducto/insertarPedido/${cookie}`;
    return this.http.post<RespuestaCarrito>(this.url,productos,httpOptions);
  }

  insertUser(user: Registro){
    this.url = `${this.apiUrl}/user/insertUser`;
    return this.http.post<RespuestaRegistro>(this.url,user,httpOptions);
  }

  getAllUsers(){
    return this.http.get<User[]>(`${this.apiUrl}/user/getAllUsers`);
  }

  deleteByEmail(email : string){
    this.url = `${this.apiUrl}/user/deleteByEmail`;
    return this.http.post<RespuestaDelete>(this.url,email,httpOptions);
  }

  updateUser(user : UserUpdate){
    this.url = `${this.apiUrl}/user/updateUser`;
    return this.http.post<RespuestaDelete>(this.url,user,httpOptions);
  }

}
