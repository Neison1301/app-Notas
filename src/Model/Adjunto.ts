// Archivo adjunto a un apunte (imagen, PDF, etc.).
// src/Model/adjunto.ts

export class Adjunto {
    id: string;
    nombreArchivo: string;
    url: string;
    tipoMime: string;

    constructor(id: string, nombreArchivo: string, url: string, tipoMime: string) {
        if (!nombreArchivo || nombreArchivo.trim() === '') {
            throw new Error('El nombre del archivo no puede estar vacío');
        }

        if (!url.startsWith('http')) {
            throw new Error('La URL del archivo adjunto no es válida');
        }

        this.id = id;
        this.nombreArchivo = nombreArchivo;
        this.url = url;
        this.tipoMime = tipoMime;
    }

    obtenerInformacion(): string {
        return `${this.nombreArchivo} (${this.tipoMime}) - ${this.url}`;
    }
}
