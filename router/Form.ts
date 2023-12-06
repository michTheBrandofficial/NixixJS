import { removeUnusedProps } from "../view-components/helpers";
import Nixix from "../dom";
import type { FormActionProps } from "./types/index";
import { getLink } from "./helpers";
import { callAction } from "./callAction";

const { create } = Nixix;

export const Form = (props: FormActionProps) => {
  const { children, "on:submit": onSubmit } =
    removeUnusedProps<FormActionProps>(props, "children", "on:submit");
  const subMitHandler: FormActionProps["on:submit"] = (e) => {
    e.preventDefault();
    const path = getLink(props?.action) as `/`;
    const formData = new FormData(e.currentTarget);
    callAction({ path, formData });
  };
  return create(
    "form",
    { ...props, "on:submit": subMitHandler },
    children as any
  );
};
