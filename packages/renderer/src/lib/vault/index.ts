import { Drawing, InvalidDrawing, InvalidDrawingReason } from './types';

export class Vault {
  drawing: Drawing | null;
  subscribers: ((drawing: Drawing | null) => void)[] = [];

  constructor() {
    this.drawing = null;
  }

  subscribe = (callback: (drawing: Drawing | null) => void) => {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  };

  private notify = () => {
    this.subscribers.forEach((callback) => callback(this.drawing));
  };

  private setDrawing = (drawing: Drawing | null) => {
    this.drawing = drawing;
    this.notify();
  };

  openDrawing = async (drawingPath: string): Promise<void> => {
    window.fs
      .readFile(drawingPath)
      .then((content) => {
        if (!content)
          return this.setDrawing(
            new InvalidDrawing(InvalidDrawingReason.UNKNOWN_REASON, 'empty file')
          );

        let drawing: any;

        try {
          drawing = JSON.parse(content);
        } catch (error: any) {
          return this.setDrawing(
            new InvalidDrawing(InvalidDrawingReason.JSON_PARSE_ERROR, error.message)
          );
        }

        if (drawing['SIGNATURE_KEY'] !== import.meta.env.VITE_VAULT_SIGNATURE)
          return this.setDrawing(new InvalidDrawing(InvalidDrawingReason.INCORRECT_SIGNATURE));

        return this.setDrawing(new Drawing(drawing['NAME'], drawingPath, drawing['SNAPSHOT']));
      })
      .catch((error) => {
        this.setDrawing(new InvalidDrawing(InvalidDrawingReason.UNKNOWN_REASON, error.message));
      });
  };

  saveDrawing = async (drawing: Drawing, snapshot: object): Promise<void> => {
    if (!drawing.isValid()) return;

    const signature = import.meta.env.VITE_VAULT_SIGNATURE;
    const content = JSON.stringify({
      NAME: drawing.name,
      SIGNATURE_KEY: signature,
      SNAPSHOT: snapshot,
    });

    window.fs.writeFile(drawing.path, content).catch(() => {
      throw new Error('error writing file');
    });
  };
}
