import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
// Mantener una referencia global del objeto window para evitar que la ventana se cierre automáticamente cuando el objeto JavaScript sea recogido por el recolector de basura.
var mainWindow = null;
function createWindow() {
    // Crear la ventana del navegador.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    // Cargar la URL de la aplicación.
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        // Abrir las DevTools.
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    }
    // Emitido cuando la ventana es cerrada.
    mainWindow.on('closed', function () {
        // Eliminar la referencia del objeto window, normalmente guardarías las ventanas en un array si tu aplicación soporta múltiples ventanas, este es el momento en que deberías eliminar el elemento correspondiente.
        mainWindow = null;
    });
}
// Este método se llamará cuando Electron haya terminado la inicialización y esté listo para crear ventanas del navegador.
// Algunas APIs pueden usarse sólo después de que este evento ocurra.
app.whenReady().then(createWindow);
// Salir cuando todas las ventanas estén cerradas, excepto en macOS. Allí, es común para las aplicaciones y sus barras de menú permanecer activas hasta que el usuario sale explícitamente con Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    // En macOS, es común volver a crear una ventana en la aplicación cuando el icono del dock es clicado y no hay otras ventanas abiertas.
    if (mainWindow === null) {
        createWindow();
    }
});
