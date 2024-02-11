// Type definitions for NixixJS.
// Definitions by: michTheBrandofficial <https://github.com/michTheBrandofficial>

/// <reference path="global.d.ts" />

import * as CSS from "csstype";
import { AriaRole } from "./aria";
import * as NativeEvents from "./eventhandlers";
import { MutableRefObject, Signal } from "../primitives/types";

type Booleanish = boolean | "true" | "false";

export = Nixix;
export as namespace Nixix;

declare namespace Nixix {
  /**
   * @deprecated fragment - esbuild provides support for 'fragment' string
   */
  const Fragment: "fragment";

  type EmptyObject<T = any> = {
    [index: string | number | symbol]: T;
  };

  type Children<T = NixixNode> = {
    children?: T;
  };

  class Component {
    constructor (props?: {});
  
    /**
     * This function is used to bind event handlers that are methods of the sub classes of `Component`
     */
    static bindEvent<T extends Function = Function>(fn: T): T;
  
    /**
     * This function is used to render the jsx
     */
    jsx(): someView;
  }

  type NixixNode = JSX.ElementType | Iterable<JSX.ElementType>;

  type ExoticComponent<P> = (props: P) => someView;

  type RouteExoticComponent<T> = T;

  type RefFunction<T> = (({current}: {current: T}) => void)

  interface CSSProperties extends CSS.Properties<string, number> {}

  interface EventAttributes<T> {

    // clipboard events
    "on:copy"?: NativeEvents.ClipboardEventHandler<T>;
    "on:copycapture"?: NativeEvents.ClipboardEventHandler<T>;
    "on:cut"?: NativeEvents.ClipboardEventHandler<T>;
    "on:cutcapture"?: NativeEvents.ClipboardEventHandler<T>;
    "on:paste"?: NativeEvents.ClipboardEventHandler<T>;
    "on:pastecapture"?: NativeEvents.ClipboardEventHandler<T>;

    // composition events
    "on:compositionend"?: NativeEvents.CompositionEventHandler<T>;
    "on:compositionendcapture"?: NativeEvents.CompositionEventHandler<T>;
    "on:compositionstart"?: NativeEvents.CompositionEventHandler<T>;
    "on:compositionstartcapture"?: NativeEvents.CompositionEventHandler<T>;
    "on:compositionupdate"?: NativeEvents.CompositionEventHandler<T>;
    "on:compositionupdatecapture"?: NativeEvents.CompositionEventHandler<T>;

    // focus events
    "on:focus"?: NativeEvents.FocusEventHandler<T>;
    "on:focuscapture"?: NativeEvents.FocusEventHandler<T>;
    "on:blur"?: NativeEvents.FocusEventHandler<T>;
    "on:blurcapture"?: NativeEvents.FocusEventHandler<T>;

    // form events
    "on:change"?: NativeEvents.FormEventHandler<T>;
    "on:changecapture"?: NativeEvents.FormEventHandler<T>;
    "on:beforeinput"?: NativeEvents.FormEventHandler<T>;
    "on:beforeinputcapture"?: NativeEvents.FormEventHandler<T>;
    "on:input"?: NativeEvents.FormEventHandler<T>;
    "on:inputcapture"?: NativeEvents.FormEventHandler<T>;
    "on:reset"?: NativeEvents.FormEventHandler<T>;
    "on:resetcapture"?: NativeEvents.FormEventHandler<T>;
    "on:submit"?: NativeEvents.FormEventHandler<T>;
    "on:submitcapture"?: NativeEvents.FormEventHandler<T>;
    "on:invalid"?: NativeEvents.FormEventHandler<T>;
    "on:invalidcapture"?: NativeEvents.FormEventHandler<T>;

    // image events
    "on:load"?: NativeEvents.NixixEventHandler<T>;
    "on:loadcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:error"?: NativeEvents.NixixEventHandler<T>; // also a media event
    "on:errorcapture"?: NativeEvents.NixixEventHandler<T>; // also a media event

    // keyboard events
    "on:keydown"?: NativeEvents.KeyboardEventHandler<T>;
    "on:keydowncapture"?: NativeEvents.KeyboardEventHandler<T>;
    /** @deprecated */
    "on:keypress"?: NativeEvents.KeyboardEventHandler<T>;
    /** @deprecated */
    "on:keypresscapture"?: NativeEvents.KeyboardEventHandler<T>;
    "on:keyup"?: NativeEvents.KeyboardEventHandler<T>;
    "on:keyupcapture"?: NativeEvents.KeyboardEventHandler<T>;

    // media events
    "on:abort"?: NativeEvents.NixixEventHandler<T>;
    "on:abortcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:canplay"?: NativeEvents.NixixEventHandler<T>;
    "on:canplaycapture"?: NativeEvents.NixixEventHandler<T>;
    "on:canplaythrough"?: NativeEvents.NixixEventHandler<T>;
    "on:canplaythroughcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:durationchange"?: NativeEvents.NixixEventHandler<T>;
    "on:durationchangecapture"?: NativeEvents.NixixEventHandler<T>;
    "on:emptied"?: NativeEvents.NixixEventHandler<T>;
    "on:emptiedcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:encrypted"?: NativeEvents.NixixEventHandler<T>;
    "on:encryptedcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:ended"?: NativeEvents.NixixEventHandler<T>;
    "on:endedcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:loadeddata"?: NativeEvents.NixixEventHandler<T>;
    "on:loadeddatacapture"?: NativeEvents.NixixEventHandler<T>;
    "on:loadedmetadata"?: NativeEvents.NixixEventHandler<T>;
    "on:loadedmetadatacapture"?: NativeEvents.NixixEventHandler<T>;
    "on:loadstart"?: NativeEvents.NixixEventHandler<T>;
    "on:loadstartcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:pause"?: NativeEvents.NixixEventHandler<T>;
    "on:pausecapture"?: NativeEvents.NixixEventHandler<T>;
    "on:play"?: NativeEvents.NixixEventHandler<T>;
    "on:playcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:playing"?: NativeEvents.NixixEventHandler<T>;
    "on:playingcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:progress"?: NativeEvents.NixixEventHandler<T>;
    "on:progresscapture"?: NativeEvents.NixixEventHandler<T>;
    "on:ratechange"?: NativeEvents.NixixEventHandler<T>;
    "on:ratechangecapture"?: NativeEvents.NixixEventHandler<T>;
    "on:resize"?: NativeEvents.NixixEventHandler<T>;
    "on:resizecapture"?: NativeEvents.NixixEventHandler<T>;
    "on:seeked"?: NativeEvents.NixixEventHandler<T>;
    "on:seekedcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:seeking"?: NativeEvents.NixixEventHandler<T>;
    "on:seekingcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:stalled"?: NativeEvents.NixixEventHandler<T>;
    "on:stalledcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:suspend"?: NativeEvents.NixixEventHandler<T>;
    "on:suspendcapture"?: NativeEvents.NixixEventHandler<T>;
    "on:timeupdate"?: NativeEvents.NixixEventHandler<T>;
    "on:timeupdatecapture"?: NativeEvents.NixixEventHandler<T>;
    "on:volumechange"?: NativeEvents.NixixEventHandler<T>;
    "on:volumechangecapture"?: NativeEvents.NixixEventHandler<T>;
    "on:waiting"?: NativeEvents.NixixEventHandler<T>;
    "on:waitingcapture"?: NativeEvents.NixixEventHandler<T>;

