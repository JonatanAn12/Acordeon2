const noteFrequencies = {
    'A0': 'Notas/Mib.mp3', 'B0': 'Notas/Labc2.mp3', 
    'A1': 'Notas/La1.mp3', 'B1': 'Notas/Lac2.mp3', 
    'A2': 'Notas/Reb.mp3', 'B2': 'Notas/Rec2.mp3',
    'A3': 'Notas/Mi2.mp3', 'B3': 'Notas/Fac2.mp3',
    'A4': 'Notas/La2.mp3', 'B4': 'Notas/La2c2.mp3',
    'A5': 'Notas/Reb2.mp3', 'B5': 'Notas/Re2c2.mp3',
    'A6': 'Notas/Mi3.mp3',  'B6': 'Notas/Labi2.mp3', 
    'A7': 'Notas/La3.mp3',  'B7': 'Notas/Labi2.mp3',
    'A8': 'Notas/Reb3.mp3', 'B8': 'Notas/Labi2.mp3',
    'A9': 'Notas/Mi4.mp3', 'B9': 'Notas/Labi2.mp3',
                            'B10': 'Notas/Labi2.mp3', 
                            
    
};

// Un objeto para almacenar los sonidos que se están reproduciendo
let sonidosActivos = {};

// Función para reproducir el sonido asociado a una nota
function reproducirNota(nota) {
    const ruta = noteFrequencies[nota];
    if (ruta) {
        const audio = new Audio(ruta);
        audio.play();
        audio.loop = true; // Para que el sonido siga reproduciéndose hasta que se suelte la tecla
        sonidosActivos[nota] = audio; // Guardamos la referencia al sonido en el objeto
    } else {
        console.error(`No se encontró la ruta para la nota: ${nota}`);
    }
}

// Función para detener el sonido asociado a una nota
function detenerNota(nota) {
    if (sonidosActivos[nota]) {
        sonidosActivos[nota].pause(); // Detenemos la reproducción
        sonidosActivos[nota].currentTime = 0; // Reiniciamos el sonido
        delete sonidosActivos[nota]; // Eliminamos la referencia del objeto
    }
}

// Añadir event listeners a los botones para que reproduzcan el sonido al hacer clic
document.querySelectorAll('.nota, .bajo, .acorde').forEach(boton => {
    boton.addEventListener('mousedown', () => {
        const nota = boton.dataset.nota;
        reproducirNota(nota);
        boton.classList.add('active');
    });
    
    boton.addEventListener('mouseup', () => {
        const nota = boton.dataset.nota;
        detenerNota(nota);
        boton.classList.remove('active');
    });
});

// Función para manejar los eventos de teclado
document.addEventListener('keydown', (e) => {
    const keyPressed = e.key.toUpperCase();
    const boton = document.querySelector(`button[data-key="${keyPressed}"]`);

    if (boton && !sonidosActivos[boton.dataset.nota]) { // Solo reproduce si no está ya activo
        const nota = boton.dataset.nota;
        reproducirNota(nota);
        boton.classList.add('active');
    }
});

document.addEventListener('keyup', (e) => {
    const keyPressed = e.key.toUpperCase();
    const boton = document.querySelector(`button[data-key="${keyPressed}"]`);

    if (boton) {
        const nota = boton.dataset.nota;
        detenerNota(nota);
        boton.classList.remove('active');
    }
});
