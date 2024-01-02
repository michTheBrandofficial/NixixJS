import Nixix from "../dom";
import { AnchorHTMLAttributes } from "../types";
import { type MouseEvent } from "../types/eventhandlers";
import { navigate } from "./Router";

const { create } = Nixix;

type LinkProps = {
  children: JSX.Element;
  to: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;
export function Link(props: LinkProps) {
  const { children, to, ...rest } = props;
  function changeLocation(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    rest?.["on:click"]?.(event);
    navigate(to as any);
  }
  return create(
    "a",
    { ...rest, href: to || "/", "on:click": changeLocation },
    children
  );
}
