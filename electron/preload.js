const {
    contextBridge,
    ipcRenderer
} = require("electron");

const { channels }  = require('../src/constants/storeChannels')
const availableChannels = Object.values(channels)
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send:  (channel, data) => {
            // whitelist channels
            // let validChannels = ["asynchronous-message",'results', 'activity-params'];
            if (availableChannels.includes(channel)) {
                return ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            // let validChannels = ["fromMain"];
            if (availableChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                const newFunc = (_, data) => func(data);
                ipcRenderer.on(channel,newFunc);
                return () => {
                    return ipcRenderer.removeListener(channel, newFunc);
                };
            }
        },
        removeListener: (channel, func) => {
            if (validChannels.includes(channel)) {
              ipcRenderer.removeListener(channel, func);
            }
          },
    }
);