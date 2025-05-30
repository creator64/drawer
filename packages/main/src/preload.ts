import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('fs', {
  readDirectory: (dirPath: string) => ipcRenderer.invoke('fs:read-directory', dirPath),
});

contextBridge.exposeInMainWorld('path', {
  join: (...paths: string[]) => ipcRenderer.invoke('path:join', ...paths),
});
