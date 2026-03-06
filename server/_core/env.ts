type AuthMode = "oauth" | "local" | "none";
type AuthLocalRole = "admin" | "user";

const readEnv = (...keys: string[]): string => {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return "";
};

const readAuthMode = (): AuthMode => {
  const raw = (process.env.AUTH_MODE ?? "").trim().toLowerCase();
  if (raw === "oauth" || raw === "local" || raw === "none") {
    return raw;
  }

  // Auto-detect OAuth mode when auth server and client ID are configured.
  const hasAuthConfig =
    readEnv("AUTH_SERVER_URL", "OAUTH_SERVER_URL").length > 0 &&
    readEnv("AUTH_CLIENT_ID", "VITE_AUTH_CLIENT_ID", "VITE_APP_ID").length > 0;

  return hasAuthConfig ? "oauth" : "none";
};

const readLocalRole = (): AuthLocalRole => {
  const raw = (process.env.AUTH_LOCAL_USER_ROLE ?? "").trim().toLowerCase();
  return raw === "admin" ? "admin" : "user";
};

const authClientId = readEnv("AUTH_CLIENT_ID", "VITE_AUTH_CLIENT_ID", "VITE_APP_ID");
const authServerUrl = readEnv("AUTH_SERVER_URL", "OAUTH_SERVER_URL");
const authAdminUserId = readEnv("AUTH_ADMIN_USER_ID", "OWNER_OPEN_ID");
const platformApiUrl = readEnv("PLATFORM_API_URL", "BUILT_IN_FORGE_API_URL");
const platformApiKey = readEnv(
  "PLATFORM_API_KEY",
  "BUILT_IN_FORGE_API_KEY",
  "OPENAI_API_KEY"
);
const llmApiUrl = readEnv("LLM_API_URL");
const llmApiKey = readEnv("LLM_API_KEY", "OPENAI_API_KEY", "PLATFORM_API_KEY");
const llmModel = readEnv("LLM_MODEL");

export const ENV = {
  authMode: readAuthMode(),
  authClientId,
  authServerUrl,
  authAdminUserId,
  authExchangePath: process.env.AUTH_EXCHANGE_PATH ?? "/webdev.v1.WebDevAuthPublicService/ExchangeToken",
  authUserInfoPath: process.env.AUTH_USER_INFO_PATH ?? "/webdev.v1.WebDevAuthPublicService/GetUserInfo",
  authUserInfoWithJwtPath:
    process.env.AUTH_USER_INFO_WITH_JWT_PATH ??
    "/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt",
  localAuthUserId: process.env.AUTH_LOCAL_USER_ID ?? "local-admin",
  localAuthUserName: process.env.AUTH_LOCAL_USER_NAME ?? "Local Admin",
  localAuthUserEmail: process.env.AUTH_LOCAL_USER_EMAIL ?? "",
  localAuthUserRole: readLocalRole(),
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  platformApiUrl,
  platformApiKey,
  llmApiUrl,
  llmApiKey,
  llmModel,

  // Backward-compatible aliases for legacy variable names used across the codebase.
  appId: authClientId,
  oAuthServerUrl: authServerUrl,
  ownerOpenId: authAdminUserId,
  forgeApiUrl: platformApiUrl,
  forgeApiKey: platformApiKey,
};
