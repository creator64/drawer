import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('fs', {
  readDirectory: (dirPath: string) => ipcRenderer.invoke('fs:read-directory', dirPath),
  readFile: (path: string) => ipcRenderer.invoke('fs:read-file', path),
});

contextBridge.exposeInMainWorld('path', {
  join: (...paths: string[]) => ipcRenderer.invoke('path:join', ...paths),
});
