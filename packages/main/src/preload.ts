import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('fs', {
  readDirectory: (dirPath: string) => ipcRenderer.invoke('fs:read-directory', dirPath),
  readFile: (path: string) => ipcRenderer.invoke('fs:read-file', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('fs:write-file', path, content),
  createDirectory: (dirPath: string) => ipcRenderer.invoke('fs:create-directory', dirPath),
});

contextBridge.exposeInMainWorld('path', {
  join: (...paths: string[]) => ipcRenderer.invoke('path:join', ...paths),
});
