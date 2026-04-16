import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary';
type Size = 'sm' | 'md';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: undefined;
  external?: undefined;
  children: ReactNode;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
  children: ReactNode;
  onClick?: never;
  type?: never;
  disabled?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-2',
  md: 'text-sm px-6 py-3',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...rest
}: ButtonProps) => {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const combined = [variantClass, sizeClasses[size], className]
    .filter(Boolean)
    .join(' ');

  if ('href' in rest && rest.href !== undefined) {
    const { href, external, ...linkRest } = rest as ButtonAsLink;

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

  // At this point rest is ButtonAsButton (no href)
  const { href: _href, external: _ext, children: _c, ...buttonRest } =
    rest as unknown as ButtonAsLink & { children?: ReactNode };

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
