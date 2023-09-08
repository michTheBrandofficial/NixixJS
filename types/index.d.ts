// Type definitions for NixixJS.
// Definitions by: michTheBrandofficial <https://github.com/michTheBrandofficial>

/// <reference path="global.d.ts" />

import * as CSS from 'csstype';
import { AriaRole } from './aria';
import * as NativeEvents from './eventhandlers';

type Booleanish = boolean | 'true' | 'false';

export = Nixix;
export as namespace Nixix;

declare namespace Nixix {
  /**
   * @deprecated fragment - esbuild provides support for 'fragment' string
   */
  const Fragment: 'fragment';

  type Component = (props?: T) => JSX.Element;

  type NixixNode =
    | NixixElement
    | string
    | number
    | Iterable<NixixNode>
    | boolean
    | null
    | undefined
    | Component
    | CallableFunction
    | SignalObject<string | number | boolean>;

  type ExoticComponent<P> = (props: P) => JSX.Element;
  type RouteExoticComponent<T> = T;

  type ValueType<T> = T | SignalObject<T>;

  interface CSSProperties
    extends CSS.Properties<ValueType<string>, ValueType<number>> {}

  interface DOMAttributes<T> {
    children?: NixixNode;
    innerHTML?: NixixNode;

    // clipboard events
    'on:copy'?: NativeEvents.ClipboardEventHandler<T>;
    'on:copycapture'?: NativeEvents.ClipboardEventHandler<T>;
    'on:cut'?: NativeEvents.ClipboardEventHandler<T>;
    'on:cutcapture'?: NativeEvents.ClipboardEventHandler<T>;
    'on:paste'?: NativeEvents.ClipboardEventHandler<T>;
    'on:pastecapture'?: NativeEvents.ClipboardEventHandler<T>;

    // composition events
    'on:compositionend'?: NativeEvents.CompositionEventHandler<T>;
    'on:compositionendcapture'?: NativeEvents.CompositionEventHandler<T>;
    'on:compositionstart'?: NativeEvents.CompositionEventHandler<T>;
    'on:compositionstartcapture'?: NativeEvents.CompositionEventHandler<T>;
    'on:compositionupdate'?: NativeEvents.CompositionEventHandler<T>;
    'on:compositionupdatecapture'?: NativeEvents.CompositionEventHandler<T>;

    // focus events
    'on:focus'?: NativeEvents.FocusEventHandler<T>;
    'on:focuscapture'?: NativeEvents.FocusEventHandler<T>;
    'on:blur'?: NativeEvents.FocusEventHandler<T>;
    'on:blurcapture'?: NativeEvents.FocusEventHandler<T>;

    // form events
    'on:change'?: NativeEvents.FormEventHandler<T>;
    'on:changecapture'?: NativeEvents.FormEventHandler<T>;
    'on:beforeinput'?: NativeEvents.FormEventHandler<T>;
    'on:beforeinputcapture'?: NativeEvents.FormEventHandler<T>;
    'on:input'?: NativeEvents.FormEventHandler<T>;
    'on:inputcapture'?: NativeEvents.FormEventHandler<T>;
    'on:reset'?: NativeEvents.FormEventHandler<T>;
    'on:resetcapture'?: NativeEvents.FormEventHandler<T>;
    'on:submit'?: NativeEvents.FormEventHandler<T>;
    'on:submitcapture'?: NativeEvents.FormEventHandler<T>;
    'on:invalid'?: NativeEvents.FormEventHandler<T>;
    'on:invalidcapture'?: NativeEvents.FormEventHandler<T>;

    // image events
    'on:load'?: NativeEvents.NixixEventHandler<T>;
    'on:loadcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:error'?: NativeEvents.NixixEventHandler<T>; // also a media event
    'on:errorcapture'?: NativeEvents.NixixEventHandler<T>; // also a media event

    // keyboard events
    'on:keydown'?: NativeEvents.KeyboardEventHandler<T>;
    'on:keydowncapture'?: NativeEvents.KeyboardEventHandler<T>;
    /** @deprecated */
    'on:keypress'?: NativeEvents.KeyboardEventHandler<T>;
    /** @deprecated */
    'on:keypresscapture'?: NativeEvents.KeyboardEventHandler<T>;
    'on:keyup'?: NativeEvents.KeyboardEventHandler<T>;
    'on:keyupcapture'?: NativeEvents.KeyboardEventHandler<T>;

