/**
 * Quick example (matches curl usage):
 *   await callDataApi("Youtube/search", {
 *     query: { gl: "US", hl: "en", q: "team building" },
 *   })
 */
import { forgeJsonRequest } from "./forge";

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  apiId: string,
  options: DataApiCallOptions = {}
): Promise<unknown> {
  const payload = await forgeJsonRequest<Record<string, unknown>>(
    "data-api",
    "webdevtoken.v1.WebDevService/CallApi",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        apiId,
        query: options.query,
        body: options.body,
        path_params: options.pathParams,
        multipart_form_data: options.formData,
      }),
    }
  );

  if (payload && typeof payload === "object" && "jsonData" in payload) {
    try {
      return JSON.parse((payload as Record<string, string>).jsonData ?? "{}");
    } catch {
      return (payload as Record<string, unknown>).jsonData;
    }
  }
  return payload;
}
