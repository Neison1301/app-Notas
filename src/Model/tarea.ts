// src/Model/Tarea.ts

import { Nota } from './Nota';
import { Categoria } from './Categoria';
import { Etiqueta } from './Etiqueta';
import { Adjunto } from './Adjunto';

// Clase que representa una tarea basada en una nota, con una fecha límite y estado de completado.
export class Tarea extends Nota {
  fechaLimite: Date;
  completada: boolean;

  constructor(params: {
    id: string;
    usuarioId: string;
    titulo: string;
    contenido: string;
    fechaCreacion: Date;
    fechaLimite: Date;
    completada?: boolean;
    categoria?: Categoria;
    etiquetas?: Etiqueta[];
    adjuntos?: Adjunto[];
  }) {
    // Desestructuramos lo que necesitamos para Nota y lo demás lo usamos para Tarea
    const {
      id,
      usuarioId,
      titulo,
      contenido,
      fechaCreacion,
      fechaLimite,
      completada = false,
      categoria,
      etiquetas,
      adjuntos
    } = params;

    // Llamamos al constructor de Nota pasándole solo lo que le corresponde
    super({
      id,
      usuarioId,
      titulo,
      contenido,
      fechaCreacion,
      categoria,
      etiquetas,
      adjuntos
    });

    // Asignamos propiedades específicas de Tarea
    this.fechaLimite = fechaLimite;
    this.completada = completada;
  }

  // Marca la tarea como completada
  marcarComoCompletada() {
    this.completada = true;
  }

  // Verifica si la tarea está vencida
  estaVencida(): boolean {
    return !this.completada && new Date() > this.fechaLimite;
  }
}