    // media events
    'on:abort'?: NativeEvents.NixixEventHandler<T>;
    'on:abortcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:canplay'?: NativeEvents.NixixEventHandler<T>;
    'on:canplaycapture'?: NativeEvents.NixixEventHandler<T>;
    'on:canplaythrough'?: NativeEvents.NixixEventHandler<T>;
    'on:canplaythroughcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:durationchange'?: NativeEvents.NixixEventHandler<T>;
    'on:durationchangecapture'?: NativeEvents.NixixEventHandler<T>;
    'on:emptied'?: NativeEvents.NixixEventHandler<T>;
    'on:emptiedcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:encrypted'?: NativeEvents.NixixEventHandler<T>;
    'on:encryptedcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:ended'?: NativeEvents.NixixEventHandler<T>;
    'on:endedcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:loadeddata'?: NativeEvents.NixixEventHandler<T>;
    'on:loadeddatacapture'?: NativeEvents.NixixEventHandler<T>;
    'on:loadedmetadata'?: NativeEvents.NixixEventHandler<T>;
    'on:loadedmetadatacapture'?: NativeEvents.NixixEventHandler<T>;
    'on:loadstart'?: NativeEvents.NixixEventHandler<T>;
    'on:loadstartcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:pause'?: NativeEvents.NixixEventHandler<T>;
    'on:pausecapture'?: NativeEvents.NixixEventHandler<T>;
    'on:play'?: NativeEvents.NixixEventHandler<T>;
    'on:playcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:playing'?: NativeEvents.NixixEventHandler<T>;
    'on:playingcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:progress'?: NativeEvents.NixixEventHandler<T>;
    'on:progresscapture'?: NativeEvents.NixixEventHandler<T>;
    'on:ratechange'?: NativeEvents.NixixEventHandler<T>;
    'on:ratechangecapture'?: NativeEvents.NixixEventHandler<T>;
    'on:resize'?: NativeEvents.NixixEventHandler<T>;
    'on:resizecapture'?: NativeEvents.NixixEventHandler<T>;
    'on:seeked'?: NativeEvents.NixixEventHandler<T>;
    'on:seekedcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:seeking'?: NativeEvents.NixixEventHandler<T>;
    'on:seekingcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:stalled'?: NativeEvents.NixixEventHandler<T>;
    'on:stalledcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:suspend'?: NativeEvents.NixixEventHandler<T>;
    'on:suspendcapture'?: NativeEvents.NixixEventHandler<T>;
    'on:timeupdate'?: NativeEvents.NixixEventHandler<T>;
    'on:timeupdatecapture'?: NativeEvents.NixixEventHandler<T>;
    'on:volumechange'?: NativeEvents.NixixEventHandler<T>;
    'on:volumechangecapture'?: NativeEvents.NixixEventHandler<T>;
    'on:waiting'?: NativeEvents.NixixEventHandler<T>;
    'on:waitingcapture'?: NativeEvents.NixixEventHandler<T>;

    // mouseevents
    'on:auxclick'?: NativeEvents.MouseEventHandler<T>;
    'on:auxclickcapture'?: NativeEvents.MouseEventHandler<T>;
    'on:click'?: NativeEvents.MouseEventHandler<T>;
    'on:clickcapture'?: NativeEvents.MouseEventHandler<T>;
    'on:contextmenu'?: NativeEvents.MouseEventHandler<T>;
    'on:contextmenucapture'?: NativeEvents.MouseEventHandler<T>;
    'on:doubleclick'?: NativeEvents.MouseEventHandler<T>;
    'on:doubleclickcapture'?: NativeEvents.MouseEventHandler<T>;
    'on:drag'?: NativeEvents.DragEventHandler<T>;
    'on:dragcapture'?: NativeEvents.DragEventHandler<T>;
    'on:dragend'?: NativeEvents.DragEventHandler<T>;
    'on:dragendcapture'?: NativeEvents.DragEventHandler<T>;
    'on:dragenter'?: NativeEvents.DragEventHandler<T>;
    'on:dragentercapture'?: NativeEvents.DragEventHandler<T>;
    'on:dragexit'?: NativeEvents.DragEventHandler<T>;
    'on:dragexitcapture'?: NativeEvents.DragEventHandler<T>;
    'on:dragleave'?: NativeEvents.DragEventHandler<T>;
    'on:dragleavecapture'?: NativeEvents.DragEventHandler<T>;
    'on:dragover'?: NativeEvents.DragEventHandler<T>;
    'on:dragovercapture'?: NativeEvents.DragEventHandler<T>;
    'on:dragstart'?: NativeEvents.DragEventHandler<T>;
    'on:dragstartcapture'?: NativeEvents.DragEventHandler<T>;
    'on:drop'?: NativeEvents.DragEventHandler<T>;
    'on:dropcapture'?: NativeEvents.DragEventHandler<T>;
    'on:mousedown'?: NativeEvents.MouseEventHandler<T>;
    'on:mousedowncapture'?: NativeEvents.MouseEventHandler<T>;
    'on:mouseenter'?: NativeEvents.MouseEventHandler<T>;
    'on:mouseleave'?: NativeEvents.MouseEventHandler<T>;
    'on:mousemove'?: NativeEvents.MouseEventHandler<T>;
    'on:mousemovecapture'?: NativeEvents.MouseEventHandler<T>;
    'on:mouseout'?: NativeEvents.MouseEventHandler<T>;
    'on:mouseoutcapture'?: NativeEvents.MouseEventHandler<T>;
    'on:mouseover'?: NativeEvents.MouseEventHandler<T>;
    'on:mouseovercapture'?: NativeEvents.MouseEventHandler<T>;
    'on:mouseup'?: NativeEvents.MouseEventHandler<T>;
    'on:mouseupcapture'?: NativeEvents.MouseEventHandler<T>;

    // selection: events
    'on:select'?: NativeEvents.NixixEventHandler<T>;
    'on:selectcapture'?: NativeEvents.NixixEventHandler<T>;

    // touch events
    'on:touchcancel'?: NativeEvents.TouchEventHandler<T>;
    'on:touchcancelcapture'?: NativeEvents.TouchEventHandler<T>;
    'on:touchend'?: NativeEvents.TouchEventHandler<T>;
    'on:touchendcapture'?: NativeEvents.TouchEventHandler<T>;
    'on:touchmove'?: NativeEvents.TouchEventHandler<T>;
    'on:touchmovecapture'?: NativeEvents.TouchEventHandler<T>;
    'on:touchstart'?: NativeEvents.TouchEventHandler<T>;
    'on:touchstartcapture'?: NativeEvents.TouchEventHandler<T>;

    // pointer events
    'on:pointerdown'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerdowncapture'?: NativeEvents.MouseEventHandler<T>;
    'on:pointermove'?: NativeEvents.MouseEventHandler<T>;
    'on:pointermovecapture'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerup'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerupcapture'?: NativeEvents.MouseEventHandler<T>;
    'on:pointercancel'?: NativeEvents.MouseEventHandler<T>;
    'on:pointercancelcapture'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerenter'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerentercapture'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerleave'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerleavecapture'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerover'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerovercapture'?: NativeEvents.MouseEventHandler<T>;
    'on:pointerout'?: NativeEvents.MouseEventHandler<T>;
    'on:pointeroutcapture'?: NativeEvents.MouseEventHandler<T>;
    'on:gotpointercapture'?: NativeEvents.MouseEventHandler<T>;
    'on:gotpointercapturecapture'?: NativeEvents.MouseEventHandler<T>;
    'on:lostpointercapture'?: NativeEvents.MouseEventHandler<T>;
    'on:lostpointercapturecapture'?: NativeEvents.MouseEventHandler<T>;

