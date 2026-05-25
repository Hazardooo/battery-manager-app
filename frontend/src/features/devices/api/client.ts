import { ApiError } from "@/features/devices/types/apiError";

const API_URL =
  typeof window === "undefined"
    ? process.env.API_URL || "http://backend:8000"
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost/api";

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
