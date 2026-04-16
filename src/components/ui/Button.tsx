import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
  external?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-2',
  md: 'text-sm px-6 py-3',
};

/**
 * Polymorphic Button component.
 * Renders as <button> or <Link> / <a> depending on whether `href` is provided.
 * Consumes .btn-primary / .btn-secondary from base.css.
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...rest
}) => {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const combined = [variantClass, sizeClasses[size], className]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href !== undefined) {
    const { href, external, ...linkRest } = rest;

    if (external) {
      return (
        <a
          href={href}
          className={combined}
          target="_blank"
          rel="noopener noreferrer"
          {...(linkRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  const { href: _href, external: _ext, ...buttonRest } = rest as ButtonAsLink;

  return (
    <button
      className={combined}
      {...(buttonRest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;
