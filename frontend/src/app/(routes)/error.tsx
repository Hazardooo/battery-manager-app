"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const isApiError = error.name === "ApiError";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg p-5 transition-colors flex flex-col items-center max-w-xl w-full">
        <h1 className="text-danger font-medium text-lg">ERROR</h1>
        <p className="text-danger font-medium text-lg text-center">
          {isApiError ? error.message : "Неизвестная ошибка"}
        </p>
        <button
          className="text-primary font-medium text-lg mt-4 cursor-pointer"
          onClick={reset}
        >
          Повторить
        </button>
      </div>
    </div>
  );
}
