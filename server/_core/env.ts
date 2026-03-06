import { z } from "zod";

type AuthMode = "oauth" | "local" | "none";
type AuthLocalRole = "admin" | "user";

const urlSchema = z.string().url();
const authModeSchema = z.enum(["oauth", "local", "none"]);
const authLocalRoleSchema = z.enum(["admin", "user"]);

const readEnv = (...keys: string[]): string => {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return "";
};

const readBooleanEnv = (key: string, defaultValue = false): boolean => {
  const raw = (process.env[key] ?? "").trim().toLowerCase();
  if (!raw) {
    return defaultValue;
  }

  if (["1", "true", "yes", "on"].includes(raw)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(raw)) {
    return false;
  }

  throw new Error(
    `${key} must be a boolean-like value (true/false, 1/0, yes/no, on/off).`
  );
};

const parseOptionalUrl = (value: string, key: string): string => {
  if (!value) {
    return "";
  }

  try {
    return urlSchema.parse(value);
  } catch {
    throw new Error(`${key} must be a valid URL.`);
  }
};

const readAuthMode = (): AuthMode => {
  const explicitMode = (process.env.AUTH_MODE ?? "").trim().toLowerCase();
  if (explicitMode) {
    try {
      return authModeSchema.parse(explicitMode);
    } catch {
      throw new Error("AUTH_MODE must be one of: oauth, local, none.");
    }
  }

  const hasAuthConfig =
    readEnv("AUTH_SERVER_URL", "OAUTH_SERVER_URL").length > 0 &&
    readEnv("AUTH_CLIENT_ID", "VITE_AUTH_CLIENT_ID", "VITE_APP_ID").length > 0;

  return hasAuthConfig ? "oauth" : "none";
};

const readLocalRole = (): AuthLocalRole => {
  const raw = (process.env.AUTH_LOCAL_USER_ROLE ?? "").trim().toLowerCase();
  if (!raw) {
    return "user";
  }

  try {
    return authLocalRoleSchema.parse(raw);
  } catch {
    throw new Error("AUTH_LOCAL_USER_ROLE must be one of: admin, user.");
  }
};

const authClientId = readEnv(
  "AUTH_CLIENT_ID",
  "VITE_AUTH_CLIENT_ID",
  "VITE_APP_ID"
);
const authServerUrl = parseOptionalUrl(
  readEnv("AUTH_SERVER_URL", "OAUTH_SERVER_URL"),
  "AUTH_SERVER_URL"
);
const authAdminUserId = readEnv("AUTH_ADMIN_USER_ID", "OWNER_OPEN_ID");

const forgeEnabled = readBooleanEnv("FORGE_ENABLED", false);
const forgeApiUrl = parseOptionalUrl(
  readEnv("FORGE_API_URL", "PLATFORM_API_URL", "BUILT_IN_FORGE_API_URL"),
  "FORGE_API_URL"
);
const forgeApiKey = readEnv(
  "FORGE_API_KEY",
  "PLATFORM_API_KEY",
  "BUILT_IN_FORGE_API_KEY"
);

if (forgeEnabled && (!forgeApiUrl || !forgeApiKey)) {
  throw new Error(
    "FORGE_ENABLED=true requires FORGE_API_URL and FORGE_API_KEY (legacy PLATFORM_API_URL / BUILT_IN_FORGE_API_URL also work as fallbacks)."
  );
}

const llmApiUrl = parseOptionalUrl(readEnv("LLM_API_URL"), "LLM_API_URL");
const llmApiKey = readEnv(
  "LLM_API_KEY",
  "OPENAI_API_KEY",
  "FORGE_API_KEY",
  "PLATFORM_API_KEY",
  "BUILT_IN_FORGE_API_KEY"
);
const llmModel = readEnv("LLM_MODEL");

export const ENV = {
  authMode: readAuthMode(),
  authClientId,
  authServerUrl,
  authAdminUserId,
  authExchangePath:
    process.env.AUTH_EXCHANGE_PATH ??
    "/webdev.v1.WebDevAuthPublicService/ExchangeToken",
  authUserInfoPath:
    process.env.AUTH_USER_INFO_PATH ??
    "/webdev.v1.WebDevAuthPublicService/GetUserInfo",
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
  forgeEnabled,
  platformApiUrl: forgeApiUrl,
  platformApiKey: forgeApiKey,
  llmApiUrl,
  llmApiKey,
  llmModel,

  // Backward-compatible aliases for legacy variable names used across the codebase.
  appId: authClientId,
  oAuthServerUrl: authServerUrl,
  ownerOpenId: authAdminUserId,
  forgeApiUrl,
  forgeApiKey,
};
