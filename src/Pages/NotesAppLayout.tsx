// src/Pages/NotesAppLayout.tsx
import React from 'react';
import { Usuario } from '../Model/Usuario';
import '../style/dashboard.css'; // Asegúrate de tener los estilos

interface PropsNotesAppLayout {
  perfilUsuario: Usuario;
  alCierreSesion: () => void;
}

const NotesAppLayout: React.FC<PropsNotesAppLayout> = ({ perfilUsuario, alCierreSesion }) => {
  return (
    <div className="diseño-dashboard">
      {/* Sidebar lateral */}
      <aside className="barra-lateral">
        <h2 className="titulo-sidebar">BIENVENIDO</h2>
        <nav className="menu-navegacion">
          <ul>
            <li><i className="fas fa-folder"></i> Carpetas</li>
            <li><i className="fas fa-sticky-note"></i> Notas</li>
            <li><i className="fas fa-check-square"></i> Tareas</li>
            <li><i className="fas fa-cog"></i> Ajustes</li>
            <li onClick={alCierreSesion} className="cerrar-sesion">
              <i className="fas fa-sign-out-alt"></i> Cerrar sesión
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="contenido-principal">
        <h2>¡Bienvenido, {perfilUsuario.nombreUsuario}!</h2>
        <p>Correo: {perfilUsuario.email}</p>
        <p>ID de usuario: {perfilUsuario.id}</p>
        <p>Token: {perfilUsuario.obtenerTokenParcial()}</p>
        <br /><br /><br />
      </main>
    </div>
  );
};

export default NotesAppLayout;
