import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Productos',
    component: ProductosComponent,
  },
  {
    path: 'login',
    title: 'Inicio Sesión',
    component: LoginComponent,
  }
  ,
  {
    path: 'registro',
    title: 'Registro',
    component: RegistroComponent,
  },
  {
    path: 'mispedidos',
    title: 'Mis Pedidos',
    component: MisPedidosComponent,
  },
  {
    path: 'carrito',
    title: 'Carrito',
    component: CarritoComponent,
  }

];
