const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev');   
const path = require('path');
const Store = require('electron-store');
const { channels } = require('../src/constants/storeChannels')

const schema = {
  launchAtStart: true,
  currentSession: {
    startDate: 0,
    peds: 0,
    meters: 0,
    endDate: 0
  }
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

    //last results
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send(channels.LAST_RESULT, store.get(channels.RESULTS));
    });
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

ipcMain.on('asynchronous-message', (event, arg) => {
    //Save them to the store
    store.set('test', arg);

    console.log('store', store.get('test'));
});
``
ipcMain.on(channels.RESULTS, (event, arg) => {
    //Save them to the store
    store.set(channels.RESULTS, arg);

    console.log('store', store.get(channels.RESULTS));
});

ipcMain.on(channels.ACTIVITY_PARAMS, (event, arg) => {
    //Save them to the store
    store.set(channels.ACTIVITY_PARAMS, arg);

    console.log('store', store.get(channels.ACTIVITY_PARAMS));
});