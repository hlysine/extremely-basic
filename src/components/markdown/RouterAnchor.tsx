import { Link, useRouterState } from '@tanstack/react-router';

export interface RouterAnchorProps {
  href?: string;
}

function isSameOrigin(href: string | undefined): href is string {
  if (!href) return false;
  const url = new URL(href, window.location.origin);
  return url.origin === window.location.origin;
}

function getRelativePath(href: string, base: string): string {
  const url = new URL(href, new URL(base, window.location.origin));
  return url.pathname + url.search + url.hash;
}

export default function RouterAnchor({ href, ...rest }: RouterAnchorProps) {
  const location = useRouterState({ select: state => state.location });
  if (isSameOrigin(href)) {
    return <Link to={getRelativePath(href, location.href)} {...rest} />;
  }

  return <a href={href} {...rest} />;
}
