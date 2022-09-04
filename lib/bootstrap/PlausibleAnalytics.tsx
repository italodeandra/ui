import Script from "next/script";

export default function PlausibleAnalytics({domain}: {domain: string}) {
  return <>
    {process.env.APP_ENV === "production" && (
      <Script
        defer
        data-domain={domain}
        src={"https://plausible.majapi.com/js/plausible.js"}
      />
    )}
  </>
}