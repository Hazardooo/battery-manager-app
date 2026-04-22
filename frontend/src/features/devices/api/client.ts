import { ApiError } from "@/features/devices/types/apiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));

    throw new ApiError(
      res.status,
      errorBody.error || "UNKNOWN",
      errorBody.message || res.statusText,
    );
  }
  return res.json();
}
