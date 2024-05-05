export interface RequestGET<TParam> {
  token?: string;
  url: string;
  param?: TParam;
  cacheTag?: string[];
}

export interface RequestUPDATE<TRequest> {
  token?: string;
  url: string;
  body: TRequest;
}
