import type {
  EntradasFormularioInicioSesion,
  ErroresFormularioInicioSesion,
  EntradasFormularioRegistro,
  ErroresFormularioRegistro,
} from '../Model/Usuario';

export const validarInicioSesion = (
  entradas: EntradasFormularioInicioSesion
): ErroresFormularioInicioSesion => {
  const errores: ErroresFormularioInicioSesion = {};

  if (!entradas.nombreUsuario?.trim()) {
    errores.nombreUsuario = 'El usuario es obligatorio.';
  }

  if (!entradas.contraseña) {
    errores.contraseña = 'La contraseña es obligatoria.';
  } else if (entradas.contraseña.length < 6) {
    errores.contraseña = 'La contraseña debe tener al menos 6 caracteres.';
  }

  return errores;
};

export const validarRegistro = (
  entradas: EntradasFormularioRegistro
): ErroresFormularioRegistro => {
  const errores: ErroresFormularioRegistro = {};

  if (!entradas.nombreUsuario?.trim()) {
    errores.nombreUsuario = 'El usuario es obligatorio.';
  } else if (entradas.nombreUsuario.length < 3) {
    errores.nombreUsuario = 'El usuario debe tener al menos 3 caracteres.';
  }

  if (!entradas.email?.trim()) {
    errores.email = 'El correo electrónico es obligatorio.';
  } else if (!/\S+@\S+\.\S+/.test(entradas.email)) {
    errores.email = 'El correo electrónico no es válido.';
  }

  if (!entradas.contraseña) {
    errores.contraseña = 'La contraseña es obligatoria.';
  } else if (entradas.contraseña.length < 6) {
    errores.contraseña = 'La contraseña debe tener al menos 6 caracteres.';
  }

  if (!entradas.confirmarContraseña) {
    errores.confirmarContraseña = 'Debe confirmar la contraseña.';
  } else if (entradas.contraseña !== entradas.confirmarContraseña) {
    errores.confirmarContraseña = 'Las contraseñas no coinciden.';
  }

  return errores;
};
