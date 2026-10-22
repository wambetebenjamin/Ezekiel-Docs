'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = 'https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20need%20help%20with%20a%20legal%20document';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-safe right-6 z-[9998] w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ${visible ? 'opacity-100 translate-y-0 animate-pulse' : 'opacity-0 translate-y-4'}`}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
      <span className="sr-only">Chat with us on WhatsApp</span>
    </a>
  );
}