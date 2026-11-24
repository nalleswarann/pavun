import React from 'react';
import pavunLogoBrand from '../assets/pavun_logo_cropped.png';
import pavunLogoWhite from '../assets/pavun_logo_white.png';
import './Logo.css';

interface LogoProps {
  variant?: 'header' | 'compact' | 'footer' | 'drawer';
  color?: 'brand' | 'gold' | 'white';
  className?: string;
  onClick?: () => void;
}

/**
 * PAVUN Official Brand Logo
 * Displays the authentic emblem star & Pavun wordmark in regal forest green (#093c2e)
 * with the signature "un style'ku no rules" tagline.
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  color = 'brand',
  className = '',
  onClick,
}) => {
  // Use forest green brand logo as primary; white/luminous logo available for dark contrast modes like footer
  const logoSrc = color === 'white' || variant === 'footer' ? pavunLogoWhite : pavunLogoBrand;

  return (
    <a
      href="#home"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`pavun-logo pavun-logo--${variant} ${className}`}
      aria-label="Pavun - Haute Couture"
    >
      <img
        src={logoSrc}
        alt="Pavun - Haute Couture"
        className="pavun-logo__img"
        loading="eager"
      />
    </a>
  );
};

export default Logo;