    // mouseevents
    "on:auxclick"?: NativeEvents.MouseEventHandler<T>;
    "on:auxclickcapture"?: NativeEvents.MouseEventHandler<T>;
    "on:click"?: NativeEvents.MouseEventHandler<T>;
    "on:clickcapture"?: NativeEvents.MouseEventHandler<T>;
    "on:contextmenu"?: NativeEvents.MouseEventHandler<T>;
    "on:contextmenucapture"?: NativeEvents.MouseEventHandler<T>;
    "on:doubleclick"?: NativeEvents.MouseEventHandler<T>;
    "on:doubleclickcapture"?: NativeEvents.MouseEventHandler<T>;
    "on:drag"?: NativeEvents.DragEventHandler<T>;
    "on:dragcapture"?: NativeEvents.DragEventHandler<T>;
    "on:dragend"?: NativeEvents.DragEventHandler<T>;
    "on:dragendcapture"?: NativeEvents.DragEventHandler<T>;
    "on:dragenter"?: NativeEvents.DragEventHandler<T>;
    "on:dragentercapture"?: NativeEvents.DragEventHandler<T>;
    "on:dragexit"?: NativeEvents.DragEventHandler<T>;
    "on:dragexitcapture"?: NativeEvents.DragEventHandler<T>;
    "on:dragleave"?: NativeEvents.DragEventHandler<T>;
    "on:dragleavecapture"?: NativeEvents.DragEventHandler<T>;
    "on:dragover"?: NativeEvents.DragEventHandler<T>;
    "on:dragovercapture"?: NativeEvents.DragEventHandler<T>;
    "on:dragstart"?: NativeEvents.DragEventHandler<T>;
    "on:dragstartcapture"?: NativeEvents.DragEventHandler<T>;
    "on:drop"?: NativeEvents.DragEventHandler<T>;
    "on:dropcapture"?: NativeEvents.DragEventHandler<T>;
    "on:mousedown"?: NativeEvents.MouseEventHandler<T>;
    "on:mousedowncapture"?: NativeEvents.MouseEventHandler<T>;
    "on:mouseenter"?: NativeEvents.MouseEventHandler<T>;
    "on:mouseleave"?: NativeEvents.MouseEventHandler<T>;
    "on:mousemove"?: NativeEvents.MouseEventHandler<T>;
    "on:mousemovecapture"?: NativeEvents.MouseEventHandler<T>;
    "on:mouseout"?: NativeEvents.MouseEventHandler<T>;
    "on:mouseoutcapture"?: NativeEvents.MouseEventHandler<T>;
    "on:mouseover"?: NativeEvents.MouseEventHandler<T>;
    "on:mouseovercapture"?: NativeEvents.MouseEventHandler<T>;
    "on:mouseup"?: NativeEvents.MouseEventHandler<T>;
    "on:mouseupcapture"?: NativeEvents.MouseEventHandler<T>;

    // selection: events
    "on:select"?: NativeEvents.NixixEventHandler<T>;
    "on:selectcapture"?: NativeEvents.NixixEventHandler<T>;

    // touch events
    "on:touchcancel"?: NativeEvents.TouchEventHandler<T>;
    "on:touchcancelcapture"?: NativeEvents.TouchEventHandler<T>;
    "on:touchend"?: NativeEvents.TouchEventHandler<T>;
    "on:touchendcapture"?: NativeEvents.TouchEventHandler<T>;
    "on:touchmove"?: NativeEvents.TouchEventHandler<T>;
    "on:touchmovecapture"?: NativeEvents.TouchEventHandler<T>;
    "on:touchstart"?: NativeEvents.TouchEventHandler<T>;
    "on:touchstartcapture"?: NativeEvents.TouchEventHandler<T>;

    // pointer events
    "on:pointerdown"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerdowncapture"?: NativeEvents.MouseEventHandler<T>;
    "on:pointermove"?: NativeEvents.MouseEventHandler<T>;
    "on:pointermovecapture"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerup"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerupcapture"?: NativeEvents.MouseEventHandler<T>;
    "on:pointercancel"?: NativeEvents.MouseEventHandler<T>;
    "on:pointercancelcapture"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerenter"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerentercapture"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerleave"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerleavecapture"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerover"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerovercapture"?: NativeEvents.MouseEventHandler<T>;
    "on:pointerout"?: NativeEvents.MouseEventHandler<T>;
    "on:pointeroutcapture"?: NativeEvents.MouseEventHandler<T>;
    "on:gotpointercapture"?: NativeEvents.MouseEventHandler<T>;
    "on:gotpointercapturecapture"?: NativeEvents.MouseEventHandler<T>;
    "on:lostpointercapture"?: NativeEvents.MouseEventHandler<T>;
    "on:lostpointercapturecapture"?: NativeEvents.MouseEventHandler<T>;

    // ui events
    "on:scroll"?: NativeEvents.UIEventHandler<T>;
    "on:scrollcapture"?: NativeEvents.UIEventHandler<T>;

    // wheel events
    "on:wheel"?: NativeEvents.WheelEventHandler<T>;
    "on:wheelcapture"?: NativeEvents.WheelEventHandler<T>;

    // animation events
    "on:animationstart"?: NativeEvents.AnimationEventHandler<T>;
    "on:animationstartcapture"?: NativeEvents.AnimationEventHandler<T>;
    "on:animationend"?: NativeEvents.AnimationEventHandler<T>;
    "on:animationendcapture"?: NativeEvents.AnimationEventHandler<T>;
    "on:animationiteration"?: NativeEvents.AnimationEventHandler<T>;
    "on:animationiterationcapture"?: NativeEvents.AnimationEventHandler<T>;

