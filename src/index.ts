import got from "got";
import crypto from "crypto";
import { createNonce } from "./utils";

const nonce = createNonce(10);

interface ICombellOptions {
  endpoint: string;
  key: string;
  secret: string;
}

export class Combell {
  private options: ICombellOptions;
  constructor(options: ICombellOptions) {
    this.options = options;
  }

  public get(uri: string) {
    const n = nonce();
    return got.get(this.options.endpoint + uri, {
      responseType: "json",
      headers: {
        Authorization: this.getAuthorization("get", uri, n)
      }
    });
  }

  private getAuthorization(method: string, uri: string, nonce: string): string {
    const time = Math.floor(new Date().getTime() / 1000);
    const signContent = [
      this.options.key,
      method.toLowerCase(),
      encodeURIComponent(uri),
      time,
      nonce
      // body
    ].join("");
    const signature = crypto
      .createHmac("sha256", this.options.secret)
      .update(signContent)
      .digest("base64");

    return `hmac ${this.options.key}:${signature}:${nonce}:${time}`;
  }
}
