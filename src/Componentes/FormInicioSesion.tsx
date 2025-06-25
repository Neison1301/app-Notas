// src/Componentes/FormInicioSesion.tsx

import React, { useState } from 'react';
import {
  Usuario,
  type EntradasFormularioInicioSesion,
  type ErroresFormularioInicioSesion,
} from '../Model/Usuario';
import { validarInicioSesion } from '../services/validacion';
import '../style/login.css'; 

// Interfaz para definir las props que recibe este formulario
interface PropsFormularioInicioSesion {
  alIniciarSesionExitoso: (perfilUsuario: Usuario) => void; // Callback si el login es exitoso
  alNavegarARegistro: () => void; // Callback para cambiar a la vista de registro
}

// Componente funcional para el formulario de inicio de sesión
const FormInicioSesion: React.FC<PropsFormularioInicioSesion> = ({
  alIniciarSesionExitoso,
  alNavegarARegistro,
}) => {
  // Estado para los datos que escribe el usuario en el formulario
  const [datosFormulario, establecerDatosFormulario] =
    useState<EntradasFormularioInicioSesion>({
      nombreUsuario: '',
      contraseña: '',
    });

  // Estado para manejar los errores del formulario
  const [errores, establecerErrores] = useState<ErroresFormularioInicioSesion>({});
  const [estaTocado, establecerEstaTocado] = useState<boolean>(false); // Controla si el campo fue tocado

  // Maneja cambios en los campos del formulario
  const manejarCambio = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evento.target;

    // Actualiza el estado con los nuevos valores del input
    establecerDatosFormulario((datosPrevios) => ({
      ...datosPrevios,
      [id]: value,
    }));

    // Si ya se tocó, valida en tiempo real
    if (estaTocado) {
      establecerErrores(
        validarInicioSesion({ ...datosFormulario, [id]: value })
      );
    }
  };

  // Maneja cuando un campo pierde el foco (blur)
  const manejarPerdidaFoco = () => {
    if (!estaTocado) {
      establecerEstaTocado(true);
    }
    establecerErrores(validarInicioSesion(datosFormulario));
  };

  // Maneja el envío del formulario
  const manejarEnvio = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault(); // Previene el recargo de página

    const erroresActuales = validarInicioSesion(datosFormulario);
    establecerErrores(erroresActuales);
    establecerEstaTocado(true);

    // Si no hay errores, procede al login simulado
    if (Object.keys(erroresActuales).length === 0) {
      console.log('Intentando iniciar sesión con:', datosFormulario);
      try {
        // Simulación de login exitoso (debes reemplazarlo con lógica real)
        const nuevoUsuario = new Usuario({
          id: 'usuario-123',
          nombreUsuario: datosFormulario.nombreUsuario,
          email: `${datosFormulario.nombreUsuario}@ejemplo.com`,
        });

        // Llama al callback con el usuario simulado
        alIniciarSesionExitoso(nuevoUsuario);

        // Limpia el formulario
        establecerDatosFormulario({ nombreUsuario: '', contraseña: '' });
        establecerErrores({});
        establecerEstaTocado(false);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        establecerErrores({
          nombreUsuario: 'Ocurrió un error al iniciar sesión.',
        });
      }
    } else {
      console.log('Formulario de inicio de sesión inválido. Corrige los errores.');
    }
  };

  return (
    <div className="caja-autenticacion">
      {/* Imagen decorativa al lado izquierdo */}
      <div className="lado-imagen">
        <div className="lado-imagen-contenido">
          <img src="/Saly-13.png" alt="Bienvenido" />
          <h3>Bienvenido de nuevo</h3>
        </div>
      </div>

      {/* Formulario de login */}
      <div className="lado-formulario">
        <h2 className="titulo-formulario">¡Bienvenido!</h2>
        <form onSubmit={manejarEnvio} noValidate>
          {/* Campo de usuario */}
          <div className="grupo-form">
            <label htmlFor="nombreUsuario" className="sr-solo">Usuario</label>
            <i className="fas fa-user icono-input-izquierda"></i>
            <input
              type="text"
              id="nombreUsuario"
              value={datosFormulario.nombreUsuario}
              onChange={manejarCambio}
              onBlur={manejarPerdidaFoco}
              placeholder="Usuario"
              aria-invalid={!!errores.nombreUsuario}
              aria-describedby={errores.nombreUsuario ? 'nombreUsuario-error' : undefined}
            />
            {errores.nombreUsuario && (
              <p id="nombreUsuario-error" className="mens-error">
                {errores.nombreUsuario}
              </p>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="grupo-form">
            <label htmlFor="contraseña" className="sr-solo">Contraseña</label>
            <i className="fas fa-lock icono-input-izquierda"></i>
            <input
              type="password"
              id="contraseña"
              value={datosFormulario.contraseña}
              onChange={manejarCambio}
              onBlur={manejarPerdidaFoco}
              placeholder="Contraseña"
              aria-invalid={!!errores.contraseña}
              aria-describedby={errores.contraseña ? 'contraseña-error' : undefined}
            />
            {errores.contraseña && (
              <p id="contraseña-error" className="mens-error">
                {errores.contraseña}
              </p>
            )}
          </div>

          {/* Botón de enviar */}
          <button type="submit" className="btn-principal">
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace para ir al registro */}
        <p className="enl-nav">
          ¿No tienes una cuenta?{' '}
          <a href="#" onClick={alNavegarARegistro}>
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default FormInicioSesion;
