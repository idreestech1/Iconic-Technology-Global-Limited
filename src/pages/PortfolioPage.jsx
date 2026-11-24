import { useEffect } from 'react';

const BEHANCE_URL = 'https://www.behance.net/iconictechglbltd';

export default function PortfolioPage() {
  if (typeof window !== 'undefined') {
    window.location.replace(BEHANCE_URL);
  }

  useEffect(() => {
    window.location.replace(BEHANCE_URL);
  }, []);

  return null;
}
