const noteFrequencies = {
    'A0': 'Notas/Mib.mp3', 'B0': 'Notas/Labc2.mp3', 'C0': 'Notas/Fac3.mp3', 'D0': 'NotasTd/FahMc1.mp3', 
    'A1': 'Notas/La1.mp3', 'B1': 'Notas/Lac2.mp3', 'C1': 'Notas/Rec3.mp3', 'D1': 'Notas/Fac3.mp3', 
    'A2': 'Notas/Reb.mp3', 'B2': 'Notas/Rec2.mp3', 'C2': 'Notas/Solc3.mp3', 'D2': 'Notas/Fac3.mp3', 
    'A3': 'Notas/Mi2.mp3', 'B3': 'Notas/FaHc2.mp3', 'C3': 'Notas/Sic3.mp3', 'D3': 'Notas/Fac3.mp3', 
    'A4': 'Notas/La2.mp3', 'B4': 'Notas/La2c2.mp3', 'C4': 'Notas/Re2c3.mp3', 'D4': 'Notas/Fac3.mp3', 
    'A5': 'Notas/Reb2.mp3', 'B5': 'Notas/Re2c2.mp3', 'C5': 'Notas/sol2c3.mp3', 'D5': 'Notas/Fac3.mp3', 
    'A6': 'Notas/Mi3.mp3', 'B6': 'Notas/FaH2c2.mp3', 'C6': 'Notas/Si2c3.mp3', 'D6': 'Notas/Fac3.mp3', 
    'A7': 'Notas/La3.mp3', 'B7': 'Notas/La3c2.mp3', 'C7': 'Notas/Re3c3.mp3', 'D7': 'Notas/Fac3.mp3', 
    'A8': 'Notas/Reb3.mp3', 'B8': 'Notas/Re3c2.mp3', 'C8': 'Notas/Sol3c3.mp3', 'D8': 'Notas/Fac3.mp3', 
    'A9': 'Notas/Mi4.mp3', 'B9': 'Notas/FaH3c2.mp3', 'C9': 'Notas/Si3c3.mp3', 'D9': 'Notas/Fac3.mp3',  
    'B10': 'Notas/La4c2.mp3', 'D10': 'Notas/Fac3.mp3', 'D11': 'Notas/Fac3.mp3', 
};
 
let sonidosActivos = {};
let fuelleAbierto = false;

function reproducirNota(nota) {
    const ruta = noteFrequencies[nota];
    if (ruta) {
        const audio = new Audio(ruta);
        audio.loop = true; 
        audio.play().catch(error => {
            console.error(`Error al reproducir el sonido para la nota ${nota}:`, error);
        });
        sonidosActivos[nota] = audio; 
    } else {
        console.error(`No se encontró la ruta para la nota: ${nota}`);
    }
}

function detenerNota(nota) {
    if (sonidosActivos[nota]) {
        sonidosActivos[nota].pause(); 
        sonidosActivos[nota].currentTime = 0; 
        delete sonidosActivos[nota]; 
    }
}

function reproducirSonidosFuelle(fuelleCerrado) {
    if (fuelleCerrado) {
        //* Reproducir sonidos suaves cuando el fuelle está cerrado
        Object.keys(sonidosActivos).forEach(nota => {
            if (sonidosActivos[nota]) {
                sonidosActivos[nota].volume = 0.3; //* Suaviza el volumen
            }
        });
    } else {
        // Reproducir sonidos normales
        Object.keys(sonidosActivos).forEach(nota => {
            if (sonidosActivos[nota]) {
                sonidosActivos[nota].volume = 1; //* Volumen normal
            } 
        });
    }
}

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

document.addEventListener('keydown', (e) => {
    const keyPressed = e.key.toUpperCase();
    const boton = document.querySelector(`button[data-key="${keyPressed}"]`);

    if (boton && !sonidosActivos[boton.dataset.nota]) {
        const nota = boton.dataset.nota;
        reproducirNota(nota);
        boton.classList.add('active');
    }

    if (e.key === 'ArrowRight') {
        if (!fuelleAbierto) {
            reproducirSonidosFuelle(false);
            fuelleAbierto = true;
        }
    } else if (e.key === 'ArrowLeft') {
        if (fuelleAbierto) {
            reproducirSonidosFuelle(true);
            fuelleAbierto = false;
        }
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

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        reproducirSonidosFuelle(false);
    }
});

const fuelle = document.getElementById("fuelle");
let modifier = 5;
fuelle.style.left = "0px"; //* Asegura un valor inicial

document.addEventListener('keydown', (event) => {
    const style = fuelle.style;
    switch(event.key) {
        case 'ArrowRight':
            const rightPos = parseInt(style.left) || 0;
            if (rightPos < 30) { 
                style.left = `${rightPos + modifier}px`; 
            }
            break;
        case 'ArrowLeft':
            const leftPos = parseInt(style.left) || 0;
            if (leftPos > 0) { //* Evita que el fuelle se mueva fuera del contenedor hacia la izquierda
                style.left = `${leftPos - modifier}px`;
            }
            break;
    }
});
