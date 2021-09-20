const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev');   
const path = require('path');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false

    })
    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  
    mainWindow.loadURL(startURL);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => {
    mainWindow = null;
    });
  }

  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })