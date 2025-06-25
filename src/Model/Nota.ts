// src/Model/Nota.ts

// Importamos las dependencias necesarias para la nota
import { Categoria } from "./Categoria";
import { Etiqueta } from "./Etiqueta";
import { Adjunto } from "./Adjunto";

/*Clase que representa una nota general dentro de la aplicación.
 Las notas pueden tener categorías, etiquetas, adjuntos y están asociadas a un usuario.
 */
export class Nota {
  id: string;
  usuarioId: string;
  titulo: string;
  contenido: string;
  fechaCreacion: Date;
  categoria?: Categoria;
  etiquetas: Etiqueta[] = [];
  adjuntos: Adjunto[] = [];

  /**
   * Constructor de la clase Nota.
   * Recibe un objeto con todas las propiedades necesarias.
   */
  constructor(params: {
    id: string;
    usuarioId: string;
    titulo: string;
    contenido: string;
    fechaCreacion: Date;
    categoria?: Categoria;
    etiquetas?: Etiqueta[];
    adjuntos?: Adjunto[];
  }) {
    const {
      id,
      usuarioId,
      titulo,
      contenido,
      fechaCreacion,
      categoria,
      etiquetas,
      adjuntos,
    } = params;

    // Validamos que el título no esté vacío
    if (!titulo.trim()) {
      throw new Error("El título de la nota no puede estar vacío");
    }

    // Validamos que el usuarioId esté presente
    if (!usuarioId.trim()) {
      throw new Error("El usuarioId es obligatorio");
    }

    // Asignamos los valores recibidos a las propiedades de la instancia
    this.id = id;
    this.usuarioId = usuarioId;
    this.titulo = titulo;
    this.contenido = contenido;
    this.fechaCreacion = fechaCreacion;
    this.categoria = categoria;
    this.etiquetas = etiquetas ?? []; // Si no se pasa nada, inicializamos como lista vacía
    this.adjuntos = adjuntos ?? []; // Igual para los adjuntos
  }

  // Devuelve un resumen del contenido (primeros 100 caracteres).
  obtenerResumen(): string {
    return this.contenido.length > 100
      ? `${this.contenido.substring(0, 100)}...`
      : this.contenido;
  }

  // Actualiza el contenido completo de la nota.
  actualizarContenido(nuevoContenido: string) {
    this.contenido = nuevoContenido;
  }

  /** Agrega una nueva etiqueta a la lista de etiquetas. */
  agregarEtiqueta(etiqueta: Etiqueta) {
    this.etiquetas.push(etiqueta);
  }

  //Elimina una etiqueta por su nombre.
  quitarEtiqueta(nombreEtiqueta: string) {
    this.etiquetas = this.etiquetas.filter((e) => e.nombre !== nombreEtiqueta);
  }

  //Agrega un archivo adjunto a la nota.
  agregarAdjunto(adjunto: Adjunto) {
    this.adjuntos.push(adjunto);
  }
}
