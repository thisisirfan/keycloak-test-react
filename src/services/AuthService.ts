import { Log, User, UserManager } from 'oidc-client';

import { Constants } from '../helpers/Constants';
import { settings } from 'cluster';

export class AuthService {
  public userManager: UserManager;

  constructor() {
    console.log(process.env);
    const redirectUri = process.env.NODE_ENV === 'production' ? window.location.href : Constants.devRedirectUri;
    const settings = {
      authority: process.env.REACT_APP_STS_AUTHORITY,
      client_id: process.env.REACT_APP_CLIENT_ID,
      // client_secret:process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: `${redirectUri}signin-callback.html`,
      silent_redirect_uri: `${redirectUri}silent-renew.html`,
      // tslint:disable-next-line:object-literal-sort-keys
      post_logout_redirect_uri: `${redirectUri}`,
      response_type: 'code',
      scope: process.env.REACT_APP_CLIENT_SCOPE
    };
    this.userManager = new UserManager(settings);

    Log.logger = console;
    Log.level = Log.INFO;
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public async logout(): Promise<void> {
    const user = await this.userManager.getUser();
    return this.userManager.signoutRedirect({
      id_token_hint: user?.id_token,
      post_logout_redirect_uri: window.location.origin,
    });
  }
}
