import { ApiRequest } from './interfaces';

export class CliApiRequest implements ApiRequest {
  CLI_API_URI = '/api/cli';

  path: string;
  args: string[];

  constructor(args: string[]) {
    this.path = this.CLI_API_URI
    this.args = args;
  }

  requestInit(): RequestInit {
    return {
      method: 'POST',
      body: JSON.stringify(this),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
