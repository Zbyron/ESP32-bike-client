const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev');   
const path = require('path');
const Store = require('electron-store');

const schema = {
  launchAtStart: true
}
const store = new Store(schema);
let mainWindow;
app.allowRendererProcessReuse = false

function createWindow () {
    mainWindow = new BrowserWindow({
        title:"ESP32-Bike",
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule:true,
            preload: __dirname + '/preload.js'
        }

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

ipcMain.on('asynchronous-message', (event, arg) => {
    console.log('heyyyy', arg); // prints "heyyyy ping"

    //Save them to the store
    store.set('test', arg);

    console.log('store', store.get('test'));
});

ipcMain.on('results', (event, arg) => {
    //Save them to the store
    store.set('results', arg);

    console.log('store', store.get('results'));
});

ipcMain.on('activity-params', (event, arg) => {
    //Save them to the store
    store.set('params', arg);

    console.log('store', store.get('params'));
});