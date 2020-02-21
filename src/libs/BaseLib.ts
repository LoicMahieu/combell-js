import { Client, IClientConfig } from '../Client';

export class BaseLib {
  public client: Client;
  constructor(config: IClientConfig) {
    this.client = new Client(config);
  }
}
