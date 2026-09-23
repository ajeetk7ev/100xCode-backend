class EmailError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);

    this.name = "EmailError";

    Error.captureStackTrace(this, this.constructor);
  }
}

export default EmailError;