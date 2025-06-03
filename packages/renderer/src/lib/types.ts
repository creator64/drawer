import { EDirent } from '@lib/types';

export interface fsApi {
  readDirectory: (dirPath: string) => Promise<EDirent[]>;
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, content: string) => Promise<void>;
  createDirectory: (dirPath: string) => Promise<void>;
  createFile: (path: string) => Promise<void>;
  exists: (path: string) => Promise<boolean>;
}

export interface pathApi {
  join: (...paths: string[]) => Promise<string>;
}
