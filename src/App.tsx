// src/App.tsx

import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import FormInicioSesion from './Componentes/FormInicioSesion';
import FormRegistro from './Componentes/FormRegistro';
import NotesAppLayout from './Pages/NotesAppLayout';
import { Usuario } from './Model/Usuario';

function App() {
  // Estado para almacenar el usuario autenticado
  // Intenta recuperar el usuario desde localStorage al cargar la aplicación
  const [perfilUsuario, establecerPerfilUsuario] = useState<Usuario | null>(() => {
    try {
      const usuarioGuardado = localStorage.getItem('usuario');
      return usuarioGuardado ? new Usuario(JSON.parse(usuarioGuardado)) : null;
    } catch (error) {
      console.error('Error al cargar usuario desde localStorage:', error);
      localStorage.removeItem('usuario'); // Si hay error, se limpia
      return null;
    }
  });

  const navegar = useNavigate(); // Hook para redirigir programáticamente

  // Maneja el inicio de sesión exitoso
  const manejarInicioSesionExitoso = (perfil: Usuario) => {
    localStorage.setItem('usuario', JSON.stringify(perfil)); // Guardar en localStorage
    establecerPerfilUsuario(perfil); // Guardar en estado
    navegar('/dashboard'); // Redirigir al dashboard
  };

  // Maneja el registro exitoso (similar al login)
  const manejarRegistroExitoso = (perfil: Usuario) => {
    localStorage.setItem('usuario', JSON.stringify(perfil));
    establecerPerfilUsuario(perfil);
    navegar('/dashboard');
  };

  // Cierra sesión: limpia todo y redirige al login
  const manejarCierreSesion = () => {
    localStorage.removeItem('usuario');
    establecerPerfilUsuario(null);
    navegar('/login');
  };

  return (
    <div className="cont-app">
      <Routes>
        {/* Ruta de login */}
        <Route
          path="/login"
          element={
            perfilUsuario ? (
              <Navigate to="/dashboard" replace /> // Si ya está logueado, redirige
            ) : (
              <FormInicioSesion
                alIniciarSesionExitoso={manejarInicioSesionExitoso}
                alNavegarARegistro={() => navegar('/registro')}
              />
            )
          }
        />

        {/* Ruta de registro */}
        <Route
          path="/registro"
          element={
            perfilUsuario ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <FormRegistro
                alRegistroExitoso={manejarRegistroExitoso}
                alNavegarAInicioSesion={() => navegar('/login')}
              />
            )
          }
        />

        {/* Ruta protegida del dashboard */}
        <Route
          path="/dashboard/*"
          element={
            perfilUsuario ? (
              <NotesAppLayout
                perfilUsuario={perfilUsuario}
                alCierreSesion={manejarCierreSesion}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirección automática a login si se entra a raíz */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Cualquier otra ruta inexistente redirige a login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
