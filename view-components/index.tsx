import { createFragment } from "../dom/helpers";
import { flatten } from "../hoc/helpers";
import type {
  ButtonHTMLAttributes,
  Children,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "../types/index";
import { removeUnusedProps } from "./helpers";
import type { BaseViewComponent, ViewComponent } from "./types/index";

/**
 * Returns a section that is a flexible box when NixixJS is used with TailwindCSS
 */
export const HStack = (props: BaseViewComponent): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");

  return (
    <section
      {...props}
      className={`flex ${props.className ? props.className : ""}`}
    >
      {children}
    </section>
  );
};

/**
 * Returns a stack that has its children aligned vertically - column
 */
export const VStack = (props: BaseViewComponent): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");

  return (
    <section {...props} className={props.className ?? ""}>
      {children}
    </section>
  );
};

/**
 * Returns an article element
 */
export const Article = (props: BaseViewComponent): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");

  return <article {...props}>{children}</article>;
};

/**
 * Returns an aside element
 */
export const Aside = (props: BaseViewComponent): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");

  return (
    <aside {...props} className={props.className ?? ""}>
      {children}
    </aside>
  );
};

/**
 * Returns a form element
 */
export const FormField = (
  props: ViewComponent<FormHTMLAttributes<HTMLFormElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");

  return <form {...props}>{children}</form>;
};

/**
 * Returns an input element
 */
export const TextField = (
  props: ViewComponent<InputHTMLAttributes<HTMLInputElement>>
): someView => {
  removeUnusedProps<Children>(props, "children");

  return (
    <input spellcheck autocapitalize={"sentences"} type={"text"} {...props} />
  );
};

/**
 * Returns a textarea element
 */
export const TextArea = (
  props: ViewComponent<TextareaHTMLAttributes<HTMLTextAreaElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");

  return (
    <textarea spellcheck autocapitalize={"sentences"} {...props}>
      {children}
    </textarea>
  );
};

/**
 * Returns a button element
 */
export const Button = (
  props: ViewComponent<ButtonHTMLAttributes<HTMLButtonElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");

  return (
    <button style={{ cursor: "pointer" }} {...props}>
      {children}
    </button>
  );
};

/**
 * Returns a paragragh
 */
export const Paragragh = (
  props: ViewComponent<HTMLAttributes<HTMLParagraphElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");

  return <p {...props}>{children || []}</p>;
};

/**
 * Returns a div element
 */
export const Container = (
  props: ViewComponent<HTMLAttributes<HTMLDivElement>>
): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");
  return <div {...props}>{children}</div>;
};

type HeadingProps = ViewComponent<HTMLAttributes<HTMLHeadingElement>> & {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
/**
 * Returns an h1, h2, h3 heading element with prop passed else returns a h1 tag.
 */
export const Heading = (props: HeadingProps): someView => {
  const { children, type: Type } = removeUnusedProps<typeof props>(
    props,
    "children",
    "type"
  );
  switch (Type) {
    case undefined:
    case null:
      return <h1 {...props}>{children}</h1>;
    default:
      return (<Type {...props}>{children}</Type>) as any;
  }
};

/**
 * Returns a main element
 */
export const Main = (props: BaseViewComponent): someView => {
  const { children } = removeUnusedProps<Children>(props, "children");
  return <main {...props}>{children}</main>;
};

type TextNodeProps<T = string | number | boolean> = {
  children?: T[];
};
/**
 * Returns a textnode
 */
export const TextNode = (props: TextNodeProps): someView => {
  let { children } = props ? props : { children: [] };
  return children
    ? (() => {
        children = flatten(children as []);
        return createFragment(children as any);
      })()
    : [];
};

export { BaseViewComponent, ViewComponent };
