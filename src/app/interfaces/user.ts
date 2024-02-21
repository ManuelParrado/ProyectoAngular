export interface User {
  id: number,
  nombre: string,
  apellidos: string,
  email: string,
  password: string,
  rol: string
}

export interface RespuestaDelete {
  resultado : string;
}

export interface UserUpdate {
  id: number | null,
  email: string | null,
  nombre: string | null,
  apellidos: string | null,
  password: string | null
}
