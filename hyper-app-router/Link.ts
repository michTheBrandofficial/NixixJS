import Nixix from '../dom';
import { type AnchorHTMLAttributes } from '../types/index';

const { create } = Nixix;

function getOrigin(loc: Location | HTMLAnchorElement) {
  return loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '');
}

function isExternal(anchorElement: HTMLAnchorElement) {
  // Location.origin and HTMLAnchorElement.origin are not
  // supported by IE and Safari.
  return getOrigin(location) !== getOrigin(anchorElement);
}

type PathtoRoute = `/${string}`;

type LinkProps = {
  to: PathtoRoute;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = (props: LinkProps) => {
  const { to, children, ...rest } = props;
  const onClick = rest?.['on:click'];
  props['on:click'] = function (e) {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.altKey ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      props?.target === '_blank' ||
      isExternal(e.currentTarget)
    ) {
    } else {
      e.preventDefault();

      if (to !== location.pathname) {
        history.pushState(location.pathname, '', to);
      }
    }
  };

  return create('a', { ...rest, href: to || '/' }, children as any);
};
