import { Injectable } from '@angular/core';
import {  CanActivate, Router,  UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { ServiciosApi } from '../services/serviciosApi.service';
import { UsuarioAutenticado } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  user! : UsuarioAutenticado;

  constructor(private router:Router, private serviciosApi : ServiciosApi){ };

  canActivate(): Observable<boolean | UrlTree> {
    return this.serviciosApi.getUser().pipe(
      map((user: UsuarioAutenticado) => {
        if (user.rol === 'a') {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(this.router.parseUrl('/'));
      })
    );
  }

}