    // transition events
    "on:transitionend"?: NativeEvents.TransitionEventHandler<T>;
    "on:transitionendcapture"?: NativeEvents.TransitionEventHandler<T>;
  }

  interface BindDirectives<T> {
    "bind:ref"?: MutableRefObject<T | null> | RefFunction<T>;
  }

  interface NixixAttributes<T> extends BindDirectives<T> {
    key?: number;
  }

  interface DOMAttributes<T> extends EventAttributes<T> {
    children?: NixixNode;
    innerHTML?: string;
  }

  interface AriaAttributes {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    "aria-activedescendant"?: string;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    "aria-atomic"?: Booleanish;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    "aria-autocomplete"?: "none" | "inline" | "list" | "both";
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    "aria-busy"?: Booleanish;
    /**
     * Indicates the current "checked" Signal of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed @see aria-selected.
     */
    "aria-checked"?: boolean | "false" | "mixed" | "true";
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    "aria-colcount"?: number;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    "aria-colindex"?: number;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    "aria-colspan"?: number;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    "aria-controls"?: string;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    "aria-current"?:
      | Booleanish
      | "page"
      | "step"
      | "location"
      | "date"
      | "time";
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    "aria-describedby"?: string;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    "aria-details"?: string;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    "aria-disabled"?: Booleanish;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup";
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    "aria-errormessage"?: string;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    "aria-expanded"?: Booleanish;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    "aria-flowto"?: string;
    /**
     * Indicates an element's "grabbed" Signal in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    "aria-grabbed"?: Booleanish;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    "aria-haspopup"?:
      | Booleanish
      | "menu"
      | "listbox"
      | "tree"
      | "grid"
      | "dialog";
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    "aria-hidden"?: Booleanish;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    "aria-invalid"?: Booleanish | "grammar" | "spelling";
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    "aria-keyshortcuts"?: string;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    "aria-label"?: string;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    "aria-labelledby"?: string;
    /** Defines the hierarchical level of an element within a structure. */
    "aria-level"?: number;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    "aria-live"?: "off" | "assertive" | "polite";
    /** Indicates whether an element is modal when displayed. */
    "aria-modal"?: Booleanish;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    "aria-multiline"?: Booleanish;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    "aria-multiselectable"?: Booleanish;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    "aria-orientation"?: "horizontal" | "vertical";
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    "aria-owns"?: string;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    "aria-placeholder"?: string;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    "aria-posinset"?: number;
    /**
     * Indicates the current "pressed" Signal of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    "aria-pressed"?: Booleanish | "mixed";
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    "aria-readonly"?: Booleanish;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    "aria-relevant"?:
      | "additions"
      | "additions removals"
      | "additions text"
      | "all"
      | "removals"
      | "removals additions"
      | "removals text"
      | "text"
      | "text additions"
      | "text removals";
    /** Indicates that user input is required on the element before a form may be submitted. */
    "aria-required"?: Booleanish;
    /** Defines a human-readable, author-localized description for the role of an element. */
    "aria-roledescription"?: string;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    "aria-rowcount"?: number;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    "aria-rowindex"?: number;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    "aria-rowspan"?: number;
    /**
     * Indicates the current "selected" Signal of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    "aria-selected"?: Booleanish;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    "aria-setsize"?: number;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    "aria-sort"?: "none" | "ascending" | "descending" | "other";
    /** Defines the maximum allowed value for a range widget. */
    "aria-valuemax"?: number;
    /** Defines the minimum allowed value for a range widget. */
    "aria-valuemin"?: number;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    "aria-valuenow"?: number;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    "aria-valuetext"?: string;
  }

  interface HTMLAttributes<T>
    extends DOMAttributes<T>,
      AriaAttributes,
      NixixAttributes<T> {
    // Standard HTML Attributes
    accesskey?: string;
    autofocus?: boolean | undefined;
    className?: string;
    contenteditable?: boolean | "true" | "false" | "inherit";
    contextmenu?: string;
    dir?: string;
    draggable?: Booleanish;
    enterkeyhint?:
      | "enter"
      | "done"
      | "go"
      | "next"
      | "previous"
      | "search"
      | "send";
    hidden?: boolean;
    id?: string;
    lang?: string;
    part?: string;
    placeholder?: string;
    slot?: string;
    spellcheck?: Booleanish;
    style?: CSSProperties;
    tabindex?: number;
    title?: string;
    translate?: "yes" | "no" | "";
    inert?: boolean;

    // Unknown
    radiogroup?: string; // <command>, <menuitem>

    // WAI-ARIA
    role?: AriaRole;

    // RDFa Attributes
    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;

    // Non-standard Attributes
    autocapitalize?: string;
    autocorrect?: string;
    autosave?: string;
    color?: CSSProperties["color"];
    itemprop?: string;
    itemscope?: boolean;
    itemtype?: string;
    itemid?: string;
    itemref?: string;
    results?: number;
    security?: string;
    unselectable?: "on" | "off";

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputmode?:
      | "none"
      | "text"
      | "tel"
      | "url"
      | "email"
      | "numeric"
      | "decimal"
      | "search";
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: string;
  }

  type ReferrerPolicy =
    | ""
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";

