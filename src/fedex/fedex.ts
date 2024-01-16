import { debug } from "console";
import { Auth, grantType, token } from "./auth/auth";
import { Rates } from "./rates/rates";

export type TaskFunction<T = any> = (x: any) => Promise<T>;

export class Fedex {
  private authorization: Auth;
  public static addrValidation: any;
  public static locationSearch: any;
  public static freight: any;
  public static global: any;
  public static eod: any;
  public static ship: any;
  public static pickup: any;
  public static postal: any;
  public static rates: any;
  public static availability: any;
  private grantType: grantType;
  private clientId: string;
  private clientSecret: string;
  //This element should be used by Compatible and Proprietary Parent Child customers
  private childKey: string | undefined;
  //This element should be used by Compatible and Proprietary Parent Child customers.
  private childSecret: string | undefined;
  private env: "sandBox" | "production";
  private token: token | undefined;
  public asyncQueue: TaskFunction[];
  private errorLog;
  private debug;

  constructor({
    grantType,
    clientId,
    clientSecret,
    env,
    storedToken,
    childKey,
    childSecret,
    errorLog,
    debug,
  }: {
    grantType: grantType;
    clientId: string;
    clientSecret: string;
    childKey?: string | undefined;
    childSecret?: string | undefined;
    env: "sandBox" | "production";
    storedToken?: token;
    errorLog?: () => void;
    debug?: boolean;
  }) {
    this.grantType = grantType;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.childSecret = clientSecret;
    this.childKey = childKey;
    this.childSecret = childSecret;
    this.env = env;
    this.token = storedToken;
    this.asyncQueue = [];
    this.errorLog = errorLog;
    this.debug = debug;

    this.authorization = new Auth({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      env: this.env,
      grantType: this.grantType,
      childKey: this.childKey,
      childSecret: this.clientSecret,
    });
  }

  addTaskToQueue = (task: TaskFunction) => {
    this.asyncQueue.push(task);
  };

  run = async () => {
    let previousResult: any = null;
    let getLastTaskResult = () => previousResult;
    let steps: number = 0;
    for await (const task of this.asyncQueue) {
      try {
        const result = await task(previousResult);
        if (this.debug) {
          console.log("Number of steps:", steps);
          console.log(result);
        }
        previousResult = result;
      } catch (error) {
        console.error("Error executing task:", error);
        return;
      }
    }
    this.asyncQueue = [];
    return previousResult;
  };

  consume = async () => {
    await this.run();
    return this;
  };

  authenticate = async () => {
    if (
      this.token &&
      Number.parseInt(this.token.createdAt.toString()) + this.token.expires <
        Number.parseInt(Date.now().toString())
    ) {
      return Promise.resolve();
    }
    let token: token | undefined;
    try {
      token = await this.authorization.authenticate();
      this.token = token;
      return token;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  rates = () => {
    if(!this.token) {
      console.error("failed to load token");
      return;
    }
    return new Rates({
      env: this.env,
      token: this.token,
      debug: this.debug,
    });
  };
}
