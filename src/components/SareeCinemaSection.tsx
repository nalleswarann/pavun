import React, { useState, useRef, useEffect } from 'react';
import { WhatsAppIcon } from './Icons';
import posterImage from '../assets/new_banner_sarees/saree_crimson_banarasi_desktop.jpg';
import './SareeCinemaSection.css';

interface SareeCinemaSectionProps {
  onOpenCustomerCare?: () => void;
  onExploreCollection?: () => void;
}

interface SareeFilm {
  id: string;
  title: string;
  subtitle: string;
  videoSrc: string;
}

const SAREE_FILMS: SareeFilm[] = [
  {
    id: 'film-1',
    title: 'THE ROYAL SAREE DRAPE',
    subtitle: 'Capturing the sublime fluidity of pure handloom silk, intricate pallu pleats, and the regal cadence of a modern Indian bride.',
    videoSrc: '/videos/saree_film_1.mp4',
  },
  {
    id: 'film-2',
    title: 'ZARI & TIMELESS MOVEMENT',
    subtitle: 'Woven with metallic silver and gold threads, celebrating centuries of sacred temple art and the ethereal luster of pure mulberry silk in motion.',
    videoSrc: '/videos/saree_film_2.mp4',
  },
];

export const SareeCinemaSection: React.FC<SareeCinemaSectionProps> = ({
  onOpenCustomerCare,
  onExploreCollection,
}) => {
  const [activeFilmIndex, setActiveFilmIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const activeFilm = SAREE_FILMS[activeFilmIndex];

  // Switch video source when active film changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeFilmIndex]);

  // When a film finishes, automatically transition to the next saree film
  const handleVideoEnded = () => {
    setActiveFilmIndex((prev) => (prev + 1) % SAREE_FILMS.length);
  };

  // Toggle play/pause on canvas click
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="pavun-cinema"
      id="saree-cinema"
      aria-label="Cinéma d'Art: Sarees in Motion"
    >
      {/* Background Video Canvas */}
      <div className="pavun-cinema__video-wrap" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="pavun-cinema__video"
          src={activeFilm.videoSrc}
          poster={posterImage}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          aria-hidden="true"
        />

        {/* Ambient Dark Gradient & Cinematic Vignette Overlays */}
        <div className="pavun-cinema__overlay-vignette" />
        <div className="pavun-cinema__overlay-gradient" />
        <div className="pavun-cinema__overlay-scanline" />
      </div>

      {/* Center Cinematic Play Overlay Button (Shows on pause) */}
      {!isPlaying && (
        <button
          type="button"
          className="pavun-cinema__center-play"
          onClick={togglePlay}
          aria-label="Play Video"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {/* Bottom Editorial Content & Controls */}
      <div className="pavun-cinema__bottom-container">
        <div className="pavun-cinema__content pavun-reveal-card">
          <h2 className="pavun-cinema__title">{activeFilm.title}</h2>
          <div className="pavun-cinema__gold-line" />
          <p className="pavun-cinema__desc">{activeFilm.subtitle}</p>

          {/* Action CTAs */}
          <div className="pavun-cinema__actions">
            <button
              type="button"
              className="pavun-cinema__btn pavun-cinema__btn--primary"
              onClick={onExploreCollection}
            >
              EXPLORE HEIRLOOM SAREES
            </button>
            <button
              type="button"
              className="pavun-cinema__btn pavun-cinema__btn--concierge"
              onClick={onOpenCustomerCare}
            >
              <WhatsAppIcon size={16} />
              <span>BOOK VIRTUAL DRAPING</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SareeCinemaSection;
