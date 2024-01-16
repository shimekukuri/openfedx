export class Auth {
  private readonly openapi: string = "3.0.0";
  private readonly info = {
    title: "API Authorization",
    version: "1.0",
  };
  private servers = {
    sandBox: "https://apis-sandbox.fedex.com",
    production: "https://apis.fedex.com",
  };
  private paths = {
    token: "/oauth/token",
  };
  private grantType: grantType;
  private clientId: string;
  private clientSecret: string;
  //This element should be used by Compatible and Proprietary Parent Child customers
  private childKey: string | undefined;
  //This element should be used by Compatible and Proprietary Parent Child customers.
  private childSecret: string | undefined;
  private env: "sandBox" | "production";

  constructor({
    clientId,
    clientSecret,
    grantType,
    childKey,
    childSecret,
    env,
  }: {
    clientId: string;
    clientSecret: string;
    grantType: grantType;
    childKey: string | undefined;
    childSecret: string | undefined;
    env: "sandBox" | "production";
  }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.grantType = grantType;
    this.childKey = childKey;
    this.childSecret = childSecret;
    this.env = env;
  }

  public authenticate = async () => {
    this.checkGrantType();
    let mutForm = this.selectForm();
    try {
      let resp = await this.sendForm(mutForm);
      let data = (await resp.json()) as successfulResponse;
      let token: token = {
        createdAt: Date.now(),
        accessToken: data.access_token,
        scope: data.scope,
        expires: data.expires_in,
        tokenType: data.token_type,
      }
      

      return token;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  private sendForm = async (fetchOptions: clientForm | cpspsForm) => {
    const formData = new URLSearchParams();

    for (const [key, value] of Object.entries(fetchOptions.body)) {
      formData.append(key, value);
    }

    let resp = await fetch(`${this.servers[this.env]}${this.paths.token}`, {
      method: fetchOptions.method,
      credentials: fetchOptions.credentials,
      body: formData.toString(),
      headers: fetchOptions.headers,
    });
    return resp;
  };

  private selectForm = (): clientForm | cpspsForm => {
    switch (this.grantType) {
      case "client_credentials": {
        return this.generateClientForm();
      }
      case "csp_credentials": {
        return this.generateCpspsForm();
      }
      case "client_pc_credentials": {
        return this.generateCpspsForm();
      }
    }
  };

  private generateClientForm = (): clientForm => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: this.grantType,
      },
    };
  };

  private generateCpspsForm = (): cpspsForm => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: this.grantType,
        child_key: this.childKey!,
        child_secret: this.childSecret!,
      },
    };
  };

  private checkGrantType = () => {
    switch (this.grantType) {
      case "client_credentials": {
        break;
      }
      case "csp_credentials": {
        if (!this.childKey || !this.childSecret) {
          throw new Error("Missing either childKey or childSecret");
        }
        break;
      }
      case "client_pc_credentials": {
        if (!this.childKey || !this.childSecret) {
          throw new Error("Missing either childKey or childSecret");
        }
        break;
      }
    }
  };
}

type responseToken = {
  token: {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    createdAt: Date;
  }
}

export type grantType =
  | "client_credentials"
  | "csp_credentials"
  | "client_pc_credentials";

type cpspsForm = {
  method: "POST";
  credentials: "include";
  headers: {
    "Content-Type": "application/x-www-form-urlencoded";
  };
  body: {
    grant_type: grantType;
    client_id: string;
    client_secret: string;
    child_key: string;
    child_secret: string;
  };
};

type clientForm = {
  method: "POST";
  credentials: "include";
  headers: {
    "Content-Type": "application/x-www-form-urlencoded";
  };
  body: {
    grant_type: grantType;
    client_id: string;
    client_secret: string;
  };
};

type successfulResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

export type token = {
  accessToken: string;
  tokenType: string;
  expires: number;
  scope: string;
  createdAt: number;
};
