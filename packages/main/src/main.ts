import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import 'electron-reload';
import 'dotenv/config';
import { EDirent } from '@lib/types';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.setMenu(null);

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

// IPC to expose fs
ipcMain.handle('fs:read-directory', async (_, dirPath: string): Promise<EDirent[]> => {
  const entries = await fsp.readdir(dirPath, { withFileTypes: true });
  return entries.map((entry) => ({ ...entry, isDirectory: entry.isDirectory() }));
});

ipcMain.handle('fs:read-file', async (_, path: string): Promise<string> => {
  return await fsp.readFile(path, 'utf-8');
});

ipcMain.handle('fs:write-file', async (_, path: string, content: string): Promise<void> => {
  await fsp.writeFile(path, content);
});

ipcMain.handle('fs:create-directory', async (_, dirPath: string): Promise<void> => {
  await fsp.mkdir(dirPath);
});

ipcMain.handle('fs:exists', async (_, path: string): Promise<boolean> => {
  return fs.existsSync(path);
});

ipcMain.handle('path:join', async (_, ...paths: string[]): Promise<string> => {
  return path.join(...paths);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
