'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';

export default function GA4Tracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (measurementId) {
      ReactGA.initialize(measurementId);
    }
  }, [measurementId]);

  useEffect(() => {
    if (measurementId && pathname) {
      const url = pathname + searchParams.toString();
      ReactGA.send({ hitType: "pageview", page: url });
    }
  }, [pathname, searchParams, measurementId]);

  return null;
}

/**
 * Custom Event Tracking Utility
 */
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
