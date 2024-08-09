type Status = 'SUCCESS' | 'ERROR';

export interface ResponseBody<TResponse> {
  status: Status;
  message?: string;
  data?: TResponse;
}

export class ErrorResponse {
  response: Response;

  constructor({ response }: { response: Response }) {
    this.response = response;
  }
}

export class APIError extends Error {
  status: string;

  constructor({ status, message }: { status: string; message: string }) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
