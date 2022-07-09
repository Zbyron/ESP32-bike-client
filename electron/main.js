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
      endDate:0,
      score:0 ,
      avgSpeed: 0,
      version: 0
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
        mainWindow.webContents.send(channels.LAST_SESSION, store.get(channels.LAST_SESSION));
    });
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

// SESSIONS
ipcMain.on(channels.SESSIONS, (event, arg) => {
    const sql =  `SELECT * FROM SESSION ORDER BY ID DESC LIMIT ${arg} ;`

    database.all(sql, (err, rows) => {
        event.reply(channels.SESSIONS, (err && err.message) || rows);
    });
});

//LAST_RESULT
ipcMain.on(channels.LAST_SESSION, (event) => {
        event.reply(channels.LAST_SESSION, store.get(channels.LAST_SESSION));
});

//ADD_SESSION
ipcMain.on(channels.ADD_SESSION, (event, { startDate, peds, meters, endDate, score, avgSpeed, version}) => {
    const lastSession = { startDate, peds, meters, endDate, score, avgSpeed, version}
    store.set(channels.LAST_SESSION, lastSession) 
    
    const sql = `INSERT INTO SESSION (START_DATE, END_DATE, PEDS, METERS, SCORE, VERSION, AVG_SPEED) VALUES( "${startDate}" ,"${endDate}", ${peds}, ${meters}, ${score}, ${version}, ${avgSpeed});`
    database.run(sql, (err) => {
        event.reply(channels.ADD_SESSION, (err && err.message));
    });

});


const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline; 
const usbport = new SerialPort("COM7", {
    baudRate: 9600
})
const parser = usbport.pipe(new Readline({ delimiter: '\r\n' })); 
parser.on('data', function (data) {
    console.log('data ',data)
    if(data === "ESP32_BIKE_PED"){
      mainWindow.webContents.send(channels.COM_EVENT, data);
    }
});