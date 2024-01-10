import { Auth, grantType, token } from "./auth/auth";

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

  constructor({
    grantType,
    clientId,
    clientSecret,
    env,
    storedToken,
    childKey,
    childSecret,
  }: {
    grantType: grantType;
    clientId: string;
    clientSecret: string;
    childKey?: string | undefined;
    childSecret?: string | undefined;
    env: "sandBox" | "production";
    storedToken?: token;
  }) {
    this.grantType = grantType;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.childSecret = clientSecret;
    this.childKey = childKey;
    this.childSecret = childSecret;
    this.env = env;
    this.token = storedToken;

    this.authorization = new Auth({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      env: this.env,
      grantType: this.grantType,
      childKey: this.childKey,
      childSecret: this.clientSecret,
    });
  }

  authenticate = async () => {
    if (
      this.token &&
      Number.parseInt(this.token.createdAt.toString()) + this.token.expires <
        Number.parseInt(Date.now().toString())
    ) {
      return this.token;
    }
    let token = await this.authorization.authenticate();
    if (!token) {
      console.error("Failed, to authenticate see previous error messages");
    }
    this.token = token;
    return this.token;
  };
}