  type HTMLAttributeAnchorTarget =
    | "_self"
    | "_blank"
    | "_parent"
    | "_top"
    | (string & {});

  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any;
    href?: string;
    hreflang?: string;
    media?: string;
    ping?: string;
    rel?: string;
    target?: HTMLAttributeAnchorTarget;
    type?: string;
    referrerpolicy?: ReferrerPolicy;
  }

  interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

  interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    coords?: string;
    download?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    referrerpolicy?: ReferrerPolicy;
    rel?: string;
    shape?: string;
    target?: string;
  }

  interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string;
    target?: string;
  }

  interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
  }

  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    form?: string;
    formaction?: string;
    formenctype?: string;
    formmethod?: string;
    formnovalidate?: boolean;
    formtarget?: string;
    name?: string;
    type?: "submit" | "reset" | "button";
    value?: string | string[] | number;
  }

  interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    width?: number | string;
  }

  interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
    width?: number | string;
  }

  interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
  }

  interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean | undefined;
    "on:toggle"?: NativeEvents.NixixEventHandler<T>;
  }

  interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string | undefined;
    datetime?: string | undefined;
  }

  interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean | undefined;
    "on:cancel"?: NativeEvents.NixixEventHandler<T>;
    "on:close"?: NativeEvents.NixixEventHandler<T>;
  }

  interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string | undefined;
    src?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;
  }

  interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    form?: string | undefined;
    name?: string | undefined;
  }

  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptcharset?: string;
    action?: string;
    autocomplete?: string;
    enctype?: string;
    method?: string;
    name?: string;
    novalidate?: boolean;
    target?: string;
    rel?: string;
  }

  interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string | undefined;
  }

  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allow?: string;
    allowfullscreen?: boolean;
    allowtransparency?: boolean;
    /** @deprecated */
    frameborder?: number | string;
    height?: number | string;
    loading?: "eager" | "lazy";
    /** @deprecated */
    marginheight?: number;
    /** @deprecated */
    marginwidth?: number;
    name?: string;
    referrerpolicy?: ReferrerPolicy;
    sandbox?: string;
    /** @deprecated */
    scrolling?: string;
    seamless?: boolean;
    src?: string;
    srcdoc?: string;
    width?: number | string;
  }

  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string | undefined;
    crossorigin?: "anonymous" | "use-credentials" | "" | undefined;
    decoding?: "async" | "auto" | "sync" | undefined;
    height?: number | string | undefined;
    loading?: "eager" | "lazy" | undefined;
    referrerpolicy?: ReferrerPolicy | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcset?: string | undefined;
    usemap?: string | undefined;
    width?: number | string | undefined;
  }

  interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string | undefined;
    datetime?: string | undefined;
  }

  type HTMLInputTypeAttribute =
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | (string & {});

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string;
    alt?: string;
    autocomplete?: "off" | "on";
    "bind:value"?: Signal<string | number | null>;
    capture?: boolean | "user" | "environment"; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean;
    crossorigin?: string;
    disabled?: boolean;
    form?: string;
    formaction?: string;
    formenctype?: string;
    formmethod?: string;
    formnovalidate?: boolean;
    formtarget?: string;
    height?: number | string;
    list?: string;
    max?: number | string;
    maxlength?: number;
    min?: number | string;
    minlength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    size?: number;
    src?: string;
    step?: number | string;
    type?: HTMLInputTypeAttribute;
    value?: any;
    width?: number | string;
    "on:change"?: NativeEvents.ChangeEventHandler<T>;
  }

  interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    autofocus?: boolean | undefined;
    challenge?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    keytype?: string | undefined;
    keyparams?: string | undefined;
    name?: string | undefined;
  }

  interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string | undefined;
    for?: string | undefined;
  }

  interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | ReadonlyArray<string> | number | undefined;
  }

  interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string | undefined;
    crossorigin?: "anonymous" | "use-credentials" | "" | undefined;
    href?: string | undefined;
    "href-lang"?: string | undefined;
    integrity?: string | undefined;
    media?: string | undefined;
    imagesrcset?: string | undefined;
    imagesizes?: string | undefined;
    referrerpolicy?: ReferrerPolicy | undefined;
    rel?: string | undefined;
    sizes?: string | undefined;
    type?: string | undefined;
    charset?: string | undefined;
  }

  interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string | undefined;
  }

  interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string | undefined;
  }

  interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoplay?: boolean | undefined;
    controls?: boolean | undefined;
    controlslist?: string | undefined;
    crossorigin?: "anonymous" | "use-credentials" | "" | undefined;
    loop?: boolean | undefined;
    mediagroup?: string | undefined;
    muted?: boolean | undefined;
    playsinline?: boolean | undefined;
    preload?: string | undefined;
    src?: string | undefined;
  }

  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charset?: string;
    content?: string;
    httpequiv?: string;
    name?: string;
    media?: string;
  }

  interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    high?: number;
    low?: number;
    max?: number | string;
    min?: number | string;
    optimum?: number;
    value?: string | string[] | number;
  }

  interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
  }

  interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classid?: string;
    data?: string;
    form?: string;
    height?: number | string;
    name?: string;
    type?: string;
    usemap?: string;
    width?: number | string;
    wmode?: string;
  }

  interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean;
    start?: number;
    type?: "1" | "a" | "A" | "i" | "I";
  }

  interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
  }

  interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: any;
  }

  interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    for?: string;
    name?: string;
  }

  interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
    value?: string | string[] | number;
  }

  interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string;
    value?: string | string[] | number;
  }

  interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
  }

  interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean;
    /** @deprecated */
    charset?: string;
    crossorigin?: string;
    defer?: boolean;
    integrity?: string;
    nomodule?: boolean;
    nonce?: string;
    referrerpolicy?: ReferrerPolicy;
    src?: string;
    type?: string;
  }

  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?: string;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
    value?: any;
  }

  interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    media?: string;
    sizes?: string;
    src?: string;
    srcset?: string;
    type?: string;
    width?: number | string;
  }

  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    nonce?: string;
    scoped?: boolean;
    type?: string;
  }

  interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: "left" | "center" | "right";
    bgcolor?: string;
    border?: number;
    cellpadding?: number | string;
    cellspacing?: number | string;
    frame?: boolean;
    rules?: "none" | "groups" | "rows" | "columns" | "all";
    summary?: string;
    width?: number | string;
  }

  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?: string;
    cols?: number;
    dirname?: string;
    disabled?: boolean;
    form?: string;
    maxlength?: number;
    minlength?: number;
    name?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    value?: string | string[] | number;
    wrap?: string;
  }

  interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: "left" | "center" | "right" | "justify" | "char";
    colspan?: number;
    headers?: string;
    rowspan?: number;
    scope?: string;
    abbr?: string;
    height?: number | string;
    width?: number | string;
    valign?: "top" | "middle" | "bottom" | "baseline";
  }

  interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: "left" | "center" | "right" | "justify" | "char";
    colspan?: number;
    headers?: string;
    rowspan?: number;
    scope?: string;
    abbr?: string;
  }

  interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    datetime?: string;
  }

  interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srclang?: string;
  }

  interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string;
    playsinline?: boolean;
    poster?: string;
    width?: number | string;
    disablepictureinpicture?: boolean;
    disableremoteplayback?: boolean;
  }

  interface SVGAttributes<T>
    extends AriaAttributes,
      DOMAttributes<T>,
      NixixAttributes<T> {
    // Attributes which also defined in HTMLAttributes
    className?: string | null;
    class?: string | null;
    color?: CSSProperties["color"];
    height?: number | string | null;
    id?: string | null;
    lang?: string | null;
    max?: number | string | null;
    media?: string | null;
    method?: string | null;
    min?: number | string | null;
    name?: string | null;
    style?: HtmlHTMLAttributes<SVGSVGElement>["style"];
    target?: string | null;
    type?: string | null;
    width?: number | string | null;

    // Other HTML properties supported by SVG elements in browsers
    role?: AriaRole | undefined | null;
    tabindex?: number | undefined | null;
    crossorigin?: "anonymous" | "use-credentials" | "" | undefined;

    // SVG Specific attributes
    "accent-height"?: number | string | null;
    accumulate?: "none" | "sum" | undefined | null;
    additive?: "replace" | "sum" | undefined | null;
    "alignment-baseline"?:
      | "auto"
      | "baseline"
      | "before-edge"
      | "text-before-edge"
      | "middle"
      | "central"
      | "after-edge"
      | "text-after-edge"
      | "ideographic"
      | "alphabetic"
      | "hanging"
      | "mathematical"
      | "inherit"
      | undefined
      | null;
    allowReorder?: "no" | "yes" | undefined | null;
    alphabetic?: number | string | null;
    amplitude?: number | string | null;
    "arabic-form"?:
      | "initial"
      | "medial"
      | "terminal"
      | "isolated"
      | undefined
      | null;
    ascent?: number | string | null;
    attributeName?: string | null;
    attributeType?: string | null;
    autoReverse?: number | string | null;
    azimuth?: number | string | null;
    baseFrequency?: number | string | null;
    "baseline-shift"?: number | string | null;
    baseProfile?: number | string | null;
    bbox?: number | string | null;
    begin?: number | string | null;
    bias?: number | string | null;
    by?: number | string | null;
    calcMode?: number | string | null;
    "cap-height"?: number | string | null;
    clip?: number | string | null;
    "clip-path"?: string | null;
    clipPathUnits?: number | string | null;
    "clip-rule"?: number | string | null;
    "color-interpolation"?: CSSProperties["colorInterpolation"];
    "color-interpolation-filters"?:
      | "auto"
      | "sRGB"
      | "linearRGB"
      | "inherit"
      | undefined
      | null;
    "color-profile"?: number | string | null;
    "color-rendering"?: CSSProperties["colorRendering"];
    contentScriptType?: number | string | null;
    contentStyleType?: number | string | null;
    cursor?: number | string | null;
    cx?: number | string | null;
    cy?: number | string | null;
    d?: string | null;
    decelerate?: number | string | null;
    descent?: number | string | null;
    diffuseConstant?: number | string | null;
    direction?: number | string | null;
    display?: number | string | null;
    divisor?: number | string | null;
    "dominant-baseline"?: number | string | null;
    dur?: number | string | null;
    dx?: number | string | null;
    dy?: number | string | null;
    edgeMode?: number | string | null;
    elevation?: number | string | null;
    "enable-background"?: number | string | null;
    end?: number | string | null;
    exponent?: number | string | null;
    externalResourcesRequired?: number | string | null;
    fill?: CSSProperties["fill"];
    "fill-opacity"?: CSSProperties["fillOpacity"];
    "fill-rule"?: "nonzero" | "evenodd" | "inherit" | undefined | null;
    filter?: string | null;
    filterRes?: number | string | null;
    filterUnits?: number | string | null;
    "flood-color"?: CSSProperties["floodColor"];
    "flood-opacity"?: number | string | null;
    focusable?: number | string | null;
    "font-family"?: CSSProperties["fontFamily"];
    "font-size"?: number | string | null;
    "font-size-adjust"?: number | string | null;
    "font-stretch"?: number | string | null;
    "font-style"?: number | string | null;
    "font-variant"?: number | string | null;
    "font-weight"?: number | string | null;
    format?: number | string | null;
    from?: number | string | null;
    fx?: number | string | null;
    fy?: number | string | null;
    g1?: number | string | null;
    g2?: number | string | null;
    "glyph-name"?: number | string | null;
    "glyph-orientation-horizontal"?: number | string | undefined | null;
    "glyph-orientation-vertical"?: number | string | undefined | null;
    glyphRef?: number | string | null;
    gradientTransform?: string | null;
    gradientUnits?: string | null;
    hanging?: number | string | null;
    href?: string | null;
    "horiz-adv-x"?: number | string | null;
    "horiz-origin-x"?: number | string | null;
    ideographic?: number | string | null;
    "image-rendering"?: number | string | null;
    in2?: number | string | null;
    in?: string | null;
    intercept?: number | string | null;
    k1?: number | string | null;
    k2?: number | string | null;
    k3?: number | string | null;
    k4?: number | string | null;
    k?: number | string | null;
    kernelMatrix?: number | string | null;
    kernelUnitLength?: number | string | null;
    kerning?: number | string | null;
    keyPoints?: number | string | null;
    keySplines?: number | string | null;
    keyTimes?: number | string | null;
    lengthAdjust?: number | string | null;
    "letter-spacing"?: number | string | null;
    "lighting-color"?: CSSProperties["lightingColor"];
    limitingConeAngle?: number | string | null;
    local?: number | string | null;
    "marker-end"?: string | null;
    markerHeight?: number | string | null;
    "marker-mid"?: string | null;
    "marker-start"?: string | null;
    markerUnits?: number | string | null;
    markerWidth?: number | string | null;
    mask?: string | null;
    maskContentUnits?: number | string | null;
    maskUnits?: number | string | null;
    mathematical?: number | string | null;
    mode?: number | string | null;
    numOctaves?: number | string | null;
    offset?: number | string | null;
    opacity?: number | string | null;
    operator?: number | string | null;
    order?: number | string | null;
    orient?: number | string | null;
    orientation?: number | string | null;
    origin?: number | string | null;
    overflow?: number | string | null;
    "overline-position"?: number | string | null;
    "overline-thickness"?: number | string | null;
    "paint-order"?: number | string | null;
    "panose-1"?: number | string | null;
    path?: string | null;
    pathLength?: number | string | null;
    patternContentUnits?: string | null;
    patternTransform?: number | string | null;
    patternUnits?: string | null;
    "pointer-events"?: number | string | null;
    points?: string | null;
    pointsAtX?: number | string | null;
    pointsAtY?: number | string | null;
    pointsAtZ?: number | string | null;
    preserveAlpha?: number | string | null;
    preserveAspectRatio?: string | null;
    primitiveUnits?: number | string | null;
    r?: number | string | null;
    radius?: number | string | null;
    refX?: number | string | null;
    refY?: number | string | null;
    "rendering-intent"?: number | string | null;
    repeatCount?: number | string | null;
    repeatDur?: number | string | null;
    requiredExtensions?: number | string | null;
    requiredFeatures?: number | string | null;
    restart?: number | string | null;
    result?: string | null;
    rotate?: number | string | null;
    rx?: number | string | null;
    ry?: number | string | null;
    scale?: number | string | null;
    seed?: number | string | null;
    "shape-rendering"?: number | string | null;
    slope?: number | string | null;
    spacing?: number | string | null;
    specularConstant?: number | string | null;
    specularExponent?: number | string | null;
    speed?: number | string | null;
    spreadMethod?: string | null;
    startOffset?: number | string | null;
    stdDeviation?: number | string | null;
    stemh?: number | string | null;
    stemv?: number | string | null;
    stitchTiles?: number | string | null;
    "stop-color"?: CSSProperties["stopColor"];
    "stop-opacity"?: number | string | null;
    "strikethrough-position"?: number | string | null;
    "strikethrough-thickness"?: number | string | null;
    string?: number | string | null;
    stroke?: string | null;
    "stroke-dasharray"?: number | string | null;
    "stroke-dashoffset"?: number | string | null;
    "stroke-linecap"?:
      | "butt"
      | "round"
      | "square"
      | "inherit"
      | undefined
      | null;
    "stroke-linejoin"?:
      | "miter"
      | "round"
      | "bevel"
      | "inherit"
      | undefined
      | null;
    "stroke-miterlimit"?: string | null;
    "stroke-opacity"?: number | string | null;
    "stroke-width"?: number | string | null;
    surfaceScale?: number | string | null;
    systemLanguage?: number | string | null;
    tableValues?: number | string | null;
    targetX?: number | string | null;
    targetY?: number | string | null;
    "text-anchor"?: string | null;
    "text-decoration"?: number | string | null;
    textLength?: number | string | null;
    "text-rendering"?: number | string | null;
    to?: number | string | null;
    transform?: string | null;
    u1?: number | string | null;
    u2?: number | string | null;
    "underline-position"?: number | string | null;
    "underline-thickness"?: number | string | null;
    unicode?: number | string | null;
    "unicode-bidi"?: number | string | null;
    "unicode-range"?: number | string | null;
    "units-per-em"?: number | string | null;
    "v-alphabetic"?: number | string | null;
    values?: string | null;
    "vector-effect"?: number | string | null;
    version?: string | null;
    "vert-adv-y"?: number | string | null;
    "vert-origin-x"?: number | string | null;
    "vert-origin-y"?: number | string | null;
    "v-hanging"?: number | string | null;
    "v-ideographic"?: number | string | null;
    viewBox?: string | null;
    viewTarget?: number | string | null;
    visibility?: number | string | null;
    "v-mathematical"?: number | string | null;
    widths?: number | string | null;
    "word-spacing"?: number | string | null;
    "writing-mode"?: number | string | null;
    x1?: number | string | null;
    x2?: number | string | null;
    x?: number | string | null;
    xChannelSelector?: string | null;
    "x-height"?: number | string | null;
    "xlink-actuate"?: string | null;
    "xlink-arcrole"?: string | null;
    "xlink-href"?: string | null;
    "xlink-role"?: string | null;
    "xlink-show"?: string | null;
    "xlink-title"?: string | null;
    "xlink-type"?: string | null;
    "xml-base"?: string | null;
    "xml-lang"?: string | null;
    xmlns?: string | null;
    "xmlns-xlink"?: string | null;
    "xml-space"?: string | null;
    y1?: number | string | null;
    y2?: number | string | null;
    y?: number | string | null;
    yChannelSelector?: string | null;
    z?: number | string | null;
    zoomAndPan?: string | null;
  }

  interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
    allowfullscreen?: boolean;
    allowpopups?: boolean;
    autosize?: boolean;
    blinkfeatures?: string;
    disableblinkfeatures?: string;
    disableguestresize?: boolean;
    disablewebsecurity?: boolean;
    guestinstance?: string;
    httpreferrer?: string;
    nodeintegration?: boolean;
    partition?: string;
    plugins?: boolean;
    preload?: string;
    src?: string;
    useragent?: string;
    webpreferences?: string;
  }

  type JSXElementConstructor<P> = (props?: P) => someView | Promise<someView>;

  interface NixixElement<
    P = any,
    T extends string | JSXElementConstructor<P> =
      | string
      | JSXElementConstructor<P>
  > {
    key?: number;
  }

  namespace JSX {
    type ElementType = GlobalJSXElementType;
    interface Element extends GlobalJSXElement {}
    interface IntrinsicAttributes extends GlobalJSXIntrinsicAttributes {}
    interface IntrinsicElements extends GlobalJSXIntrinsicElements {}
    interface ElementChildrenAttribute
      extends GlobalJSXElementChildrenAttribute {}
  }
}

