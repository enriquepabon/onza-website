// Eventos hacia Google Analytics 4. gtag existe solo si NEXT_PUBLIC_GA_ID
// está configurado y el script ya cargó; en cualquier otro caso es un no-op.
export function trackEvent(
  name: string,
  params?: Record<string, string | number>
) {
  if (typeof window === "undefined") return;
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}
