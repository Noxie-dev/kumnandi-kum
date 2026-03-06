export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

const withTrailingSlash = (value: string) =>
  value.endsWith("/") ? value : `${value}/`;

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = (): string | null => {
  const oauthPortalUrl =
    import.meta.env.VITE_AUTH_PORTAL_URL ||
    import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId =
    import.meta.env.VITE_AUTH_CLIENT_ID || import.meta.env.VITE_APP_ID;
  const authorizeUrl = import.meta.env.VITE_AUTH_AUTHORIZE_URL;

  if (!oauthPortalUrl || !appId) {
    return null;
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = authorizeUrl
    ? new URL(authorizeUrl)
    : new URL("app-auth", withTrailingSlash(oauthPortalUrl));
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
