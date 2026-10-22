'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_HREF } from '@/lib/constants';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {showTooltip && (
        <div className="fixed bottom-20 right-20 z-9997 animate-fade-in">
          <div className="bg-body-bg border border-border rounded-lg px-3 py-2 text-sm font-medium text-body-color shadow-lg whitespace-nowrap flex items-center gap-2">
            <span>Chat with us on WhatsApp</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-body-tertiary hover:text-body-emphasis p-1"
              aria-label="Dismiss tooltip"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}