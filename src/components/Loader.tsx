'use client';

import { useEffect, useState } from 'react';

export function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="loader-wrapper" role="status" aria-label="Loading Ezekiel Docs">
      <div className="spinner-border text-primary p-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}