    // ui events
    'on:scroll'?: NativeEvents.UIEventHandler<T>;
    'on:scrollcapture'?: NativeEvents.UIEventHandler<T>;

    // wheel events
    'on:wheel'?: NativeEvents.WheelEventHandler<T>;
    'on:wheelcapture'?: NativeEvents.WheelEventHandler<T>;

    // animation events
    'on:animationstart'?: NativeEvents.AnimationEventHandler<T>;
    'on:animationstartcapture'?: NativeEvents.AnimationEventHandler<T>;
    'on:animationend'?: NativeEvents.AnimationEventHandler<T>;
    'on:animationendcapture'?: NativeEvents.AnimationEventHandler<T>;
    'on:animationiteration'?: NativeEvents.AnimationEventHandler<T>;
    'on:animationiterationcapture'?: NativeEvents.AnimationEventHandler<T>;

    // transition events
    'on:transitionend'?: NativeEvents.TransitionEventHandler<T>;
    'on:transitionendcapture'?: NativeEvents.TransitionEventHandler<T>;
  }

  interface NixixAttributes<T> {
    'bind:ref'?: MutableRefObject<T>;
  }

  interface AriaAttributes {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    'aria:activedescendant'?: ValueType<string>;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    'aria:atomic'?: ValueType<Booleanish>;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    'aria:autocomplete'?: ValueType<'none' | 'inline' | 'list' | 'both'>;
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    'aria:busy'?: ValueType<Booleanish>;
    /**
     * Indicates the current "checked" Signal of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed @see aria-selected.
     */
    'aria:checked'?: ValueType<boolean | 'false' | 'mixed' | 'true'>;
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    'aria:colcount'?: ValueType<number>;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    'aria:colindex'?: ValueType<number>;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    'aria:colspan'?: ValueType<number>;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    'aria:controls'?: ValueType<string>;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    'aria:current'?: ValueType<
      Booleanish | 'page' | 'step' | 'location' | 'date' | 'time'
    >;
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    'aria:describedby'?: ValueType<string>;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    'aria:details'?: ValueType<string>;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    'aria:disabled'?: ValueType<Booleanish>;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    'aria:dropeffect'?: ValueType<
      'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
    >;
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    'aria:errormessage'?: ValueType<string>;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    'aria:expanded'?: ValueType<Booleanish>;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    'aria:flowto'?: ValueType<string>;
    /**
     * Indicates an element's "grabbed" Signal in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    'aria:grabbed'?: ValueType<Booleanish>;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    'aria:haspopup'?: ValueType<
      Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
    >;
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    'aria:hidden'?: ValueType<Booleanish>;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    'aria:invalid'?: Booleanish | 'grammar' | 'spelling';
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    'aria:keyshortcuts'?: ValueType<string>;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    'aria:label'?: ValueType<string>;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    'aria:labelledby'?: ValueType<string>;
    /** Defines the hierarchical level of an element within a structure. */
    'aria:level'?: ValueType<number>;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    'aria:live'?: ValueType<'off' | 'assertive' | 'polite'>;
    /** Indicates whether an element is modal when displayed. */
    'aria:modal'?: ValueType<Booleanish>;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    'aria:multiline'?: ValueType<Booleanish>;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    'aria:multiselectable'?: ValueType<Booleanish>;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    'aria:orientation'?: 'horizontal' | 'vertical';
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    'aria:owns'?: ValueType<string>;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    'aria:placeholder'?: ValueType<string>;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    'aria:posinset'?: ValueType<number>;
    /**
     * Indicates the current "pressed" Signal of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    'aria:pressed'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    'aria:readonly'?: ValueType<Booleanish>;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    'aria:relevant'?:
      | 'additions'
      | 'additions removals'
      | 'additions text'
      | 'all'
      | 'removals'
      | 'removals additions'
      | 'removals text'
      | 'text'
      | 'text additions'
      | 'text removals';
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria:required'?: ValueType<Booleanish>;
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria:roledescription'?: ValueType<string>;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    'aria:rowcount'?: ValueType<number>;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria:rowindex'?: ValueType<number>;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    'aria:rowspan'?: ValueType<number>;
    /**
     * Indicates the current "selected" Signal of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    'aria:selected'?: ValueType<Booleanish>;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    'aria:setsize'?: ValueType<number>;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    'aria:sort'?: 'none' | 'ascending' | 'descending' | 'other';
    /** Defines the maximum allowed value for a range widget. */
    'aria:valuemax'?: ValueType<number>;
    /** Defines the minimum allowed value for a range widget. */
    'aria:valuemin'?: ValueType<number>;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    'aria:valuenow'?: ValueType<number>;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    'aria:valuetext'?: ValueType<string>;
  }

