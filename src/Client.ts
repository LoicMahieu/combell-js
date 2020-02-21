import got from "got";
import crypto from "crypto";
import { createNonce } from "./utils";

const nonce = createNonce(10);
const firstSlashRE = /^\//;

export interface IClientConfig {
  endpoint: string;
  key: string;
  secret: string;
}

export class Client {
  private config: IClientConfig;

  constructor(config: IClientConfig) {
    this.config = config;
  }

  public get<T>(uri: string) {
    return got.get<T>(uri.replace(firstSlashRE, ""), {
      prefixUrl: this.config.endpoint,
      responseType: "json",
      headers: {
        Authorization: this.getAuthorization(
          this.config.key,
          this.config.secret,
          "get",
          uri,
          nonce()
        )
      }
    });
  }

  public post(uri: string, body: any) {
    const json = JSON.stringify(body);
    return got.post(uri.replace(firstSlashRE, ""), {
      body: json,
      prefixUrl: this.config.endpoint,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthorization(
          this.config.key,
          this.config.secret,
          "post",
          uri,
          nonce(),
          json
        )
      }
    });
  }

  public put(uri: string, body: any) {
    const json = JSON.stringify(body);
    return got.put(uri.replace(firstSlashRE, ""), {
      body: json,
      prefixUrl: this.config.endpoint,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthorization(
          this.config.key,
          this.config.secret,
          "put",
          uri,
          nonce(),
          json
        )
      }
    });
  }

  public del(uri: string) {
    return got.delete(uri.replace(firstSlashRE, ""), {
      prefixUrl: this.config.endpoint,
      responseType: "json",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthorization(
          this.config.key,
          this.config.secret,
          "del",
          uri,
          nonce()
        )
      }
    });
  }

  private getAuthorization(
    key: string,
    secret: string,
    method: string,
    uri: string,
    nonce: string,
    body?: string
  ): string {
    const time = Math.floor(new Date().getTime() / 1000);
    const signContent = [
      key,
      method.toLowerCase(),
      encodeURIComponent(uri),
      time,
      nonce,
      body
        ? crypto
            .createHash("md5")
            .update(body)
            .digest("base64")
        : ""
    ].join("");
    const signature = crypto
      .createHmac("sha256", secret)
      .update(signContent)
      .digest("base64");

    return `hmac ${key}:${signature}:${nonce}:${time}`;
  }
}
