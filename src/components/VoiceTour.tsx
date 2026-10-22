'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TOUR_SCRIPT = `Welcome to Ezekiel Docs, your go-to platform for fast, affordable legal documents built for Kenyan businesses. Whether you need an NDA, a service agreement, or an employment contract, just fill in your details and download a ready-to-sign PDF in minutes. Every document is reviewed by lawyers and compliant with Kenyan law. Scroll down to pick your document and get started today.`;

export function VoiceTour() {
  const [playing, setPlaying] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [muted, setMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const tourEndedRef = useRef(false);

  const speak = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(TOUR_SCRIPT);
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      utterance.lang = 'en-KE';
      utterance.volume = muted ? 0 : 1;

      utterance.onend = () => {
        setPlaying(false);
        tourEndedRef.current = true;
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e.error);
        setPlaying(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setPlaying(true);
    }
  }, [muted]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const newMuted = !prev;
      if (utteranceRef.current && playing) {
        utteranceRef.current.volume = newMuted ? 0 : 1;
      }
      return newMuted;
    });
  }, [playing]);

  const handleTourStart = useCallback(() => {
    if (!triggered && !tourEndedRef.current) {
      setTriggered(true);
      speak();
    }
  }, [triggered, speak]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleTourStart();
      }
    };

    const handleClick = () => {
      handleTourStart();
    };

    document.addEventListener('scroll', handleScroll, { passive: true, once: true });
    document.addEventListener('click', handleClick, { once: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, [handleTourStart]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  if (!triggered && !tourEndedRef.current) {
    return null;
  }

  return (
    <button
      onClick={playing ? stop : speak}
      onMouseEnter={() => !playing && speak()}
      onMouseLeave={() => playing && !tourEndedRef.current && stop()}
      className={`fixed bottom-safe left-6 z-[9998] w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        playing ? 'animate-pulse ring-2 ring-primary/50' : ''
      }`}
      aria-label={tourEndedRef.current ? 'Replay site voice tour' : 'Hear what this site is about'}
      aria-pressed={playing}
      title={tourEndedRef.current ? 'Replay tour' : 'Hear what this site is about'}
    >
      {muted || (!playing && tourEndedRef.current) ? (
        <VolumeX className="w-6 h-6" aria-hidden="true" />
      ) : (
        <Volume2 className="w-6 h-6" aria-hidden="true" />
      )}
      <span className="sr-only">
        {tourEndedRef.current ? 'Replay site voice tour' : playing ? 'Mute voice tour' : 'Play voice tour'}
      </span>
    </button>
  );
}