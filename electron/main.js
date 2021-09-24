const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev');   
const path = require('path');
const Store = require('electron-store');
const { channels } = require('../src/constants/storeChannels')
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./public/db.sqlite3', (err) => {
    if (err) console.error('Database opening error: ', err);
});


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

ipcMain.on(channels.RESULTS, (event, arg) => {
    //Save them to the store
    const sql = arg;

    database.all(sql, (err, rows) => {
        event.reply(channels.RESULTS, (err && err.message) || rows);
    });

});

ipcMain.on(channels.ADD_SESSION, (event, arg) => {
    //Save them to the store
    const sql = arg;

    database.run(sql, (err) => {
        event.reply(channels.ADD_SESSION, (err && err.message));
    });

});


