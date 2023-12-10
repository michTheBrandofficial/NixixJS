import { ButtonHTMLAttributes, FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, ValueType } from '../types/index';
import { BaseViewComponent, ViewComponent } from './types/index';
/**
 * Returns a section that is a flexible box when NixixJS is used with TailwindCSS
 */
export declare const HStack: (props: BaseViewComponent) => someView;
/**
 * Returns a stack that has its children aligned vertically - column
 */
export declare const VStack: (props: BaseViewComponent) => someView;
/**
 * Returns an article element
 */
export declare const Article: (props: BaseViewComponent) => someView;
/**
 * Returns an aside element
 */
export declare const Aside: (props: BaseViewComponent) => someView;
/**
 * Returns a form element
 */
export declare const FormField: (props: ViewComponent<FormHTMLAttributes<HTMLFormElement>>) => someView;
/**
 * Returns an input element
 */
export declare const TextField: (props: ViewComponent<InputHTMLAttributes<HTMLInputElement>>) => someView;
/**
 * Returns a textarea element
 */
export declare const TextArea: (props: ViewComponent<TextareaHTMLAttributes<HTMLTextAreaElement>>) => someView;
/**
 * Returns a button element
 */
export declare const Button: (props: ViewComponent<ButtonHTMLAttributes<HTMLButtonElement>>) => someView;
/**
 * Returns a paragragh
 */
export declare const Paragragh: (props: ViewComponent<HTMLAttributes<HTMLParagraphElement>>) => someView;
/**
 * Returns a div element
 */
export declare const Container: (props: ViewComponent<HTMLAttributes<HTMLDivElement>>) => someView;
type HeadingProps = ViewComponent<HTMLAttributes<HTMLHeadingElement>> & {
    type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
/**
 * Returns an h1, h2, h3 heading element with prop passed else returns a h1 tag.
 */
export declare const Heading: (props: HeadingProps) => someView;
/**
 * Returns a main element
 */
export declare const Main: (props: BaseViewComponent) => someView;
type TextNodeProps<T = string | number | boolean> = {
    children?: ValueType<T> | ValueType<T>[];
};
/**
 * Returns a textnode
 */
export declare const TextNode: (props: TextNodeProps) => someView;
export { BaseViewComponent, ViewComponent };
