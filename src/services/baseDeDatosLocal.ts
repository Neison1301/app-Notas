import { Usuario } from '../Model/Usuario';
import { Nota } from '../Model/Nota';

type BaseDeDatos = {
  usuarios: Usuario[];
  notas: Nota[];
};

const LLAVE_BD = 'basedatos';

const obtenerBase = (): BaseDeDatos => {
  const data = localStorage.getItem(LLAVE_BD);
  return data ? JSON.parse(data) : { usuarios: [], notas: [] };
};

const guardarBase = (base: BaseDeDatos): void => {
  localStorage.setItem(LLAVE_BD, JSON.stringify(base));
};

// ===================== USUARIOS =====================
export const agregarUsuario = (usuario: Usuario): void => {
  const base = obtenerBase();
  if (base.usuarios.some(u => u.email === usuario.email)) {
    throw new Error('Correo ya registrado');
  }
  base.usuarios.push(usuario);
  guardarBase(base);
};

export const buscarUsuario = (nombreUsuario: string, contraseña: string): Usuario | null => {
  const base = obtenerBase();
  return base.usuarios.find(u => u.nombreUsuario === nombreUsuario && u.contraseña === contraseña) || null;
};

// ===================== NOTAS =====================
export const agregarNota = (nota: Nota): void => {
  const base = obtenerBase();
  base.notas.push(nota);
  guardarBase(base);
};

export const obtenerNotasPorUsuario = (usuarioId: string): Nota[] => {
  const base = obtenerBase();
  return base.notas.filter(n => n.categoria?.usuarioId === usuarioId); // Asegúrate de que `Categoria` tenga `usuarioId`
};
