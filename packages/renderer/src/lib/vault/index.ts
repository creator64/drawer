import { Drawing, InvalidDrawing, InvalidDrawingReason } from './types';
export class Vault {
  openDrawing = async (drawingPath: string): Promise<Drawing> => {
    return window.fs
      .readFile(drawingPath)
      .then((content) => {
        if (!content) return new InvalidDrawing(InvalidDrawingReason.UNKNOWN_REASON, 'empty file');

        let drawing: any;

        try {
          drawing = JSON.parse(content);
        } catch (error: any) {
          return new InvalidDrawing(InvalidDrawingReason.JSON_PARSE_ERROR, error.message);
        }

        if (drawing['FORMAT_KEY'] !== import.meta.env.VITE_FORMAT_KEY)
          return new InvalidDrawing(InvalidDrawingReason.INCORRECT_FORMAT);

        return new Drawing(drawing['NAME'], drawingPath, drawing['SNAPSHOT']);
      })
      .catch((error) => {
        return new InvalidDrawing(InvalidDrawingReason.UNKNOWN_REASON, error.message);
      });
  };

  saveDrawing = async (drawing: Drawing, snapshot: object): Promise<void> => {
    if (!drawing.isValid() || !snapshot) return;

    const content = this.createContent(drawing.name, snapshot);

    window.fs.writeFile(drawing.path, content).catch(() => {
      throw new Error('error writing file');
    });
  };

  createDrawing = async (dirPath: string, name: string, snapshot: object = {}): Promise<void> => {
    const path = await window.path.join(dirPath, `${name}.json`);
    if (await window.fs.exists(path)) throw new Error('There already exists a file with this path');

    const content = this.createContent(name, snapshot);
    window.fs.writeFile(path, content).catch(() => {
      throw new Error('error writing file');
    });
  };

  private createContent = (name: string, snapshot: object) => {
    const format_key = import.meta.env.VITE_FORMAT_KEY;
    return JSON.stringify({
      NAME: name,
      FORMAT_KEY: format_key,
      SNAPSHOT: snapshot,
    });
  };
}
