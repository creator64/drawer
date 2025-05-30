import { EDirent } from '@lib/types';

export interface fsApi {
  readDirectory: (dirPath: string) => Promise<EDirent[]>;
  readFile: (path: string) => Promise<string>;
}

export interface pathApi {
  join: (...paths: string[]) => Promise<string>;
}
