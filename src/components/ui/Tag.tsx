import Link from 'next/link';

interface TagProps {
  /** Tag display text (without the # prefix) */
  name: string;
  /** If provided, renders as a link to /tags/[slug] */
  slug?: string;
  /** Extra className for overrides */
  className?: string;
  /** Whether to show the # prefix (default: true) */
  prefix?: boolean;
}

/**
 * Tag pill component.
 * Consumes the `.tag` utility class from base.css.
 * Renders as <a> when slug is provided, <span> otherwise.
 */
const Tag: React.FC<TagProps> = ({
  name,
  slug,
  className = '',
  prefix = true,
}) => {
  const text = prefix ? `#${name}` : name;
  const combined = `tag${className ? ` ${className}` : ''}`;

  if (slug) {
    return (
      <Link
        href={`/tags/${encodeURIComponent(slug)}`}
        className={combined}
      >
        {text}
      </Link>
    );
  }

  return <span className={combined}>{text}</span>;
};

export default Tag;
