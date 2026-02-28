const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {

  const win = new BrowserWindow({
    fullscreen: true,      // Fullscreen
    kiosk: true,           // True kiosk mode
    autoHideMenuBar: true, // Hide top menu
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});