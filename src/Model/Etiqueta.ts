// src/Model/etiqueta.ts

// Clase que representa una etiqueta o tag asociada a notas o tareas
export class Etiqueta {
    id: string;        
    nombre: string;     // Nombre  de la etiqueta (ej: "urgente", "trabajo")

    // Constructor de la clase Etiqueta
    constructor(id: string, nombre: string) {
        // Validación: el nombre no puede estar vacío ni solo con espacios
        if (!nombre || nombre.trim() === '') {
            throw new Error('La etiqueta debe tener un nombre válido');
        }

        // Asignación de valores a las propiedades
        this.id = id;
        this.nombre = nombre;
    }
}
