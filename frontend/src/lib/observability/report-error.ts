export function reportClientError(error: unknown, context: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[frontend-error] ${context}`, error);
    return;
  }

  // Placeholder for future integration (Sentry, Datadog, OpenTelemetry, etc.)
  console.error(`[frontend-error] ${context}`, error);
}
