// src/Model/Usuario.ts

// Clase que representa un usuario del sistema
export class Usuario {
  id: string; 
  nombreUsuario: string; 
  email: string; 
  contraseña?: string; 

  // Constructor que valida y asigna los datos del usuario
  constructor(props: {
    id: string;
    nombreUsuario: string;
    email: string;
    contraseña?: string;
  }) {
    const { id, nombreUsuario, email, contraseña } = props;

    if (!nombreUsuario.trim()) {
      throw new Error('El nombre de usuario es obligatorio');
    }

    if (!email.includes('@')) {
      throw new Error('El email no es válido');
    }

    this.id = id;
    this.nombreUsuario = nombreUsuario;
    this.email = email.toLowerCase();
    this.contraseña = contraseña;
  }

  // Devuelve el email en formato estándar
  obtenerEmailFormateado(): string {
    return `Email: ${this.email}`;
  }


  // Permite cambiar la contraseña del usuario (con validación básica)
  cambiarContraseña(nuevaContraseña: string): void {
    if (nuevaContraseña.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    this.contraseña = nuevaContraseña;
  }

  // Permite actualizar el correo electrónico con validación
  actualizarEmail(nuevoEmail: string): void {
    if (!nuevoEmail.includes('@')) {
      throw new Error('El nuevo email no es válido');
    }
    this.email = nuevoEmail.toLowerCase();
  }

  // Método estático que crea una instancia de Usuario a partir de un JSON (útil para localStorage)
  static desdeJSON(json: string): Usuario {
    const datos = JSON.parse(json);
    return new Usuario(datos);
  }

  // Convierte el usuario a un string JSON para guardarlo (por ejemplo, en localStorage)
  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      nombreUsuario: this.nombreUsuario,
      email: this.email,
      contraseña: this.contraseña,
    });
  }
}


// Entradas que el usuario debe llenar para iniciar sesión
export type EntradasFormularioInicioSesion = {
  nombreUsuario: string;
  contraseña: string;
};

// Posibles errores del formulario de inicio de sesión
export type ErroresFormularioInicioSesion = {
  nombreUsuario?: string;
  contraseña?: string;
};

// Entradas que el usuario debe llenar para registrarse
export type EntradasFormularioRegistro = {
  nombreUsuario: string;
  email: string;
  contraseña: string;
  confirmarContraseña: string;
};

// Posibles errores del formulario de registro
export type ErroresFormularioRegistro = {
  nombreUsuario?: string;
  email?: string;
  contraseña?: string;
  confirmarContraseña?: string;
};