  interface HTMLAttributes<T>
    extends DOMAttributes<T>,
      AriaAttributes,
      NixixAttributes<T> {
    // Standard HTML Attributes
    accesskey?: ValueType<string>;
    autofocus?: ValueType<boolean>;
    className?: ValueType<string>;
    contenteditable?: boolean | 'true' | 'false' | 'inherit';
    contextmenu?: ValueType<string>;
    dir?: ValueType<string>;
    draggable?: boolean | 'true' | 'false';
    enterkeyhint?:
      | 'enter'
      | 'done'
      | 'go'
      | 'next'
      | 'previous'
      | 'search'
      | 'send';
    hidden?: ValueType<boolean>;
    id?: ValueType<string>;
    lang?: ValueType<string>;
    part?: ValueType<string>;
    placeholder?: ValueType<string>;
    slot?: ValueType<string>;
    spellcheck?: boolean | 'true' | 'false';
    style?: CSSProperties;
    tabindex?: ValueType<number>;
    title?: ValueType<string>;
    translate?: 'yes' | 'no' | '';
    inert?: ValueType<boolean>;

    // Unknown
    radiogroup?: ValueType<string>; // <command>, <menuitem>

    // WAI-ARIA
    role?: AriaRole;

    // RDFa Attributes
    about?: ValueType<string>;
    datatype?: ValueType<string>;
    inlist?: any;
    prefix?: ValueType<string>;
    property?: ValueType<string>;
    resource?: ValueType<string>;
    typeof?: ValueType<string>;
    vocab?: ValueType<string>;

    // Non-standard Attributes
    autocapitalize?: ValueType<string>;
    autocorrect?: ValueType<string>;
    autosave?: ValueType<string>;
    color?: CSSProperties['color'];
    itemprop?: ValueType<string>;
    itemscope?: ValueType<boolean>;
    itemtype?: ValueType<string>;
    itemid?: ValueType<string>;
    itemref?: ValueType<string>;
    results?: ValueType<number>;
    security?: ValueType<string>;
    unselectable?: 'on' | 'off';

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputmode?:
      | 'none'
      | 'text'
      | 'tel'
      | 'url'
      | 'email'
      | 'numeric'
      | 'decimal'
      | 'search';
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: ValueType<string>;
  }

  type ReferrerPolicy = ValueType<
    | ''
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  >;

