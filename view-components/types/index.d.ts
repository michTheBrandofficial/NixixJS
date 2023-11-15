import { Children, EmptyObject, HTMLAttributes } from '../../types/index';

export type ViewComponent<T = EmptyObject> = T & Children;

export type BaseViewComponent = ViewComponent<HTMLAttributes<HTMLElement>>