// src/Componentes/FormRegistro.tsx

import React, { useState } from "react";
import {
  Usuario,
  type EntradasFormularioRegistro,
  type ErroresFormularioRegistro,
} from "../Model/Usuario";
import { validarRegistro } from "../services/validacion";
import '../style/login.css'; 

// Interfaz para las props del formulario de registro
interface PropsFormularioRegistro {
  alRegistroExitoso: (perfilUsuario: Usuario) => void; // Callback cuando el registro se completa exitosamente
  alNavegarAInicioSesion: () => void; // Callback para navegar a la pantalla de inicio de sesión
}

// Componente funcional para el formulario de registro
const FormRegistro: React.FC<PropsFormularioRegistro> = ({
  alRegistroExitoso,
  alNavegarAInicioSesion,
}) => {
  // Estado para los datos ingresados por el usuario
  const [datosFormulario, establecerDatosFormulario] =
    useState<EntradasFormularioRegistro>({
      nombreUsuario: "",
      email: "",
      contraseña: "",
      confirmarContraseña: "",
    });

  // Estado para almacenar los errores del formulario
  const [errores, establecerErrores] = useState<ErroresFormularioRegistro>({});

  // Estado para verificar si se tocó algún campo (útil para validaciones en tiempo real)
  const [estaTocado, establecerEstaTocado] = useState<boolean>(false);

  // Maneja los cambios en los campos del formulario
  const manejarCambio = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = evento.target;
    establecerDatosFormulario((datosPrevios) => ({
      ...datosPrevios,
      [id]: value,
    }));

    if (estaTocado) {
      establecerErrores(validarRegistro({ ...datosFormulario, [id]: value }));
    }
  };

  // Ejecuta la validación cuando el usuario sale de un campo (onBlur)
  const manejarPerdidaFoco = () => {
    if (!estaTocado) {
      establecerEstaTocado(true);
    }
    establecerErrores(validarRegistro(datosFormulario));
  };

  // Maneja el envío del formulario
  const manejarEnvio = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault(); // Evita que se recargue la página

    // Validación de los campos actuales
    const erroresActuales = validarRegistro(datosFormulario);
    establecerErrores(erroresActuales);
    establecerEstaTocado(true);

    // Si no hay errores, simula el registro
    if (Object.keys(erroresActuales).length === 0) {
      console.log("Intentando registrar usuario con:", datosFormulario);
      try {
        // Crea un nuevo objeto Usuario (simulado)
        const nuevoUsuario = new Usuario({
          id: "nuevo-usuario-id",
          nombreUsuario: datosFormulario.nombreUsuario,
          email: datosFormulario.email,
          contraseña: datosFormulario.contraseña,
        });

        // Muestra por consola (podrías persistirlo en localStorage aquí)
        console.log("¡Registro exitoso! (Simulado)");

        // Llama al callback para notificar que el registro fue exitoso
        alRegistroExitoso(nuevoUsuario);

        // Limpia el formulario
        establecerDatosFormulario({
          nombreUsuario: "",
          email: "",
          contraseña: "",
          confirmarContraseña: "",
        });
        establecerErrores({});
        establecerEstaTocado(false);
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        establecerErrores({
          nombreUsuario: "Ocurrió un error al registrar.",
        });
      }
    } else {
      console.log("Formulario de registro inválido. Corrige los errores.");
    }
  };

  return (
    <div className="caja-autenticacion">
      {/* Sección izquierda: imagen decorativa */}
      <div className="lado-imagen">
        <div className="lado-imagen-contenido">
          <img src="/Saly-13.png" alt="Bienvenido al registro" />
          <h3>Crea tu cuenta</h3>
        </div>
      </div>

      {/* Sección derecha: formulario de registro */}
      <div className="lado-formulario">
        <h2 className="titulo-formulario">Registrarse</h2>
        <form onSubmit={manejarEnvio} noValidate>
          {/* Campo de nombre de usuario */}
          <div className="grupo-form">
            <label htmlFor="nombreUsuario" className="sr-solo">Usuario</label>
            <i className="fas fa-user icono-input-izquierda"></i>
            <input
              type="text"
              id="nombreUsuario"
              value={datosFormulario.nombreUsuario}
              onChange={manejarCambio}
              onBlur={manejarPerdidaFoco}
              placeholder="Escribe tu usuario"
              aria-invalid={!!errores.nombreUsuario}
              aria-describedby={errores.nombreUsuario ? "nombreUsuario-error" : undefined}
            />
            {errores.nombreUsuario && (
              <p id="nombreUsuario-error" className="mens-error">
                {errores.nombreUsuario}
              </p>
            )}
          </div>

          {/* Campo de correo electrónico */}
          <div className="grupo-form">
            <label htmlFor="email" className="sr-solo">Correo Electrónico</label>
            <i className="fas fa-envelope icono-input-izquierda"></i>
            <input
              type="email"
              id="email"
              value={datosFormulario.email}
              onChange={manejarCambio}
              onBlur={manejarPerdidaFoco}
              placeholder="Escribe tu correo electrónico"
              aria-invalid={!!errores.email}
              aria-describedby={errores.email ? "email-error" : undefined}
            />
            {errores.email && (
              <p id="email-error" className="mens-error">
                {errores.email}
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
              placeholder="Escribe tu contraseña"
              aria-invalid={!!errores.contraseña}
              aria-describedby={errores.contraseña ? "contraseña-error" : undefined}
            />
            {errores.contraseña && (
              <p id="contraseña-error" className="mens-error">
                {errores.contraseña}
              </p>
            )}
          </div>

          {/* Campo de confirmar contraseña (opcional) */}
          {/* 
          <div className="grupo-form">
            <label htmlFor="confirmarContraseña" className="sr-solo">Confirmar Contraseña</label>
            <i className="fas fa-lock icono-input-izquierda"></i>
            <input
              type="password"
              id="confirmarContraseña"
              value={datosFormulario.confirmarContraseña}
              onChange={manejarCambio}
              onBlur={manejarPerdidaFoco}
              placeholder="Confirma tu contraseña"
              aria-invalid={!!errores.confirmarContraseña}
              aria-describedby={errores.confirmarContraseña ? "confirmarContraseña-error" : undefined}
            />
            {errores.confirmarContraseña && (
              <p id="confirmarContraseña-error" className="mens-error">
                {errores.confirmarContraseña}
              </p>
            )}
          </div>
          */}

          {/* Botón de registro */}
          <button type="submit" className="btn-principal">
            Registrarse
          </button>
        </form>

        {/* Enlace para cambiar a la pantalla de inicio de sesión */}
        <p className="enl-nav">
          ¿Ya tienes cuenta?{" "}
          <a href="#" onClick={alNavegarAInicioSesion}>
            Inicia Sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default FormRegistro;