  type HTMLAttributeAnchorTarget = ValueType<
    '_self' | '_blank' | '_parent' | '_top' | (string & {})
  >;

  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: any;
    href?: ValueType<string>;
    hreflang?: ValueType<string>;
    media?: ValueType<string>;
    ping?: ValueType<string>;
    rel?: ValueType<string>;
    target?: '_self' | '_blank' | '_parent' | '_top';
    type?: ValueType<string>;
    referrerpolicy?: ReferrerPolicy;
  }

  interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}

  interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: ValueType<string>;
    coords?: ValueType<string>;
    download?: ValueType<string>;
    href?: ValueType<string>;
    hreflang?: ValueType<string>;
    media?: ValueType<string>;
    referrerpolicy?: ReferrerPolicy;
    rel?: ValueType<string>;
    shape?: ValueType<string>;
    target?: ValueType<string>;
  }

  interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: ValueType<string>;
    target?: ValueType<string>;
  }

  interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: ValueType<string>;
  }

  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: ValueType<boolean>;
    form?: ValueType<string>;
    formaction?: ValueType<string>;
    formenctype?: ValueType<string>;
    formmethod?: ValueType<string>;
    formnovalidate?: ValueType<boolean>;
    formtarget?: ValueType<string>;
    name?: ValueType<string>;
    type?: ValueType<'submit' | 'reset' | 'button'>;
    value?: ValueType<string | string[] | number>;
  }

  interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: ValueType<number | string>;
    width?: ValueType<number | string>;
  }

  interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: ValueType<number>;
    width?: ValueType<number | string>;
  }

  interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: ValueType<number>;
  }

  interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: ValueType<string | ReadonlyArray<string> | number | undefined>;
  }

  interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: ValueType<boolean | undefined>;
    'on:toggle'?: NativeEvents.NixixEventHandler<T>;
  }

  interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: ValueType<string | undefined>;
    datetime?: ValueType<string | undefined>;
  }

  interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: ValueType<boolean | undefined>;
    'on:cancel'?: NativeEvents.NixixEventHandler<T>;
    'on:close'?: NativeEvents.NixixEventHandler<T>;
  }

  interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: ValueType<number | string | undefined>;
    src?: ValueType<string | undefined>;
    type?: ValueType<string | undefined>;
    width?: ValueType<number | string | undefined>;
  }

  interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: ValueType<boolean | undefined>;
    form?: ValueType<string | undefined>;
    name?: ValueType<string | undefined>;
  }

  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptcharset?: ValueType<string>;
    action?: ValueType<string>;
    autocomplete?: ValueType<string>;
    enctype?: ValueType<string>;
    method?: ValueType<string>;
    name?: ValueType<string>;
    novalidate?: ValueType<boolean>;
    target?: ValueType<string>;
    rel?: ValueType<string>;
  }

  interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: ValueType<string | undefined>;
  }

  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allow?: ValueType<string>;
    allowfullscreen?: ValueType<boolean>;
    allowtransparency?: ValueType<boolean>;
    /** @deprecated */
    frameborder?: ValueType<number | string>;
    height?: ValueType<number | string>;
    loading?: ValueType<'eager' | 'lazy'>;
    /** @deprecated */
    marginheight?: ValueType<number>;
    /** @deprecated */
    marginwidth?: ValueType<number>;
    name?: ValueType<string>;
    referrerpolicy?: ReferrerPolicy;
    sandbox?: ValueType<string>;
    /** @deprecated */
    scrolling?: ValueType<string>;
    seamless?: ValueType<boolean>;
    src?: ValueType<string>;
    srcdoc?: ValueType<string>;
    width?: ValueType<number | string>;
  }

  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: ValueType<string | undefined>;
    crossorigin?: ValueType<
      ValueType<'anonymous' | 'use-credentials' | '' | undefined>
    >;
    decoding?: ValueType<'async' | 'auto' | 'sync' | undefined>;
    height?: ValueType<number | string | undefined>;
    loading?: ValueType<'eager' | 'lazy' | undefined>;
    referrerpolicy?: ReferrerPolicy | undefined;
    sizes?: ValueType<string | undefined>;
    src?: ValueType<string | undefined>;
    srcset?: ValueType<string | undefined>;
    usemap?: ValueType<string | undefined>;
    width?: ValueType<number | string | undefined>;
  }

  interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: ValueType<string | undefined>;
    datetime?: ValueType<string | undefined>;
  }

  type HTMLInputTypeAttribute = ValueType<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | (string & {})
  >;

  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: ValueType<string>;
    alt?: ValueType<string>;
    autocomplete?: ValueType<string>;
    capture?: ValueType<boolean | 'user' | 'environment'>; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: ValueType<boolean>;
    crossorigin?: ValueType<string>;
    disabled?: ValueType<boolean>;
    form?: ValueType<string>;
    formaction?: ValueType<string>;
    formenctype?: ValueType<string>;
    formmethod?: ValueType<string>;
    formnovalidate?: ValueType<boolean>;
    formtarget?: ValueType<string>;
    height?: ValueType<number | string>;
    list?: ValueType<string>;
    max?: ValueType<number | string>;
    maxlength?: ValueType<number>;
    min?: ValueType<number | string>;
    minlength?: ValueType<number>;
    multiple?: ValueType<boolean>;
    name?: ValueType<string>;
    pattern?: ValueType<string>;
    placeholder?: ValueType<string>;
    readonly?: ValueType<boolean>;
    required?: ValueType<boolean>;
    size?: ValueType<number>;
    src?: ValueType<string>;
    step?: ValueType<number | string>;
    type?: HTMLInputTypeAttribute;
    value?: any;
    width?: ValueType<number | string>;
    'on:change'?: NativeEvents.ChangeEventHandler<T>;
  }

  interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    autofocus?: ValueType<boolean | undefined>;
    challenge?: ValueType<string | undefined>;
    disabled?: ValueType<boolean | undefined>;
    form?: ValueType<string | undefined>;
    keytype?: ValueType<string | undefined>;
    keyparams?: ValueType<string | undefined>;
    name?: ValueType<string | undefined>;
  }

  interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: ValueType<string | undefined>;
    for?: ValueType<string | undefined>;
  }

  interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: ValueType<string | ReadonlyArray<string> | number | undefined>;
  }

  interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: ValueType<string | undefined>;
    crossorigin?: ValueType<
      ValueType<'anonymous' | 'use-credentials' | '' | undefined>
    >;
    href?: ValueType<string | undefined>;
    'href-lang'?: ValueType<string | undefined>;
    integrity?: ValueType<string | undefined>;
    media?: ValueType<string | undefined>;
    imagesrcset?: ValueType<string | undefined>;
    imagesizes?: ValueType<string | undefined>;
    referrerpolicy?: ReferrerPolicy | undefined;
    rel?: ValueType<string | undefined>;
    sizes?: ValueType<string | undefined>;
    type?: ValueType<string | undefined>;
    charset?: ValueType<string | undefined>;
  }

  interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: ValueType<string | undefined>;
  }

  interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: ValueType<string | undefined>;
  }

  interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoplay?: ValueType<boolean | undefined>;
    controls?: ValueType<boolean | undefined>;
    controlslist?: ValueType<string | undefined>;
    crossorigin?: ValueType<'anonymous' | 'use-credentials' | '' | undefined>;
    loop?: ValueType<boolean | undefined>;
    mediagroup?: ValueType<string | undefined>;
    muted?: ValueType<boolean | undefined>;
    playsinline?: ValueType<boolean | undefined>;
    preload?: ValueType<string | undefined>;
    src?: ValueType<string | undefined>;
  }

  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charset?: ValueType<string>;
    content?: ValueType<string>;
    httpequiv?: ValueType<string>;
    name?: ValueType<string>;
    media?: ValueType<string>;
  }

  interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: ValueType<string>;
    high?: ValueType<number>;
    low?: ValueType<number>;
    max?: ValueType<number | string>;
    min?: ValueType<number | string>;
    optimum?: ValueType<number>;
    value?: ValueType<string | string[] | number>;
  }

  interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: ValueType<string>;
  }

  interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classid?: ValueType<string>;
    data?: ValueType<string>;
    form?: ValueType<string>;
    height?: ValueType<number | string>;
    name?: ValueType<string>;
    type?: ValueType<string>;
    usemap?: ValueType<string>;
    width?: ValueType<number | string>;
    wmode?: ValueType<string>;
  }

  interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: ValueType<boolean>;
    start?: ValueType<number>;
    type?: ValueType<'1' | 'a' | 'A' | 'i' | 'I'>;
  }

  interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: ValueType<boolean>;
    label?: ValueType<string>;
  }

  interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: ValueType<boolean>;
    label?: ValueType<string>;
    selected?: ValueType<boolean>;
    value?: any;
  }

  interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: ValueType<string>;
    for?: ValueType<string>;
    name?: ValueType<string>;
  }

  interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: ValueType<string>;
    value?: ValueType<string | string[] | number>;
  }

  interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: ValueType<number | string>;
    value?: ValueType<string | string[] | number>;
  }

  interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: ValueType<string>;
  }

  interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: ValueType<boolean>;
    /** @deprecated */
    charset?: ValueType<string>;
    crossorigin?: ValueType<string>;
    defer?: ValueType<boolean>;
    integrity?: ValueType<string>;
    nomodule?: ValueType<boolean>;
    nonce?: ValueType<string>;
    referrerpolicy?: ReferrerPolicy;
    src?: ValueType<string>;
    type?: ValueType<string>;
  }

  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?: ValueType<string>;
    disabled?: ValueType<boolean>;
    form?: ValueType<string>;
    multiple?: ValueType<boolean>;
    name?: ValueType<string>;
    required?: ValueType<boolean>;
    size?: ValueType<number>;
    value?: any;
  }

  interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: ValueType<number | string>;
    media?: ValueType<string>;
    sizes?: ValueType<string>;
    src?: ValueType<string>;
    srcset?: ValueType<string>;
    type?: ValueType<string>;
    width?: ValueType<number | string>;
  }

  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: ValueType<string>;
    nonce?: ValueType<string>;
    scoped?: ValueType<boolean>;
    type?: ValueType<string>;
  }

  interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: ValueType<'left' | 'center' | 'right'>;
    bgcolor?: ValueType<string>;
    border?: ValueType<number>;
    cellpadding?: ValueType<number | string>;
    cellspacing?: ValueType<number | string>;
    frame?: ValueType<boolean>;
    rules?: ValueType<'none' | 'groups' | 'rows' | 'columns' | 'all'>;
    summary?: ValueType<string>;
    width?: ValueType<number | string>;
  }

  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?: ValueType<string>;
    cols?: ValueType<number>;
    dirname?: ValueType<string>;
    disabled?: ValueType<boolean>;
    form?: ValueType<string>;
    maxlength?: ValueType<number>;
    minlength?: ValueType<number>;
    name?: ValueType<string>;
    placeholder?: ValueType<string>;
    readonly?: ValueType<boolean>;
    required?: ValueType<boolean>;
    rows?: ValueType<number>;
    value?: ValueType<string | string[] | number>;
    wrap?: ValueType<string>;
  }

  interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: ValueType<'left' | 'center' | 'right'> | 'justify' | 'char';
    colspan?: ValueType<number>;
    headers?: ValueType<string>;
    rowspan?: ValueType<number>;
    scope?: ValueType<string>;
    abbr?: ValueType<string>;
    height?: ValueType<number | string>;
    width?: ValueType<number | string>;
    valign?: 'top' | 'middle' | 'bottom' | 'baseline';
  }

  interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    align?: ValueType<'left' | 'center' | 'right'> | 'justify' | 'char';
    colspan?: ValueType<number>;
    headers?: ValueType<string>;
    rowspan?: ValueType<number>;
    scope?: ValueType<string>;
    abbr?: ValueType<string>;
  }

  interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    datetime?: ValueType<string>;
  }

  interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: ValueType<boolean>;
    kind?: ValueType<string>;
    label?: ValueType<string>;
    src?: ValueType<string>;
    srclang?: ValueType<string>;
  }

  interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: ValueType<number | string>;
    playsinline?: ValueType<boolean>;
    poster?: ValueType<string>;
    width?: ValueType<number | string>;
    disablepictureinpicture?: ValueType<boolean>;
    disableremoteplayback?: ValueType<boolean>;
  }

  interface SVGAttributes<T>
    extends AriaAttributes,
      DOMAttributes<T>,
      NixixAttributes<T> {
    // Attributes which also defined in HTMLAttributes
    className?: string | undefined | null;
    class?: string | undefined | null;
    color?: CSSProperties['color'];
    height?: number | string | undefined | null;
    id?: string | undefined | null;
    lang?: string | undefined | null;
    max?: number | string | undefined | null;
    media?: string | undefined | null;
    method?: string | undefined | null;
    min?: number | string | undefined | null;
    name?: string | undefined | null;
    style?: HtmlHTMLAttributes<SVGSVGElement>['style'];
    target?: string | undefined | null;
    type?: string | undefined | null;
    width?: number | string | undefined | null;

    // Other HTML properties supported by SVG elements in browsers
    role?: AriaRole | undefined | null;
    tabindex?: number | undefined | null;
    crossorigin?: ValueType<'anonymous' | 'use-credentials' | '' | undefined>;

    // SVG Specific attributes
    'accent-height'?: number | string | undefined | null;
    accumulate?: 'none' | 'sum' | undefined | null;
    additive?: 'replace' | 'sum' | undefined | null;
    'alignment-baseline'?:
      | 'auto'
      | 'baseline'
      | 'before-edge'
      | 'text-before-edge'
      | 'middle'
      | 'central'
      | 'after-edge'
      | 'text-after-edge'
      | 'ideographic'
      | 'alphabetic'
      | 'hanging'
      | 'mathematical'
      | 'inherit'
      | undefined
      | null;
    allowReorder?: 'no' | 'yes' | undefined | null;
    alphabetic?: number | string | undefined | null;
    amplitude?: number | string | undefined | null;
    'arabic-form'?:
      | 'initial'
      | 'medial'
      | 'terminal'
      | 'isolated'
      | undefined
      | null;
    ascent?: number | string | undefined | null;
    attributeName?: string | undefined | null;
    attributeType?: string | undefined | null;
    autoReverse?: number | string | undefined | null;
    azimuth?: number | string | undefined | null;
    baseFrequency?: number | string | undefined | null;
    'baseline-shift'?: number | string | undefined | null;
    baseProfile?: number | string | undefined | null;
    bbox?: number | string | undefined | null;
    begin?: number | string | undefined | null;
    bias?: number | string | undefined | null;
    by?: number | string | undefined | null;
    calcMode?: number | string | undefined | null;
    'cap-height'?: number | string | undefined | null;
    clip?: number | string | undefined | null;
    'clip-path'?: string | undefined | null;
    clipPathUnits?: number | string | undefined | null;
    'clip-rule'?: number | string | undefined | null;
    'color-interpolation'?: CSSProperties['colorInterpolation'];
    'color-interpolation-filters'?:
      | 'auto'
      | 'sRGB'
      | 'linearRGB'
      | 'inherit'
      | undefined
      | null;
    'color-profile'?: number | string | undefined | null;
    'color-rendering'?: CSSProperties['colorRendering'];
    contentScriptType?: number | string | undefined | null;
    contentStyleType?: number | string | undefined | null;
    cursor?: number | string | undefined | null;
    cx?: number | string | undefined | null;
    cy?: number | string | undefined | null;
    d?: string | undefined | null;
    decelerate?: number | string | undefined | null;
    descent?: number | string | undefined | null;
    diffuseConstant?: number | string | undefined | null;
    direction?: number | string | undefined | null;
    display?: number | string | undefined | null;
    divisor?: number | string | undefined | null;
    'dominant-baseline'?: number | string | undefined | null;
    dur?: number | string | undefined | null;
    dx?: number | string | undefined | null;
    dy?: number | string | undefined | null;
    edgeMode?: number | string | undefined | null;
    elevation?: number | string | undefined | null;
    'enable-background'?: number | string | undefined | null;
    end?: number | string | undefined | null;
    exponent?: number | string | undefined | null;
    externalResourcesRequired?: number | string | undefined | null;
    fill?: CSSProperties['fill'];
    'fill-opacity'?: CSSProperties['fillOpacity'];
    'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit' | undefined | null;
    filter?: string | undefined | null;
    filterRes?: number | string | undefined | null;
    filterUnits?: number | string | undefined | null;
    'flood-color'?: CSSProperties['floodColor'];
    'flood-opacity'?: number | string | undefined | null;
    focusable?: number | string | undefined | null;
    'font-family'?: CSSProperties['fontFamily'];
    'font-size'?: number | string | undefined | null;
    'font-size-adjust'?: number | string | undefined | null;
    'font-stretch'?: number | string | undefined | null;
    'font-style'?: number | string | undefined | null;
    'font-variant'?: number | string | undefined | null;
    'font-weight'?: number | string | undefined | null;
    format?: number | string | undefined | null;
    from?: number | string | undefined | null;
    fx?: number | string | undefined | null;
    fy?: number | string | undefined | null;
    g1?: number | string | undefined | null;
    g2?: number | string | undefined | null;
    'glyph-name'?: number | string | undefined | null;
    'glyph-orientation-horizontal'?: number | string | undefined | null;
    'glyph-orientation-vertical'?: number | string | undefined | null;
    glyphRef?: number | string | undefined | null;
    gradientTransform?: string | undefined | null;
    gradientUnits?: string | undefined | null;
    hanging?: number | string | undefined | null;
    href?: string | undefined | null;
    'horiz-adv-x'?: number | string | undefined | null;
    'horiz-origin-x'?: number | string | undefined | null;
    ideographic?: number | string | undefined | null;
    'image-rendering'?: number | string | undefined | null;
    in2?: number | string | undefined | null;
    in?: string | undefined | null;
    intercept?: number | string | undefined | null;
    k1?: number | string | undefined | null;
    k2?: number | string | undefined | null;
    k3?: number | string | undefined | null;
    k4?: number | string | undefined | null;
    k?: number | string | undefined | null;
    kernelMatrix?: number | string | undefined | null;
    kernelUnitLength?: number | string | undefined | null;
    kerning?: number | string | undefined | null;
    keyPoints?: number | string | undefined | null;
    keySplines?: number | string | undefined | null;
    keyTimes?: number | string | undefined | null;
    lengthAdjust?: number | string | undefined | null;
    'letter-spacing'?: number | string | undefined | null;
    'lighting-color'?: CSSProperties['lightingColor'];
    limitingConeAngle?: number | string | undefined | null;
    local?: number | string | undefined | null;
    'marker-end'?: string | undefined | null;
    markerHeight?: number | string | undefined | null;
    'marker-mid'?: string | undefined | null;
    'marker-start'?: string | undefined | null;
    markerUnits?: number | string | undefined | null;
    markerWidth?: number | string | undefined | null;
    mask?: string | undefined | null;
    maskContentUnits?: number | string | undefined | null;
    maskUnits?: number | string | undefined | null;
    mathematical?: number | string | undefined | null;
    mode?: number | string | undefined | null;
    numOctaves?: number | string | undefined | null;
    offset?: number | string | undefined | null;
    opacity?: number | string | undefined | null;
    operator?: number | string | undefined | null;
    order?: number | string | undefined | null;
    orient?: number | string | undefined | null;
    orientation?: number | string | undefined | null;
    origin?: number | string | undefined | null;
    overflow?: number | string | undefined | null;
    'overline-position'?: number | string | undefined | null;
    'overline-thickness'?: number | string | undefined | null;
    'paint-order'?: number | string | undefined | null;
    'panose-1'?: number | string | undefined | null;
    path?: string | undefined | null;
    pathLength?: number | string | undefined | null;
    patternContentUnits?: string | undefined | null;
    patternTransform?: number | string | undefined | null;
    patternUnits?: string | undefined | null;
    'pointer-events'?: number | string | undefined | null;
    points?: string | undefined | null;
    pointsAtX?: number | string | undefined | null;
    pointsAtY?: number | string | undefined | null;
    pointsAtZ?: number | string | undefined | null;
    preserveAlpha?: number | string | undefined | null;
    preserveAspectRatio?: string | undefined | null;
    primitiveUnits?: number | string | undefined | null;
    r?: number | string | undefined | null;
    radius?: number | string | undefined | null;
    refX?: number | string | undefined | null;
    refY?: number | string | undefined | null;
    'rendering-intent'?: number | string | undefined | null;
    repeatCount?: number | string | undefined | null;
    repeatDur?: number | string | undefined | null;
    requiredExtensions?: number | string | undefined | null;
    requiredFeatures?: number | string | undefined | null;
    restart?: number | string | undefined | null;
    result?: string | undefined | null;
    rotate?: number | string | undefined | null;
    rx?: number | string | undefined | null;
    ry?: number | string | undefined | null;
    scale?: number | string | undefined | null;
    seed?: number | string | undefined | null;
    'shape-rendering'?: number | string | undefined | null;
    slope?: number | string | undefined | null;
    spacing?: number | string | undefined | null;
    specularConstant?: number | string | undefined | null;
    specularExponent?: number | string | undefined | null;
    speed?: number | string | undefined | null;
    spreadMethod?: string | undefined | null;
    startOffset?: number | string | undefined | null;
    stdDeviation?: number | string | undefined | null;
    stemh?: number | string | undefined | null;
    stemv?: number | string | undefined | null;
    stitchTiles?: number | string | undefined | null;
    'stop-color'?: CSSProperties['stopColor'];
    'stop-opacity'?: number | string | undefined | null;
    'strikethrough-position'?: number | string | undefined | null;
    'strikethrough-thickness'?: number | string | undefined | null;
    string?: number | string | undefined | null;
    stroke?: string | undefined | null;
    'stroke:dasharray'?: string | number | undefined | null;
    'stroke:dashoffset'?: string | number | undefined | null;
    'stroke:linecap'?:
      | 'butt'
      | 'round'
      | 'square'
      | 'inherit'
      | undefined
      | null;
    'stroke:linejoin'?:
      | 'miter'
      | 'round'
      | 'bevel'
      | 'inherit'
      | undefined
      | null;
    'stroke:miterlimit'?: string | undefined | null;
    'stroke:opacity'?: number | string | undefined | null;
    'stroke:width'?: number | string | undefined | null;
    surfaceScale?: number | string | undefined | null;
    systemLanguage?: number | string | undefined | null;
    tableValues?: number | string | undefined | null;
    targetX?: number | string | undefined | null;
    targetY?: number | string | undefined | null;
    'text-anchor'?: string | undefined | null;
    'text-decoration'?: number | string | undefined | null;
    textLength?: number | string | undefined | null;
    'text-rendering'?: number | string | undefined | null;
    to?: number | string | undefined | null;
    transform?: string | undefined | null;
    u1?: number | string | undefined | null;
    u2?: number | string | undefined | null;
    'underline-position'?: number | string | undefined | null;
    'underline-thickness'?: number | string | undefined | null;
    unicode?: number | string | undefined | null;
    'unicode-bidi'?: number | string | undefined | null;
    'unicode-range'?: number | string | undefined | null;
    'units-per-em'?: number | string | undefined | null;
    'v-alphabetic'?: number | string | undefined | null;
    values?: string | undefined | null;
    'vector-effect'?: number | string | undefined | null;
    version?: string | undefined | null;
    'vert-adv-y'?: number | string | undefined | null;
    'vert-origin-x'?: number | string | undefined | null;
    'vert-origin-y'?: number | string | undefined | null;
    'v-hanging'?: number | string | undefined | null;
    'v-ideographic'?: number | string | undefined | null;
    viewBox?: string | undefined | null;
    viewTarget?: number | string | undefined | null;
    visibility?: number | string | undefined | null;
    'v-mathematical'?: number | string | undefined | null;
    widths?: number | string | undefined | null;
    'word-spacing'?: number | string | undefined | null;
    'writing-mode'?: number | string | undefined | null;
    x1?: number | string | undefined | null;
    x2?: number | string | undefined | null;
    x?: number | string | undefined | null;
    xChannelSelector?: string | undefined | null;
    'x-height'?: number | string | undefined | null;
    'xlink:actuate'?: string | undefined | null;
    'xlink:arcrole'?: string | undefined | null;
    'xlink:href'?: string | undefined | null;
    'xlink:role'?: string | undefined | null;
    'xlink:show'?: string | undefined | null;
    'xlink:title'?: string | undefined | null;
    'xlink:type'?: string | undefined | null;
    'xml:base'?: string | undefined | null;
    'xml:lang'?: string | undefined | null;
    xmlns?: string | undefined | null;
    'xmlns:xlink'?: string | undefined | null;
    'xml:space'?: string | undefined | null;
    y1?: number | string | undefined | null;
    y2?: number | string | undefined | null;
    y?: number | string | undefined | null;
    yChannelSelector?: string | undefined | null;
    z?: number | string | undefined | null;
    zoomAndPan?: string | undefined | null;
  }

  interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
    allowfullscreen?: ValueType<boolean>;
    allowpopups?: ValueType<boolean>;
    autosize?: ValueType<boolean>;
    blinkfeatures?: ValueType<string>;
    disableblinkfeatures?: ValueType<string>;
    disableguestresize?: ValueType<boolean>;
    disablewebsecurity?: ValueType<boolean>;
    guestinstance?: ValueType<string>;
    httpreferrer?: ValueType<string>;
    nodeintegration?: ValueType<boolean>;
    partition?: ValueType<string>;
    plugins?: ValueType<boolean>;
    preload?: ValueType<string>;
    src?: ValueType<string>;
    useragent?: ValueType<string>;
    webpreferences?: ValueType<string>;
  }

  type JSXElementConstructor<P> = (props: P) => NixixElement<any, any> | null;

  interface NixixElement<
    P = any,
    T extends string | JSXElementConstructor<any> =
      | string
      | JSXElementConstructor<any>
  > {
    type: T;
    props: P;
    key: null;
  }
}

declare global {
  export namespace JSX {
    interface Element extends Nixix.NixixElement<any, any>, Node {}

    interface IntrinsicAttributes {
      children?: Nixix.NixixNode;
    }

    interface IntrinsicElements {
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

      // SVG
      svg: Nixix.SVGAttributes<SVGSVGElement>;

      animate: Nixix.SVGAttributes<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
      animateMotion: Nixix.SVGAttributes<SVGElement>;
      animateTransform: Nixix.SVGAttributes<SVGElement>; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
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
  }
}
