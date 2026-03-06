import { ENV } from "./env";

const DEFAULT_TIMEOUT_MS = 10_000;

type ForgeServiceName =
  | "forge"
  | "data-api"
  | "notifications"
  | "image-generation"
  | "voice-transcription"
  | "maps"
  | "storage";

export class ForgeError extends Error {
  constructor(
    message: string,
    public readonly service: ForgeServiceName,
    public readonly code: "SERVICE_UNAVAILABLE" | "FORGE_UPSTREAM_ERROR"
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ForgeUnavailableError extends ForgeError {
  constructor(
    service: ForgeServiceName,
    message = "This feature is not enabled right now."
  ) {
    super(message, service, "SERVICE_UNAVAILABLE");
  }
}

export class ForgeUpstreamError extends ForgeError {
  constructor(
    service: ForgeServiceName,
    message: string,
    public readonly status?: number,
    public readonly detail?: string
  ) {
    super(message, service, "FORGE_UPSTREAM_ERROR");
  }
}

export const FORGE_CAPABILITIES = {
  forge: ENV.forgeEnabled,
  dataApi: ENV.forgeEnabled,
  notifications: ENV.forgeEnabled,
  imageGeneration: ENV.forgeEnabled,
  voiceTranscription: ENV.forgeEnabled,
  maps: ENV.forgeEnabled,
  storage: ENV.forgeEnabled,
} as const;

const ensureForgeConfig = (service: ForgeServiceName) => {
  if (!ENV.forgeEnabled || !ENV.forgeApiUrl || !ENV.forgeApiKey) {
    throw new ForgeUnavailableError(service);
  }

  return {
    baseUrl: ENV.forgeApiUrl.endsWith("/")
      ? ENV.forgeApiUrl
      : `${ENV.forgeApiUrl}/`,
    apiKey: ENV.forgeApiKey,
  };
};

const describeError = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

const buildEndpointUrl = (baseUrl: string, path: string) =>
  new URL(path, baseUrl).toString();

export const isForgeUnavailableError = (
  error: unknown
): error is ForgeUnavailableError => error instanceof ForgeUnavailableError;

export const isForgeUpstreamError = (
  error: unknown
): error is ForgeUpstreamError => error instanceof ForgeUpstreamError;

export async function forgeFetch(
  service: ForgeServiceName,
  path: string,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const { baseUrl, apiKey } = ensureForgeConfig(service);
  const { timeoutMs = DEFAULT_TIMEOUT_MS, headers, ...requestInit } = init;

  try {
    return await fetch(buildEndpointUrl(baseUrl, path), {
      ...requestInit,
      headers: {
        authorization: `Bearer ${apiKey}`,
        ...(headers ?? {}),
      },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    throw new ForgeUpstreamError(
      service,
      `${service} request failed: ${describeError(error)}`
    );
  }
}

export async function forgeJsonRequest<T>(
  service: ForgeServiceName,
  path: string,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  const response = await forgeFetch(service, path, init);
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new ForgeUpstreamError(
      service,
      `${service} request failed: ${response.status} ${response.statusText}`,
      response.status,
      detail
    );
  }

  return (await response.json()) as T;
}

export async function getForgeHealth() {
  if (!ENV.forgeEnabled) {
    return {
      enabled: false,
      status: "disabled",
    } as const;
  }

  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    return {
      enabled: true,
      status: "down",
      error: "Forge is enabled but the URL or API key is missing.",
    } as const;
  }

  const startedAt = Date.now();

  try {
    const response = await fetch(ENV.forgeApiUrl, {
      method: "GET",
      headers: {
        authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      signal: AbortSignal.timeout(3_000),
    });

    return {
      enabled: true,
      status: "up",
      httpStatus: response.status,
      latencyMs: Date.now() - startedAt,
    } as const;
  } catch (error) {
    return {
      enabled: true,
      status: "down",
      error: describeError(error),
      latencyMs: Date.now() - startedAt,
    } as const;
  }
}
