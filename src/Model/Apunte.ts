// src/Model/apunte.ts

export class Apunte {
  id: string;
  titulo: string;
  contenido: string; 
  fechaCreacion: string;
  fechaModificacion: string;
  categoriaId: string | null;
  archivada: boolean;
  favorita: boolean;

  constructor(apunte: {
    id: string;
    titulo: string;
    contenido: string;
    fechaCreacion: string;
    fechaModificacion: string;
    categoriaId: string | null;
    archivada?: boolean;
    favorita?: boolean;
  }) {
    this.id = apunte.id;
    this.titulo = apunte.titulo;
    this.contenido = apunte.contenido;
    this.fechaCreacion = apunte.fechaCreacion;
    this.fechaModificacion = apunte.fechaModificacion;
    this.categoriaId = apunte.categoriaId;
    this.archivada = apunte.archivada ?? false;
    this.favorita = apunte.favorita ?? false;
  }

  actualizarContenido(nuevoContenido: string): void {
    this.contenido = nuevoContenido;
    this.fechaModificacion = new Date().toISOString();
  }

  marcarComoFavorita(): void {
    this.favorita = true;
  }

  desmarcarFavorita(): void {
    this.favorita = false;
  }

  archivar(): void {
    this.archivada = true;
  }

  desarchivar(): void {
    this.archivada = false;
  }

  obtenerResumen(): string {
    return this.contenido.length > 100
      ? this.contenido.slice(0, 100) + '...'
      : this.contenido;
  }
}
