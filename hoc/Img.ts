import { type ImgHTMLAttributes } from "../types";
import Nixix, { nixixStore } from '../dom'

export function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (nixixStore.jsx = true), Nixix.create('img', { src: './' + props.src, ...props });
}