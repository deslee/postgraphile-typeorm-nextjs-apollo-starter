declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
  interface Glboal {
      fetch: { (input: RequestInfo, init?: RequestInit | undefined): Promise<Response>; (input: RequestInfo, init?: RequestInit | undefined): Promise<Response>; };
  }
}