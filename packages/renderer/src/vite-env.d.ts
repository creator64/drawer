/// <reference types="vite/client" />
import { fsApi, pathApi } from './lib/types';

declare global {
  interface Window {
    fs: fsApi;
    path: pathApi;
  }
}
