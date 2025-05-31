export class Drawing {
  name: string;
  path: string;
  snapshot: Object; // json

  constructor(name: string, path: string, content: Object) {
    this.name = name;
    this.path = path;
    this.snapshot = content;
  }

  isValid(): boolean {
    return true;
  }
}

export class InvalidDrawing extends Drawing {
  readonly reason: InvalidDrawingReason;
  readonly error?: string;

  constructor(reason: InvalidDrawingReason = InvalidDrawingReason.UNKNOWN_REASON, error?: string) {
    super('', '', {});
    this.reason = reason;
    this.error = error;
  }

  isValid(): boolean {
    return false;
  }
}

export enum InvalidDrawingReason {
  UNKNOWN_REASON = 'failed to open drawing',
  JSON_PARSE_ERROR = 'parsing json yielded the following error',
  INCORRECT_FORMAT = 'drawing does not have the correct format',
}
