// script.js
document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const streamURL = 'https://c26.radioboss.fm:8581/stream';
    const localFile = 'AEROSUR1.mp3';
    let isOnline = true;

    // Función para verificar la conexión de internet
    function checkStream() {
        fetch(streamURL, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then(() => {
                if (!isOnline) {
                    switchToStream();
                }
            })
            .catch(() => {
                if (isOnline) {
                    switchToLocalFile();
                }
            });
    }

    // Cambia a la transmisión en vivo
    function switchToStream() {
        isOnline = true;
        audioSource.src = streamURL;
        audioPlayer.load();
        audioPlayer.play();
        console.log('Conectado a la transmisión en vivo');
    }

    // Cambia al archivo local
    function switchToLocalFile() {
        isOnline = false;
        audioSource.src = localFile;
        audioPlayer.load();
        audioPlayer.play();
        console.log('Reproduciendo archivo local');
    }

    // Evento que se dispara cuando hay un error de reproducción
    audioPlayer.addEventListener('error', () => {
        if (isOnline) {
            switchToLocalFile();
        } else {
            console.log('Error al reproducir el archivo local');
        }
    });

    // Verificar la conexión de la transmisión cada 10 segundos
    setInterval(checkStream, 10000);

    // Iniciar la reproducción
    audioPlayer.play();
});
