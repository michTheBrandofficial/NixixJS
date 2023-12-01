import { type ImgHTMLAttributes } from "../types";
import Nixix from '../dom'

export function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return Nixix.create('img', { src: './' + props.src, ...props });
}