// src/Model/Categoria.ts

export class Categoria {
    id: string;
    nombre: string;
    usuarioId: string;

    constructor(id: string, nombre: string) {
        if (!nombre || nombre.trim() === '') {
            throw new Error('El nombre de la categoría no puede estar vacío');
        }

        this.id = id;
        this.nombre = nombre;
        this.usuarioId = '';   
    }
}
