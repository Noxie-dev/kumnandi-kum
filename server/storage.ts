// Preconfigured storage helpers for self-hosted deployments.
// Uses a storage proxy endpoint (Authorization: Bearer <token>).

import { forgeFetch, forgeJsonRequest } from "./_core/forge";

function buildUploadPath(relKey: string): string {
  const url = new URL("http://forge.local/v1/storage/upload");
  url.searchParams.set("path", normalizeKey(relKey));
  return `${url.pathname}${url.search}`;
}

function buildDownloadPath(relKey: string): string {
  const url = new URL("http://forge.local/v1/storage/downloadUrl");
  url.searchParams.set("path", normalizeKey(relKey));
  return `${url.pathname}${url.search}`;
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

function toFormData(
  data: Buffer | Uint8Array | string,
  contentType: string,
  fileName: string
): FormData {
  const blob =
    typeof data === "string"
      ? new Blob([data], { type: contentType })
      : new Blob([data as any], { type: contentType });
  const form = new FormData();
  form.append("file", blob, fileName || "file");
  return form;
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  const formData = toFormData(data, contentType, key.split("/").pop() ?? key);
  const response = await forgeFetch("storage", buildUploadPath(key), {
    method: "POST",
    body: formData,
    timeoutMs: 20_000,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(
      `Storage upload failed (${response.status} ${response.statusText}): ${message}`
    );
  }

  const { url } = (await response.json()) as { url: string };
  return { key, url };
}

export async function storageGet(
  relKey: string
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  const { url } = await forgeJsonRequest<{ url: string }>(
    "storage",
    buildDownloadPath(key),
    {
      method: "GET",
      timeoutMs: 10_000,
    }
  );

  return {
    key,
    url,
  };
}
