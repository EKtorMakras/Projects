import { config } from "@/common/config";

// ================== Fetch ================== //
export function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

export async function getJSON(url) {
  try {
    const response = await Promise.race([fetch(url), timeout(config.TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data?.message} (${response?.status})`);
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
