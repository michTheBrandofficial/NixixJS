import { HTMLAttributes, Children } from '../../types/index';

export type ViewComponent<T = HTMLAttributes<HTMLElement>> = T & Children;
