export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export const SVG_ELEMENTTAGS = [
  'a',
  'animate',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'defs',
  'desc',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'script',
  'set',
  'stop',
  'style',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'title',
  'tspan',
  'use',
  'view',
];

export const PROP_ALIASES: {
  [key: string]: { $: string; [key: string]: any };
} = {
  allowfullscreen: {
    $: 'allowFullscreen',
  },
  className: {
    $: 'className',
    ALL: 1,
  },
  formnovalidate: {
    $: 'formNoValidate',
    BUTTON: 1,
    INPUT: 1,
  },
  ismap: {
    $: 'isMap',
    IMG: 1,
  },
  nomodule: {
    $: 'noModule',
    SCRIPT: 1,
  },
  playsinline: {
    $: 'playsInline',
    VIDEO: 1,
  },
  readonly: {
    $: 'readOnly',
    INPUT: 1,
    TEXTAREA: 1,
  },
  novalidate: {
    $: 'noValidate',
  },
  async: {
    $: 'async',
  },
  autofocus: {
    $: 'autofocus',
  },
  autoplay: {
    $: 'autoplay',
  },
  checked: {
    $: 'checked',
  },
  controls: {
    $: 'controls',
  },
  default: {
    $: 'default',
  },
  disabled: {
    $: 'disabled',
  },
  hidden: {
    $: 'hidden',
  },
  loop: {
    $: 'loop',
  },
  multiple: {
    $: 'multiple',
  },
  muted: {
    $: 'muted',
  },
  open: {
    $: 'open',
  },
  required: {
    $: 'required',
  },
  reversed: {
    $: 'reversed',
  },
  seamless: {
    $: 'seamless',
  },
  selected: {
    $: 'selected',
  },
  indeterminate: {
    $: 'indeterminate',
  },
  innerHTML: {
    $: 'innerHTML',
  },
  value: {
    $: 'value',
    INPUT: 1,
  },
} as const;
