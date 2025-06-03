import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs/promises';
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
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  return entries.map((entry) => ({ ...entry, isDirectory: entry.isDirectory() }));
});

ipcMain.handle('fs:read-file', async (_, path: string): Promise<string> => {
  return await fs.readFile(path, 'utf-8');
});

ipcMain.handle('fs:write-file', async (_, path: string, content: string): Promise<void> => {
  await fs.writeFile(path, content);
});

ipcMain.handle('fs:create-directory', async (_, dirPath: string): Promise<void> => {
  await fs.mkdir(dirPath);
});

ipcMain.handle('path:join', async (_, ...paths: string[]): Promise<string> => {
  return path.join(...paths);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
