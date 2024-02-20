export interface Login {
  email :string;
  password : string;
}

export interface Respuesta {
  jwt : string;
}

export interface UsuarioAutenticado {
  resultado: String;
  nombre: String | null;
  apellidos: String | null;
  email: String | null;
  rol: String | null;
}