declare global {
  type someView = JSX.ElementType;
  namespace JSX {
    type ElementType =
      | string
      | number
      | boolean
      | null
      | undefined
      | Nixix.JSXElementConstructor<any>
      | typeof Nixix.Component
      | JSX.Element
      | Iterable<ElementType>;

    interface Element extends Nixix.NixixElement<any, any>, Node {}

    interface ElementChildrenAttribute {
      children: {};
    }

    interface IntrinsicAttributes {
      key?: number;
    }

    interface HTMLElementTags {
      // HTML
      a: Nixix.AnchorHTMLAttributes<HTMLAnchorElement>;
      abbr: Nixix.HTMLAttributes<HTMLElement>;
      address: Nixix.HTMLAttributes<HTMLElement>;
      area: Nixix.AreaHTMLAttributes<HTMLAreaElement>;
      article: Nixix.HTMLAttributes<HTMLElement>;
      aside: Nixix.HTMLAttributes<HTMLElement>;
      audio: Nixix.AudioHTMLAttributes<HTMLAudioElement>;
      b: Nixix.HTMLAttributes<HTMLElement>;
      base: Nixix.BaseHTMLAttributes<HTMLBaseElement>;
      bdi: Nixix.HTMLAttributes<HTMLElement>;
      bdo: Nixix.HTMLAttributes<HTMLElement>;
      big: Nixix.HTMLAttributes<HTMLElement>;
      blockquote: Nixix.BlockquoteHTMLAttributes<HTMLQuoteElement>;
      body: Nixix.HTMLAttributes<HTMLBodyElement>;
      br: Nixix.HTMLAttributes<HTMLBRElement>;
      button: Nixix.ButtonHTMLAttributes<HTMLButtonElement>;
      canvas: Nixix.CanvasHTMLAttributes<HTMLCanvasElement>;
      caption: Nixix.HTMLAttributes<HTMLElement>;
      center: Nixix.HTMLAttributes<HTMLElement>;
      cite: Nixix.HTMLAttributes<HTMLElement>;
      code: Nixix.HTMLAttributes<HTMLElement>;
      col: Nixix.ColHTMLAttributes<HTMLTableColElement>;
      colgroup: Nixix.ColgroupHTMLAttributes<HTMLTableColElement>;
      data: Nixix.DataHTMLAttributes<HTMLDataElement>;
      datalist: Nixix.HTMLAttributes<HTMLDataListElement>;
      dd: Nixix.HTMLAttributes<HTMLElement>;
      del: Nixix.DelHTMLAttributes<HTMLModElement>;
      details: Nixix.DetailsHTMLAttributes<HTMLDetailsElement>;
      dfn: Nixix.HTMLAttributes<HTMLElement>;
      dialog: Nixix.DialogHTMLAttributes<HTMLDialogElement>;
      div: Nixix.HTMLAttributes<HTMLDivElement>;
      dl: Nixix.HTMLAttributes<HTMLDListElement>;
      dt: Nixix.HTMLAttributes<HTMLElement>;
      em: Nixix.HTMLAttributes<HTMLElement>;
      embed: Nixix.EmbedHTMLAttributes<HTMLEmbedElement>;
      fieldset: Nixix.FieldsetHTMLAttributes<HTMLFieldSetElement>;
      figcaption: Nixix.HTMLAttributes<HTMLElement>;
      figure: Nixix.HTMLAttributes<HTMLElement>;
      footer: Nixix.HTMLAttributes<HTMLElement>;
      form: Nixix.FormHTMLAttributes<HTMLFormElement>;
      h1: Nixix.HTMLAttributes<HTMLHeadingElement>;
      h2: Nixix.HTMLAttributes<HTMLHeadingElement>;
      h3: Nixix.HTMLAttributes<HTMLHeadingElement>;
      h4: Nixix.HTMLAttributes<HTMLHeadingElement>;
      h5: Nixix.HTMLAttributes<HTMLHeadingElement>;
      h6: Nixix.HTMLAttributes<HTMLHeadingElement>;
      head: Nixix.HTMLAttributes<HTMLHeadElement>;
      header: Nixix.HTMLAttributes<HTMLElement>;
      hgroup: Nixix.HTMLAttributes<HTMLElement>;
      hr: Nixix.HTMLAttributes<HTMLHRElement>;
      html: Nixix.HtmlHTMLAttributes<HTMLHtmlElement>;
      i: Nixix.HTMLAttributes<HTMLElement>;
      iframe: Nixix.IframeHTMLAttributes<HTMLIFrameElement>;
      img: Nixix.ImgHTMLAttributes<HTMLImageElement>;
      input: Nixix.InputHTMLAttributes<HTMLInputElement>;
      ins: Nixix.InsHTMLAttributes<HTMLModElement>;
      kbd: Nixix.HTMLAttributes<HTMLElement>;
      keygen: Nixix.KeygenHTMLAttributes<HTMLElement>;
      label: Nixix.LabelHTMLAttributes<HTMLLabelElement>;
      legend: Nixix.HTMLAttributes<HTMLLegendElement>;
      li: Nixix.LiHTMLAttributes<HTMLLIElement>;
      link: Nixix.LinkHTMLAttributes<HTMLLinkElement>;
      main: Nixix.HTMLAttributes<HTMLElement>;
      map: Nixix.MapHTMLAttributes<HTMLMapElement>;
      mark: Nixix.HTMLAttributes<HTMLElement>;
      menu: Nixix.MenuHTMLAttributes<HTMLElement>;
      menuitem: Nixix.HTMLAttributes<HTMLElement>;
      meta: Nixix.MetaHTMLAttributes<HTMLMetaElement>;
      meter: Nixix.MeterHTMLAttributes<HTMLMeterElement>;
      nav: Nixix.HTMLAttributes<HTMLElement>;
      noindex: Nixix.HTMLAttributes<HTMLElement>;
      noscript: Nixix.HTMLAttributes<HTMLElement>;
      object: Nixix.ObjectHTMLAttributes<HTMLObjectElement>;
      ol: Nixix.OlHTMLAttributes<HTMLOListElement>;
      optgroup: Nixix.OptgroupHTMLAttributes<HTMLOptGroupElement>;
      option: Nixix.OptionHTMLAttributes<HTMLOptionElement>;
      output: Nixix.OutputHTMLAttributes<HTMLOutputElement>;
      p: Nixix.HTMLAttributes<HTMLParagraphElement>;
      param: Nixix.ParamHTMLAttributes<HTMLParamElement>;
      picture: Nixix.HTMLAttributes<HTMLElement>;
      pre: Nixix.HTMLAttributes<HTMLPreElement>;
      progress: Nixix.ProgressHTMLAttributes<HTMLProgressElement>;
      q: Nixix.QuoteHTMLAttributes<HTMLQuoteElement>;
      rp: Nixix.HTMLAttributes<HTMLElement>;
      rt: Nixix.HTMLAttributes<HTMLElement>;
      ruby: Nixix.HTMLAttributes<HTMLElement>;
      s: Nixix.HTMLAttributes<HTMLElement>;
      samp: Nixix.HTMLAttributes<HTMLElement>;
      slot: Nixix.SlotHTMLAttributes<HTMLSlotElement>;
      script: Nixix.ScriptHTMLAttributes<HTMLScriptElement>;
      section: Nixix.HTMLAttributes<HTMLElement>;
      select: Nixix.SelectHTMLAttributes<HTMLSelectElement>;
      small: Nixix.HTMLAttributes<HTMLElement>;
      source: Nixix.SourceHTMLAttributes<HTMLSourceElement>;
      span: Nixix.HTMLAttributes<HTMLSpanElement>;
      strong: Nixix.HTMLAttributes<HTMLElement>;
      style: Nixix.StyleHTMLAttributes<HTMLStyleElement>;
      sub: Nixix.HTMLAttributes<HTMLElement>;
      summary: Nixix.HTMLAttributes<HTMLElement>;
      sup: Nixix.HTMLAttributes<HTMLElement>;
      table: Nixix.TableHTMLAttributes<HTMLTableElement>;
      template: Nixix.HTMLAttributes<HTMLTemplateElement>;
      tbody: Nixix.HTMLAttributes<HTMLTableSectionElement>;
      td: Nixix.TdHTMLAttributes<HTMLTableDataCellElement>;
      textarea: Nixix.TextareaHTMLAttributes<HTMLTextAreaElement>;
      tfoot: Nixix.HTMLAttributes<HTMLTableSectionElement>;
      th: Nixix.ThHTMLAttributes<HTMLTableHeaderCellElement>;
      thead: Nixix.HTMLAttributes<HTMLTableSectionElement>;
      time: Nixix.TimeHTMLAttributes<HTMLTimeElement>;
      title: Nixix.HTMLAttributes<HTMLTitleElement>;
      tr: Nixix.HTMLAttributes<HTMLTableRowElement>;
      track: Nixix.TrackHTMLAttributes<HTMLTrackElement>;
      u: Nixix.HTMLAttributes<HTMLElement>;
      ul: Nixix.HTMLAttributes<HTMLUListElement>;
      var: Nixix.HTMLAttributes<HTMLElement>;
      video: Nixix.VideoHTMLAttributes<HTMLVideoElement>;
      wbr: Nixix.HTMLAttributes<HTMLElement>;
      webview: Nixix.WebViewHTMLAttributes<HTMLWebViewElement>;
    }

    interface SVGElementTags {
      svg: Nixix.SVGAttributes<SVGSVGElement>;
      animate: Nixix.SVGAttributes<SVGElement>;
      animateMotion: Nixix.SVGAttributes<SVGElement>;
      animateTransform: Nixix.SVGAttributes<SVGElement>;
      circle: Nixix.SVGAttributes<SVGCircleElement>;
      clipPath: Nixix.SVGAttributes<SVGClipPathElement>;
      defs: Nixix.SVGAttributes<SVGDefsElement>;
      desc: Nixix.SVGAttributes<SVGDescElement>;
      ellipse: Nixix.SVGAttributes<SVGEllipseElement>;
      feBlend: Nixix.SVGAttributes<SVGFEBlendElement>;
      feColorMatrix: Nixix.SVGAttributes<SVGFEColorMatrixElement>;
      feComponentTransfer: Nixix.SVGAttributes<SVGFEComponentTransferElement>;
      feComposite: Nixix.SVGAttributes<SVGFECompositeElement>;
      feConvolveMatrix: Nixix.SVGAttributes<SVGFEConvolveMatrixElement>;
      feDiffuseLighting: Nixix.SVGAttributes<SVGFEDiffuseLightingElement>;
      feDisplacementMap: Nixix.SVGAttributes<SVGFEDisplacementMapElement>;
      feDistantLight: Nixix.SVGAttributes<SVGFEDistantLightElement>;
      feDropShadow: Nixix.SVGAttributes<SVGFEDropShadowElement>;
      feFlood: Nixix.SVGAttributes<SVGFEFloodElement>;
      feFuncA: Nixix.SVGAttributes<SVGFEFuncAElement>;
      feFuncB: Nixix.SVGAttributes<SVGFEFuncBElement>;
      feFuncG: Nixix.SVGAttributes<SVGFEFuncGElement>;
      feFuncR: Nixix.SVGAttributes<SVGFEFuncRElement>;
      feGaussianBlur: Nixix.SVGAttributes<SVGFEGaussianBlurElement>;
      feImage: Nixix.SVGAttributes<SVGFEImageElement>;
      feMerge: Nixix.SVGAttributes<SVGFEMergeElement>;
      feMergeNode: Nixix.SVGAttributes<SVGFEMergeNodeElement>;
      feMorphology: Nixix.SVGAttributes<SVGFEMorphologyElement>;
      feOffset: Nixix.SVGAttributes<SVGFEOffsetElement>;
      fePointLight: Nixix.SVGAttributes<SVGFEPointLightElement>;
      feSpecularLighting: Nixix.SVGAttributes<SVGFESpecularLightingElement>;
      feSpotLight: Nixix.SVGAttributes<SVGFESpotLightElement>;
      feTile: Nixix.SVGAttributes<SVGFETileElement>;
      feTurbulence: Nixix.SVGAttributes<SVGFETurbulenceElement>;
      filter: Nixix.SVGAttributes<SVGFilterElement>;
      foreignObject: Nixix.SVGAttributes<SVGForeignObjectElement>;
      g: Nixix.SVGAttributes<SVGGElement>;
      image: Nixix.SVGAttributes<SVGImageElement>;
      line: Nixix.SVGAttributes<SVGLineElement>;
      linearGradient: Nixix.SVGAttributes<SVGLinearGradientElement>;
      marker: Nixix.SVGAttributes<SVGMarkerElement>;
      mask: Nixix.SVGAttributes<SVGMaskElement>;
      metadata: Nixix.SVGAttributes<SVGMetadataElement>;
      mpath: Nixix.SVGAttributes<SVGElement>;
      path: Nixix.SVGAttributes<SVGPathElement>;
      pattern: Nixix.SVGAttributes<SVGPatternElement>;
      polygon: Nixix.SVGAttributes<SVGPolygonElement>;
      polyline: Nixix.SVGAttributes<SVGPolylineElement>;
      radialGradient: Nixix.SVGAttributes<SVGRadialGradientElement>;
      rect: Nixix.SVGAttributes<SVGRectElement>;
      stop: Nixix.SVGAttributes<SVGStopElement>;
      switch: Nixix.SVGAttributes<SVGSwitchElement>;
      symbol: Nixix.SVGAttributes<SVGSymbolElement>;
      text: Nixix.SVGAttributes<SVGTextElement>;
      textPath: Nixix.SVGAttributes<SVGTextPathElement>;
      tspan: Nixix.SVGAttributes<SVGTSpanElement>;
      use: Nixix.SVGAttributes<SVGUseElement>;
      view: Nixix.SVGAttributes<SVGViewElement>;
    }

    interface IntrinsicElements extends HTMLElementTags, SVGElementTags {}
  }
}

type GlobalJSXElementType = JSX.ElementType;
interface GlobalJSXElement extends JSX.Element {}
interface GlobalJSXElementChildrenAttribute
  extends JSX.ElementChildrenAttribute {}
interface GlobalJSXIntrinsicAttributes extends JSX.IntrinsicAttributes {}
interface GlobalJSXIntrinsicElements extends JSX.IntrinsicElements {}
