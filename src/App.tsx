// src/App.tsx

import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import FormInicioSesion from './Componentes/FormInicioSesion';
import FormRegistro from './Componentes/FormRegistro';
import NotesAppLayout from './Pages/NotesAppLayout';
import { Usuario } from './Model/Usuario';
import './index.css'; // Asegúrate de importar primero los estilos base
import './style/dashboard.css'; // Luego los estilos del dashboard (para que sobrescriban si es necesario)
import './style/login.css'; // Y los estilos de login

function App() {
  const [perfilUsuario, establecerPerfilUsuario] = useState<Usuario | null>(() => {
    try {
      const usuarioGuardado = localStorage.getItem('usuario');
      return usuarioGuardado ? new Usuario(JSON.parse(usuarioGuardado)) : null;
    } catch (error) {
      console.error('Error al cargar usuario desde localStorage:', error);
      localStorage.removeItem('usuario');
      return null;
    }
  });

  const navegar = useNavigate();

  const manejarInicioSesionExitoso = (perfil: Usuario) => {
    localStorage.setItem('usuario', JSON.stringify(perfil));
    establecerPerfilUsuario(perfil);
    navegar('/dashboard');
  };

  const manejarRegistroExitoso = (perfil: Usuario) => {
    localStorage.setItem('usuario', JSON.stringify(perfil));
    establecerPerfilUsuario(perfil);
    navegar('/dashboard');
  };

  const manejarCierreSesion = () => {
    localStorage.removeItem('usuario');
    establecerPerfilUsuario(null);
    navegar('/login');
  };

  return (
    <Routes>
      {/* RUTAS DE AUTENTICACIÓN - Envueltas en el contenedor de centrado */}
      <Route
        path="/login"
        element={
          perfilUsuario ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <div className="contenedor-centrado-autenticacion"> {/* Nuevo contenedor */}
              <FormInicioSesion
                alIniciarSesionExitoso={manejarInicioSesionExitoso}
                alNavegarARegistro={() => navegar('/register')}
              />
            </div>
          )
        }
      />
      <Route
        path="/register"
        element={
          perfilUsuario ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <div className="contenedor-centrado-autenticacion"> {/* Nuevo contenedor */}
              <FormRegistro
                alRegistroExitoso={manejarRegistroExitoso}
                alNavegarAInicioSesion={() => navegar('/login')}
              />
            </div>
          )
        }
      />

      {/* RUTA DEL DASHBOARD - Sin el contenedor de centrado, para que ocupe toda la pantalla */}
      <Route
        path="/dashboard"
        element={
          perfilUsuario ? (
            // El componente NotesAppLayout ya tiene la clase "diseño-dashboard"
            // que se encargará de ocupar el 100% de width/height de su padre.
            // Asegúrate de que el body y html también tengan height: 100% en index.css
            <NotesAppLayout
              perfilUsuario={perfilUsuario}
              alCierreSesion={manejarCierreSesion}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;