import { useEffect, useState, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

const parseTime = (timeStr: string) => {
  const [h, m, s] = timeStr.replace(',', '.').split(':');
  const [sec, ms] = s.split('.');
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + (parseInt(ms) || 0) / 1000;
};

const parseCaptions = (text: string) => {
  const entries: { start: number; end: number; text: string }[] = [];

  const blocks = text.split(/\n{2,}/);
  blocks.forEach((block) => {
    const lines = block.trim().split('\n');
    if (lines.length >= 2) {
      const timeMatch = lines[0].includes('-->') ? lines[0] : lines[1];
      const textLines = lines.slice(timeMatch === lines[0] ? 1 : 2);
      const [startStr, endStr] = timeMatch.split('-->').map((s) => s.trim());
      if (startStr && endStr) {
        entries.push({
          start: parseTime(startStr),
          end: parseTime(endStr),
          text: textLines.join(' '),
        });
      }
    }
  });

  return entries;
};

export const Caption = () => {
  const { currentTrack, audioRef } = useAudio();
  const [captions, setCaptions] = useState<{ start: number; end: number; text: string }[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLineRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!currentTrack?.scripts) return;

    const loadCaptions = async () => {
      try {
        const res = await fetch(currentTrack.scripts);
        const text = await res.text();
        const parsed = parseCaptions(text);
        setCaptions(parsed);
      } catch (err) {
        console.error('Caption fetch error:', err);
        setCaptions([]);
      }
    };

    loadCaptions();
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current || !captions.length) return;

    const interval = setInterval(() => {
      const time = audioRef.current.currentTime;
      const index = captions.findIndex((cap) => time >= cap.start && time <= cap.end);
      setActiveIndex(index);
    }, 300);

    return () => clearInterval(interval);
  }, [captions, audioRef]);

  // Scroll the current line into view when it changes
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeIndex]);

  return (
    <div className="w-full px-4 py-2 text-2xl text-gray-200 max-h-48 overflow-y-auto bg-[#1f1f1f] rounded leading-relaxed">
      {captions.length === 0 ? (
        <p className="italic text-gray-400">No captions available.</p>
      ) : (
        captions.map((cap, idx) => (
          <p
            key={idx}
            ref={idx === activeIndex ? activeLineRef : null}
            className={`transition-all duration-200 ${
              idx === activeIndex ? 'text-white font-semibold' : 'text-gray-400'
            }`}
          >
            {cap.text}
          </p>
        ))
      )}
    </div>
  );
};