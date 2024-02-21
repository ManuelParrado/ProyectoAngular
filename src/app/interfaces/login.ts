export interface Login {
  email :string;
  password : string;
}

export interface Respuesta {
  jwt : string;
}

export interface UsuarioAutenticado {
  id: number,
  resultado: string,
  nombre: string | null,
  apellidos: string | null,
  email: string | null,
  rol: string | null,
}
