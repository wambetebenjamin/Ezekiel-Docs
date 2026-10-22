'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VOICE_TOUR_SCRIPT = `Welcome to Ezekiel Docs, your go-to platform for fast, affordable legal documents built for Kenyan businesses. Whether you need an NDA, a service agreement, or an employment contract, just fill in your details and download a ready-to-sign PDF in minutes. Every document is reviewed by lawyers and compliant with Kenyan law. Scroll down to pick your document and get started today.`;

const VOICE_TOUR_KEY = 'ezekiel-docs-voice-tour-completed';

export function VoiceTourButton() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const triggeredRef = useRef(false);

  // Initialize speech synthesis on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback(() => {
    if (!synthRef.current || isPlaying) return;

    const utterance = new SpeechSynthesisUtterance(VOICE_TOUR_SCRIPT);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.lang = 'en-KE';
    utterance.volume = 1;

    // Try to find a Kenyan/English voice
    const voices = synthRef.current.getVoices();
    const kenyanVoice = voices.find(v => v.lang === 'en-KE' || v.lang === 'en-GB' || v.name.includes('Kenya'));
    if (kenyanVoice) utterance.voice = kenyanVoice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
      setIsMuted(true);
      setHasPlayed(true);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsMuted(true);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsMuted(true);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      speak();
    }
  }, [isPlaying, speak, stop]);

  const handleTrigger = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (triggeredRef.current || hasPlayed) return;
    
    // Check if user has completed tour before
    const completed = localStorage.getItem(VOICE_TOUR_KEY);
    if (completed) {
      triggeredRef.current = true;
      return;
    }

    triggeredRef.current = true;
    setIsMuted(false);
    speak();
    localStorage.setItem(VOICE_TOUR_KEY, 'true');
  }, [hasPlayed, speak]);

  useEffect(() => {
    if (hasPlayed) {
      setTooltipVisible(false);
    }
  }, [hasPlayed]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      handleTrigger();
      window.removeEventListener('scroll', handleScroll);
    };
    const handleClick = () => {
      handleTrigger();
      document.removeEventListener('click', handleClick);
    };

    window.addEventListener('scroll', handleScroll, { once: true });
    document.addEventListener('click', handleClick, { once: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, [handleTrigger, hasPlayed]);

  // Load voices
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadVoices = () => {
      synthRef.current = window.speechSynthesis;
    };
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  return (
    <button
      className={`voice-tour-btn ${isPlaying ? 'speaking' : ''}`}
      onClick={toggle}
      aria-label={isMuted ? 'Site voice tour, click to play' : 'Site voice tour, click to mute'}
      aria-pressed={!isMuted}
      type="button"
    >
      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      {tooltipVisible && !hasPlayed && (
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-body-bg border border-border rounded-lg px-3 py-2 text-sm font-medium text-body-color shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">
          {hasPlayed ? 'Replay tour' : 'Hear what this site is about'}
        </span>
      )}
    </button>
  );
}