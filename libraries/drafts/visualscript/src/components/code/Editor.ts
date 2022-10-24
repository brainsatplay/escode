
import { LitElement, css } from 'lit';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

globalThis.MonacoEnvironment = {
	getWorkerUrl: function (moduleId, label) {
		if (label === 'json') {
			return './code/vs/language/json/json.worker.js';
		}
		if (label === 'css' || label === 'scss' || label === 'less') {
			return './code/vs/language/css/css.worker.js';
		}
		if (label === 'html' || label === 'handlebars' || label === 'razor') {
			return './code/vs/language/html/html.worker.js';
		}
		if (label === 'typescript' || label === 'javascript') {
			return './code/vs/language/typescript/ts.worker.js';
		}
		return './code/vs/editor/editor.worker.js';
	}
};

// window.Prism = Prism
// import 'prismjs/components/prism-c';
// import 'prismjs/components/prism-glsl';
// import "prism-themes/themes/prism-vsc-dark-plus.css"


export type CodeEditorProps = {
  value?: string
  onInput?: Function,
  onSave?: Function,
  onReset?: Function,
  onClose?: Function
}

export class CodeEditor extends LitElement {

  /* Monaco CSS */

  static get styles() {
    return css`

    :host {
      width: 100%; 
      height: 100%; 
    }

    :host * {
      box-sizing: border-box;
      
    }

    :host > * {
      overflow: hidden;
    }

    #editorContainer {
       width: 100%; 
       height: 100%;
       overflow: hidden;
    }
    
    .monaco-editor {
      font-family:
        -apple-system,
        BlinkMacSystemFont,
        "Segoe WPC",
        "Segoe UI",
        "HelveticaNeue-Light",
        system-ui,
        "Ubuntu",
        "Droid Sans",
        sans-serif;
      --monaco-monospace-font:
        "SF Mono",
        Monaco,
        Menlo,
        Consolas,
        "Ubuntu Mono",
        "Liberation Mono",
        "DejaVu Sans Mono",
        "Courier New",
        monospace;
    }
    .monaco-menu .monaco-action-bar.vertical .action-item .action-menu-item:focus .action-label {
      stroke-width: 1.2px;
    }
    .monaco-editor.vs-dark .monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .action-label,
    .monaco-editor.hc-black .monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .action-label {
      stroke-width: 1.2px;
    }
    .monaco-hover p {
      margin: 0;
    }
    .monaco-aria-container {
      position: absolute !important;
      top: 0;
      height: 1px;
      width: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
    }
    .monaco-editor.hc-black {
      -ms-high-contrast-adjust: none;
    }
    @media screen and (-ms-high-contrast:active) {
      .monaco-editor.vs .view-overlays .current-line,
      .monaco-editor.vs-dark .view-overlays .current-line {
        border-color: windowtext !important;
        border-left: 0;
        border-right: 0;
      }
      .monaco-editor.vs .cursor,
      .monaco-editor.vs-dark .cursor {
        background-color: windowtext !important;
      }
      .monaco-editor.vs .dnd-target,
      .monaco-editor.vs-dark .dnd-target {
        border-color: windowtext !important;
      }
      .monaco-editor.vs .selected-text,
      .monaco-editor.vs-dark .selected-text {
        background-color: highlight !important;
      }
      .monaco-editor.vs .view-line,
      .monaco-editor.vs-dark .view-line {
        -ms-high-contrast-adjust: none;
      }
      .monaco-editor.vs .view-line span,
      .monaco-editor.vs-dark .view-line span {
        color: windowtext !important;
      }
      .monaco-editor.vs .view-line span.inline-selected-text,
      .monaco-editor.vs-dark .view-line span.inline-selected-text {
        color: highlighttext !important;
      }
      .monaco-editor.vs .view-overlays,
      .monaco-editor.vs-dark .view-overlays {
        -ms-high-contrast-adjust: none;
      }
      .monaco-editor.vs .selectionHighlight,
      .monaco-editor.vs-dark .selectionHighlight,
      .monaco-editor.vs .wordHighlight,
      .monaco-editor.vs-dark .wordHighlight,
      .monaco-editor.vs .wordHighlightStrong,
      .monaco-editor.vs-dark .wordHighlightStrong,
      .monaco-editor.vs .reference-decoration,
      .monaco-editor.vs-dark .reference-decoration {
        border: 2px dotted highlight !important;
        background: transparent !important;
        box-sizing: border-box;
      }
      .monaco-editor.vs .rangeHighlight,
      .monaco-editor.vs-dark .rangeHighlight {
        background: transparent !important;
        border: 1px dotted activeborder !important;
        box-sizing: border-box;
      }
      .monaco-editor.vs .bracket-match,
      .monaco-editor.vs-dark .bracket-match {
        border-color: windowtext !important;
        background: transparent !important;
      }
      .monaco-editor.vs .findMatch,
      .monaco-editor.vs-dark .findMatch,
      .monaco-editor.vs .currentFindMatch,
      .monaco-editor.vs-dark .currentFindMatch {
        border: 2px dotted activeborder !important;
        background: transparent !important;
        box-sizing: border-box;
      }
      .monaco-editor.vs .find-widget,
      .monaco-editor.vs-dark .find-widget {
        border: 1px solid windowtext;
      }
      .monaco-editor.vs .monaco-list .monaco-list-row,
      .monaco-editor.vs-dark .monaco-list .monaco-list-row {
        -ms-high-contrast-adjust: none;
        color: windowtext !important;
      }
      .monaco-editor.vs .monaco-list .monaco-list-row.focused,
      .monaco-editor.vs-dark .monaco-list .monaco-list-row.focused {
        color: highlighttext !important;
        background-color: highlight !important;
      }
      .monaco-editor.vs .monaco-list .monaco-list-row:hover,
      .monaco-editor.vs-dark .monaco-list .monaco-list-row:hover {
        background: transparent !important;
        border: 1px solid highlight;
        box-sizing: border-box;
      }
      .monaco-editor.vs .monaco-scrollable-element > .scrollbar,
      .monaco-editor.vs-dark .monaco-scrollable-element > .scrollbar {
        -ms-high-contrast-adjust: none;
        background: background !important;
        border: 1px solid windowtext;
        box-sizing: border-box;
      }
      .monaco-editor.vs .monaco-scrollable-element > .scrollbar > .slider,
      .monaco-editor.vs-dark .monaco-scrollable-element > .scrollbar > .slider {
        background: windowtext !important;
      }
      .monaco-editor.vs .monaco-scrollable-element > .scrollbar > .slider:hover,
      .monaco-editor.vs-dark .monaco-scrollable-element > .scrollbar > .slider:hover {
        background: highlight !important;
      }
      .monaco-editor.vs .monaco-scrollable-element > .scrollbar > .slider.active,
      .monaco-editor.vs-dark .monaco-scrollable-element > .scrollbar > .slider.active {
        background: highlight !important;
      }
      .monaco-editor.vs .decorationsOverviewRuler,
      .monaco-editor.vs-dark .decorationsOverviewRuler {
        opacity: 0;
      }
      .monaco-editor.vs .minimap,
      .monaco-editor.vs-dark .minimap {
        display: none;
      }
      .monaco-editor.vs .squiggly-d-error,
      .monaco-editor.vs-dark .squiggly-d-error {
        background: transparent !important;
        border-bottom: 4px double #E47777;
      }
      .monaco-editor.vs .squiggly-c-warning,
      .monaco-editor.vs-dark .squiggly-c-warning {
        border-bottom: 4px double #71B771;
      }
      .monaco-editor.vs .squiggly-b-info,
      .monaco-editor.vs-dark .squiggly-b-info {
        border-bottom: 4px double #71B771;
      }
      .monaco-editor.vs .squiggly-a-hint,
      .monaco-editor.vs-dark .squiggly-a-hint {
        border-bottom: 4px double #6c6c6c;
      }
      .monaco-editor.vs .monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .action-label,
      .monaco-editor.vs-dark .monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .action-label {
        -ms-high-contrast-adjust: none;
        color: highlighttext !important;
        background-color: highlight !important;
      }
      .monaco-editor.vs .monaco-menu .monaco-action-bar.vertical .action-menu-item:hover .action-label,
      .monaco-editor.vs-dark .monaco-menu .monaco-action-bar.vertical .action-menu-item:hover .action-label {
        -ms-high-contrast-adjust: none;
        background: transparent !important;
        border: 1px solid highlight;
        box-sizing: border-box;
      }
      .monaco-diff-editor.vs .diffOverviewRuler,
      .monaco-diff-editor.vs-dark .diffOverviewRuler {
        display: none;
      }
      .monaco-editor.vs .line-insert,
      .monaco-editor.vs-dark .line-insert,
      .monaco-editor.vs .line-delete,
      .monaco-editor.vs-dark .line-delete {
        background: transparent !important;
        border: 1px solid highlight !important;
        box-sizing: border-box;
      }
      .monaco-editor.vs .char-insert,
      .monaco-editor.vs-dark .char-insert,
      .monaco-editor.vs .char-delete,
      .monaco-editor.vs-dark .char-delete {
        background: transparent !important;
      }
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.css */
    .monaco-aria-container {
      position: absolute;
      left: -999em;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/widget/media/editor.css */
    ::-ms-clear {
      display: none;
    }
    .monaco-editor .editor-widget input {
      color: inherit;
    }
    .monaco-editor {
      position: relative;
      overflow: visible;
      -webkit-text-size-adjust: 100%;
    }
    .monaco-editor .overflow-guard {
      position: relative;
      overflow: hidden;
    }
    .monaco-editor .view-overlays {
      position: absolute;
      top: 0;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/controller/textAreaHandler.css */
    .monaco-editor .inputarea {
      min-width: 0;
      min-height: 0;
      margin: 0;
      padding: 0;
      position: absolute;
      outline: none !important;
      resize: none;
      border: none;
      overflow: hidden;
      color: transparent;
      background-color: transparent;
    }
    .monaco-editor .inputarea.ime-input {
      z-index: 10;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css */
    .monaco-editor .margin-view-overlays .line-numbers {
      font-variant-numeric: tabular-nums;
      position: absolute;
      text-align: right;
      display: inline-block;
      vertical-align: middle;
      box-sizing: border-box;
      cursor: default;
      height: 100%;
    }
    .monaco-editor .relative-current-line-number {
      text-align: left;
      display: inline-block;
      width: 100%;
    }
    .monaco-editor .margin-view-overlays .line-numbers.lh-odd {
      margin-top: 1px;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/mouseCursor/mouseCursor.css */
    .monaco-mouse-cursor-text {
      cursor: text;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/currentLineHighlight/currentLineHighlight.css */
    .monaco-editor .view-overlays .current-line {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
    }
    .monaco-editor .margin-view-overlays .current-line {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
    }
    .monaco-editor .margin-view-overlays .current-line.current-line-margin.current-line-margin-both {
      border-right: 0;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/decorations/decorations.css */
    .monaco-editor .lines-content .cdr {
      position: absolute;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/scrollbar/media/scrollbars.css */
    .monaco-scrollable-element > .scrollbar > .scra {
      cursor: pointer;
      font-size: 11px !important;
    }
    .monaco-scrollable-element > .visible {
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      transition: opacity 100ms linear;
    }
    .monaco-scrollable-element > .invisible {
      opacity: 0;
      pointer-events: none;
    }
    .monaco-scrollable-element > .invisible.fade {
      transition: opacity 800ms linear;
    }
    .monaco-scrollable-element > .shadow {
      position: absolute;
      display: none;
    }
    .monaco-scrollable-element > .shadow.top {
      display: block;
      top: 0;
      left: 3px;
      height: 3px;
      width: 100%;
    }
    .monaco-scrollable-element > .shadow.left {
      display: block;
      top: 3px;
      left: 0;
      height: 100%;
      width: 3px;
    }
    .monaco-scrollable-element > .shadow.top-left-corner {
      display: block;
      top: 0;
      left: 0;
      height: 3px;
      width: 3px;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/glyphMargin/glyphMargin.css */
    .monaco-editor .glyph-margin {
      position: absolute;
      top: 0;
    }
    .monaco-editor .margin-view-overlays .cgmr {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/indentGuides/indentGuides.css */
    .monaco-editor .lines-content .core-guide {
      position: absolute;
      box-sizing: border-box;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lines/viewLines.css */
    .mtkcontrol {
      color: rgb(255, 255, 255) !important;
      background: rgb(150, 0, 0) !important;
    }
    .monaco-editor.no-user-select .lines-content,
    .monaco-editor.no-user-select .view-line,
    .monaco-editor.no-user-select .view-lines {
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    .monaco-editor .view-lines {
      white-space: nowrap;
    }
    .monaco-editor .view-line {
      position: absolute;
      width: 100%;
    }
    .monaco-editor .mtkz {
      display: inline-block;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css */
    .monaco-editor .lines-decorations {
      position: absolute;
      top: 0;
      background: white;
    }
    .monaco-editor .margin-view-overlays .cldr {
      position: absolute;
      height: 100%;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/marginDecorations/marginDecorations.css */
    .monaco-editor .margin-view-overlays .cmdr {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/minimap/minimap.css */
    .monaco-editor .minimap.slider-mouseover .minimap-slider {
      opacity: 0;
      transition: opacity 100ms linear;
    }
    .monaco-editor .minimap.slider-mouseover:hover .minimap-slider {
      opacity: 1;
    }
    .monaco-editor .minimap.slider-mouseover .minimap-slider.active {
      opacity: 1;
    }
    .monaco-editor .minimap-shadow-hidden {
      position: absolute;
      width: 0;
    }
    .monaco-editor .minimap-shadow-visible {
      position: absolute;
      left: -6px;
      width: 6px;
    }
    .monaco-editor.no-minimap-shadow .minimap-shadow-visible {
      position: absolute;
      left: -1px;
      width: 1px;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/overlayWidgets/overlayWidgets.css */
    .monaco-editor .overlayWidgets {
      position: absolute;
      top: 0;
      left: 0;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/rulers/rulers.css */
    .monaco-editor .view-ruler {
      position: absolute;
      top: 0;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.css */
    .monaco-editor .scroll-decoration {
      position: absolute;
      top: 0;
      left: 0;
      height: 6px;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/selections/selections.css */
    .monaco-editor .lines-content .cslr {
      position: absolute;
    }
    .monaco-editor .top-left-radius {
      border-top-left-radius: 3px;
    }
    .monaco-editor .bottom-left-radius {
      border-bottom-left-radius: 3px;
    }
    .monaco-editor .top-right-radius {
      border-top-right-radius: 3px;
    }
    .monaco-editor .bottom-right-radius {
      border-bottom-right-radius: 3px;
    }
    .monaco-editor.hc-black .top-left-radius {
      border-top-left-radius: 0;
    }
    .monaco-editor.hc-black .bottom-left-radius {
      border-bottom-left-radius: 0;
    }
    .monaco-editor.hc-black .top-right-radius {
      border-top-right-radius: 0;
    }
    .monaco-editor.hc-black .bottom-right-radius {
      border-bottom-right-radius: 0;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewCursors/viewCursors.css */
    .monaco-editor .cursors-layer {
      position: absolute;
      top: 0;
    }
    .monaco-editor .cursors-layer > .cursor {
      position: absolute;
      overflow: hidden;
    }
    .monaco-editor .cursors-layer.cursor-smooth-caret-animation > .cursor {
      transition: all 80ms;
    }
    .monaco-editor .cursors-layer.cursor-block-outline-style > .cursor {
      box-sizing: border-box;
      background: transparent !important;
      border-style: solid;
      border-width: 1px;
    }
    .monaco-editor .cursors-layer.cursor-underline-style > .cursor {
      border-bottom-width: 2px;
      border-bottom-style: solid;
      background: transparent !important;
      box-sizing: border-box;
    }
    .monaco-editor .cursors-layer.cursor-underline-thin-style > .cursor {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      background: transparent !important;
      box-sizing: border-box;
    }
    @keyframes monaco-cursor-smooth {
      0%, 20% {
        opacity: 1;
      }
      60%, 100% {
        opacity: 0;
      }
    }
    @keyframes monaco-cursor-phase {
      0%, 20% {
        opacity: 1;
      }
      90%, 100% {
        opacity: 0;
      }
    }
    @keyframes monaco-cursor-expand {
      0%, 20% {
        transform: scaleY(1);
      }
      80%, 100% {
        transform: scaleY(0);
      }
    }
    .cursor-smooth {
      animation: monaco-cursor-smooth 0.5s ease-in-out 0s 20 alternate;
    }
    .cursor-phase {
      animation: monaco-cursor-phase 0.5s ease-in-out 0s 20 alternate;
    }
    .cursor-expand > .cursor {
      animation: monaco-cursor-expand 0.5s ease-in-out 0s 20 alternate;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffEditor.css */
    .monaco-diff-editor .diffOverview {
      z-index: 9;
    }
    .monaco-diff-editor .diffOverview .diffViewport {
      z-index: 10;
    }
    .monaco-diff-editor.vs .diffOverview {
      background: rgba(0, 0, 0, 0.03);
    }
    .monaco-diff-editor.vs-dark .diffOverview {
      background: rgba(255, 255, 255, 0.01);
    }
    .monaco-scrollable-element.modified-in-monaco-diff-editor.vs .scrollbar {
      background: rgba(0, 0, 0, 0);
    }
    .monaco-scrollable-element.modified-in-monaco-diff-editor.vs-dark .scrollbar {
      background: rgba(0, 0, 0, 0);
    }
    .monaco-scrollable-element.modified-in-monaco-diff-editor.hc-black .scrollbar {
      background: none;
    }
    .monaco-scrollable-element.modified-in-monaco-diff-editor .slider {
      z-index: 10;
    }
    .modified-in-monaco-diff-editor .slider.active {
      background: rgba(171, 171, 171, .4);
    }
    .modified-in-monaco-diff-editor.hc-black .slider.active {
      background: none;
    }
    .monaco-editor .insert-sign,
    .monaco-diff-editor .insert-sign,
    .monaco-editor .delete-sign,
    .monaco-diff-editor .delete-sign {
      font-size: 11px !important;
      opacity: 0.7 !important;
      display: flex !important;
      align-items: center;
    }
    .monaco-editor.hc-black .insert-sign,
    .monaco-diff-editor.hc-black .insert-sign,
    .monaco-editor.hc-black .delete-sign,
    .monaco-diff-editor.hc-black .delete-sign {
      opacity: 1;
    }
    .monaco-editor .inline-deleted-margin-view-zone {
      text-align: right;
    }
    .monaco-editor .inline-added-margin-view-zone {
      text-align: right;
    }
    .monaco-editor .view-zones .view-lines .view-line span {
      display: inline-block;
    }
    .monaco-editor .margin-view-zones .lightbulb-glyph:hover {
      cursor: pointer;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/sash/sash.css */
    :root {
      --sash-size: 4px;
    }
    .monaco-sash {
      position: absolute;
      z-index: 35;
      touch-action: none;
    }
    .monaco-sash.disabled {
      pointer-events: none;
    }
    .monaco-sash.mac.vertical {
      cursor: col-resize;
    }
    .monaco-sash.vertical.minimum {
      cursor: e-resize;
    }
    .monaco-sash.vertical.maximum {
      cursor: w-resize;
    }
    .monaco-sash.mac.horizontal {
      cursor: row-resize;
    }
    .monaco-sash.horizontal.minimum {
      cursor: s-resize;
    }
    .monaco-sash.horizontal.maximum {
      cursor: n-resize;
    }
    .monaco-sash.disabled {
      cursor: default !important;
      pointer-events: none !important;
    }
    .monaco-sash.vertical {
      cursor: ew-resize;
      top: 0;
      width: var(--sash-size);
      height: 100%;
    }
    .monaco-sash.horizontal {
      cursor: ns-resize;
      left: 0;
      width: 100%;
      height: var(--sash-size);
    }
    .monaco-sash:not(.disabled) > .orthogonal-drag-handle {
      content: " ";
      height: calc(var(--sash-size) * 2);
      width: calc(var(--sash-size) * 2);
      z-index: 100;
      display: block;
      cursor: all-scroll;
      position: absolute;
    }
    .monaco-sash.horizontal.orthogonal-edge-north:not(.disabled) > .orthogonal-drag-handle.start,
    .monaco-sash.horizontal.orthogonal-edge-south:not(.disabled) > .orthogonal-drag-handle.end {
      cursor: nwse-resize;
    }
    .monaco-sash.horizontal.orthogonal-edge-north:not(.disabled) > .orthogonal-drag-handle.end,
    .monaco-sash.horizontal.orthogonal-edge-south:not(.disabled) > .orthogonal-drag-handle.start {
      cursor: nesw-resize;
    }
    .monaco-sash.vertical > .orthogonal-drag-handle.start {
      left: calc(var(--sash-size) * -0.5);
      top: calc(var(--sash-size) * -1);
    }
    .monaco-sash.vertical > .orthogonal-drag-handle.end {
      left: calc(var(--sash-size) * -0.5);
      bottom: calc(var(--sash-size) * -1);
    }
    .monaco-sash.horizontal > .orthogonal-drag-handle.start {
      top: calc(var(--sash-size) * -0.5);
      left: calc(var(--sash-size) * -1);
    }
    .monaco-sash.horizontal > .orthogonal-drag-handle.end {
      top: calc(var(--sash-size) * -0.5);
      right: calc(var(--sash-size) * -1);
    }
    .monaco-sash:before {
      content: "";
      pointer-events: none;
      position: absolute;
      width: 100%;
      height: 100%;
      transition: background-color 0.1s ease-out;
      background: transparent;
    }
    .monaco-sash.vertical:before {
      width: var(--sash-hover-size);
      left: calc(50% - (var(--sash-hover-size) / 2));
    }
    .monaco-sash.horizontal:before {
      height: var(--sash-hover-size);
      top: calc(50% - (var(--sash-hover-size) / 2));
    }
    .pointer-events-disabled {
      pointer-events: none !important;
    }
    .monaco-sash.debug {
      background: cyan;
    }
    .monaco-sash.debug.disabled {
      background: rgba(0, 255, 255, 0.2);
    }
    .monaco-sash.debug:not(.disabled) > .orthogonal-drag-handle {
      background: red;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffReview.css */
    .monaco-diff-editor .diff-review-line-number {
      text-align: right;
      display: inline-block;
    }
    .monaco-diff-editor .diff-review {
      position: absolute;
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    .monaco-diff-editor .diff-review-summary {
      padding-left: 10px;
    }
    .monaco-diff-editor .diff-review-shadow {
      position: absolute;
    }
    .monaco-diff-editor .diff-review-row {
      white-space: pre;
    }
    .monaco-diff-editor .diff-review-table {
      display: table;
      min-width: 100%;
    }
    .monaco-diff-editor .diff-review-row {
      display: table-row;
      width: 100%;
    }
    .monaco-diff-editor .diff-review-spacer {
      display: inline-block;
      width: 10px;
      vertical-align: middle;
    }
    .monaco-diff-editor .diff-review-spacer > .codicon {
      font-size: 9px !important;
    }
    .monaco-diff-editor .diff-review-actions {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 2px;
    }
    .monaco-diff-editor .diff-review-actions .action-label {
      width: 16px;
      height: 16px;
      margin: 2px 0;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css */
    .monaco-action-bar {
      white-space: nowrap;
      height: 100%;
    }
    .monaco-action-bar .actions-container {
      display: flex;
      margin: 0 auto;
      padding: 0;
      height: 100%;
      width: 100%;
      align-items: center;
    }
    .monaco-action-bar.vertical .actions-container {
      display: inline-block;
    }
    .monaco-action-bar .action-item {
      display: block;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    }
    .monaco-action-bar .action-item.disabled {
      cursor: default;
    }
    .monaco-action-bar .action-item .icon,
    .monaco-action-bar .action-item .codicon {
      display: block;
    }
    .monaco-action-bar .action-item .codicon {
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
    }
    .monaco-action-bar .action-label {
      font-size: 11px;
      padding: 3px;
      border-radius: 5px;
    }
    .monaco-action-bar .action-item.disabled .action-label,
    .monaco-action-bar .action-item.disabled .action-label::before,
    .monaco-action-bar .action-item.disabled .action-label:hover {
      opacity: 0.4;
    }
    .monaco-action-bar.vertical {
      text-align: left;
    }
    .monaco-action-bar.vertical .action-item {
      display: block;
    }
    .monaco-action-bar.vertical .action-label.separator {
      display: block;
      border-bottom: 1px solid #bbb;
      padding-top: 1px;
      margin-left: .8em;
      margin-right: .8em;
    }
    .monaco-action-bar .action-item .action-label.separator {
      width: 1px;
      height: 16px;
      margin: 5px 4px !important;
      cursor: default;
      min-width: 1px;
      padding: 0;
      background-color: #bbb;
    }
    .secondary-actions .monaco-action-bar .action-label {
      margin-left: 6px;
    }
    .monaco-action-bar .action-item.select-container {
      overflow: hidden;
      flex: 1;
      max-width: 170px;
      min-width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
    .monaco-action-bar .action-item.action-dropdown-item {
      display: flex;
    }
    .monaco-action-bar .action-item.action-dropdown-item > .action-label {
      margin-right: 1px;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.css */
    .context-view {
      position: absolute;
      z-index: 2500;
    }
    .context-view.fixed {
      all: initial;
      font-family: inherit;
      font-size: 13px;
      position: fixed;
      z-index: 2500;
      color: inherit;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon.css */
    @font-face {
      font-family: "codicon";
      font-display: block;
      src: url(./codicon-MO4O4W4B.ttf) format("truetype");
    }
    .codicon[class*=codicon-] {
      font: normal normal normal 16px/1 codicon;
      display: inline-block;
      text-decoration: none;
      text-rendering: auto;
      text-align: center;
      text-transform: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/codicons/codicon/codicon-modifiers.css */
    .codicon-wrench-subaction {
      opacity: 0.5;
    }
    @keyframes codicon-spin {
      100% {
        transform: rotate(360deg);
      }
    }
    .codicon-sync.codicon-modifier-spin,
    .codicon-loading.codicon-modifier-spin,
    .codicon-gear.codicon-modifier-spin,
    .codicon-notebook-state-executing.codicon-modifier-spin {
      animation: codicon-spin 1.5s steps(30) infinite;
    }
    .codicon-modifier-disabled {
      opacity: 0.4;
    }
    .codicon-loading,
    .codicon-tree-item-loading::before {
      animation-duration: 1s !important;
      animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67) !important;
    }
    
    /* node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css */
    .context-view .monaco-menu {
      min-width: 130px;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/standalone/browser/quickInput/standaloneQuickInput.css */
    .quick-input-widget {
      font-size: 13px;
    }
    .quick-input-widget .monaco-highlighted-label .highlight,
    .quick-input-widget .monaco-highlighted-label .highlight {
      color: #0066BF;
    }
    .vs .quick-input-widget .monaco-list-row.focused .monaco-highlighted-label .highlight,
    .vs .quick-input-widget .monaco-list-row.focused .monaco-highlighted-label .highlight {
      color: #9DDDFF;
    }
    .vs-dark .quick-input-widget .monaco-highlighted-label .highlight,
    .vs-dark .quick-input-widget .monaco-highlighted-label .highlight {
      color: #0097fb;
    }
    .hc-black .quick-input-widget .monaco-highlighted-label .highlight,
    .hc-black .quick-input-widget .monaco-highlighted-label .highlight {
      color: #F38518;
    }
    .monaco-keybinding > .monaco-keybinding-key {
      background-color: rgba(221, 221, 221, 0.4);
      border: solid 1px rgba(204, 204, 204, 0.4);
      border-bottom-color: rgba(187, 187, 187, 0.4);
      box-shadow: inset 0 -1px 0 rgba(187, 187, 187, 0.4);
      color: #555;
    }
    .hc-black .monaco-keybinding > .monaco-keybinding-key {
      background-color: transparent;
      border: solid 1px rgb(111, 195, 223);
      box-shadow: none;
      color: #fff;
    }
    .vs-dark .monaco-keybinding > .monaco-keybinding-key {
      background-color: rgba(128, 128, 128, 0.17);
      border: solid 1px rgba(51, 51, 51, 0.6);
      border-bottom-color: rgba(68, 68, 68, 0.6);
      box-shadow: inset 0 -1px 0 rgba(68, 68, 68, 0.6);
      color: #ccc;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/button/button.css */
    .monaco-text-button {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      padding: 4px;
      text-align: center;
      cursor: pointer;
      justify-content: center;
      align-items: center;
    }
    .monaco-text-button:focus {
      outline-offset: 2px !important;
    }
    .monaco-text-button:hover {
      text-decoration: none !important;
    }
    .monaco-button.disabled:focus,
    .monaco-button.disabled {
      opacity: 0.4 !important;
      cursor: default;
    }
    .monaco-text-button > .codicon {
      margin: 0 0.2em;
      color: inherit !important;
    }
    .monaco-button-dropdown {
      display: flex;
      cursor: pointer;
    }
    .monaco-button-dropdown > .monaco-dropdown-button {
      margin-left: 1px;
    }
    .monaco-description-button {
      flex-direction: column;
    }
    .monaco-description-button .monaco-button-label {
      font-weight: 500;
    }
    .monaco-description-button .monaco-button-description {
      font-style: italic;
    }
    .monaco-description-button .monaco-button-label,
    .monaco-description-button .monaco-button-description {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .monaco-description-button .monaco-button-label > .codicon,
    .monaco-description-button .monaco-button-description > .codicon {
      margin: 0 0.2em;
      color: inherit !important;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/countBadge/countBadge.css */
    .monaco-count-badge {
      padding: 3px 6px;
      border-radius: 11px;
      font-size: 11px;
      min-width: 18px;
      min-height: 18px;
      line-height: 11px;
      font-weight: normal;
      text-align: center;
      display: inline-block;
      box-sizing: border-box;
    }
    .monaco-count-badge.long {
      padding: 2px 3px;
      border-radius: 2px;
      min-height: auto;
      line-height: normal;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/progressbar/progressbar.css */
    .monaco-progress-container {
      width: 100%;
      height: 5px;
      overflow: hidden;
    }
    .monaco-progress-container .progress-bit {
      width: 2%;
      height: 5px;
      position: absolute;
      left: 0;
      display: none;
    }
    .monaco-progress-container.active .progress-bit {
      display: inherit;
    }
    .monaco-progress-container.discrete .progress-bit {
      left: 0;
      transition: width 100ms linear;
    }
    .monaco-progress-container.discrete.done .progress-bit {
      width: 100%;
    }
    .monaco-progress-container.infinite .progress-bit {
      animation-name: progress;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      transform: translate3d(0px, 0px, 0px);
      animation-timing-function: linear;
    }
    .monaco-progress-container.infinite.infinite-long-running .progress-bit {
      animation-timing-function: steps(100);
    }
    @keyframes progress {
      from {
        transform: translateX(0%) scaleX(1);
      }
      50% {
        transform: translateX(2500%) scaleX(3);
      }
      to {
        transform: translateX(4900%) scaleX(1);
      }
    }
    
    /* node_modules/monaco-editor/esm/vs/base/parts/quickinput/browser/media/quickInput.css */
    .quick-input-widget {
      position: absolute;
      width: 600px;
      z-index: 2000;
      padding: 0 1px 1px 1px;
      left: 50%;
      margin-left: -300px;
    }
    .quick-input-titlebar {
      display: flex;
      align-items: center;
    }
    .quick-input-left-action-bar {
      display: flex;
      margin-left: 4px;
      flex: 1;
    }
    .quick-input-title {
      padding: 3px 0px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .quick-input-right-action-bar {
      display: flex;
      margin-right: 4px;
      flex: 1;
    }
    .quick-input-right-action-bar > .actions-container {
      justify-content: flex-end;
    }
    .quick-input-titlebar .monaco-action-bar .action-label.codicon {
      background-position: center;
      background-repeat: no-repeat;
      padding: 2px;
    }
    .quick-input-description {
      margin: 6px;
    }
    .quick-input-header .quick-input-description {
      margin: 4px 2px;
    }
    .quick-input-header {
      display: flex;
      padding: 6px 6px 0px 6px;
      margin-bottom: -2px;
    }
    .quick-input-widget.hidden-input .quick-input-header {
      padding: 0;
      margin-bottom: 0;
    }
    .quick-input-and-message {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      min-width: 0;
      position: relative;
    }
    .quick-input-check-all {
      align-self: center;
      margin: 0;
    }
    .quick-input-filter {
      flex-grow: 1;
      display: flex;
      position: relative;
    }
    .quick-input-box {
      flex-grow: 1;
    }
    .quick-input-widget.show-checkboxes .quick-input-box,
    .quick-input-widget.show-checkboxes .quick-input-message {
      margin-left: 5px;
    }
    .quick-input-visible-count {
      position: absolute;
      left: -10000px;
    }
    .quick-input-count {
      align-self: center;
      position: absolute;
      right: 4px;
      display: flex;
      align-items: center;
    }
    .quick-input-count .monaco-count-badge {
      vertical-align: middle;
      padding: 2px 4px;
      border-radius: 2px;
      min-height: auto;
      line-height: normal;
    }
    .quick-input-action {
      margin-left: 6px;
    }
    .quick-input-action .monaco-text-button {
      font-size: 11px;
      padding: 0 6px;
      display: flex;
      height: 27.5px;
      align-items: center;
    }
    .quick-input-message {
      margin-top: -1px;
      padding: 5px;
      overflow-wrap: break-word;
    }
    .quick-input-message > .codicon {
      margin: 0 0.2em;
      vertical-align: text-bottom;
    }
    .quick-input-progress.monaco-progress-container {
      position: relative;
    }
    .quick-input-progress.monaco-progress-container,
    .quick-input-progress.monaco-progress-container .progress-bit {
      height: 2px;
    }
    .quick-input-list {
      line-height: 22px;
      margin-top: 6px;
    }
    .quick-input-widget.hidden-input .quick-input-list {
      margin-top: 0;
    }
    .quick-input-list .monaco-list {
      overflow: hidden;
      max-height: calc(20 * 22px);
    }
    .quick-input-list .quick-input-list-entry {
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      height: 100%;
      padding: 0 6px;
    }
    .quick-input-list .quick-input-list-entry.quick-input-list-separator-border {
      border-top-width: 1px;
      border-top-style: solid;
    }
    .quick-input-list .monaco-list-row[data-index="0"] .quick-input-list-entry.quick-input-list-separator-border {
      border-top-style: none;
    }
    .quick-input-list .quick-input-list-label {
      overflow: hidden;
      display: flex;
      height: 100%;
      flex: 1;
    }
    .quick-input-list .quick-input-list-checkbox {
      align-self: center;
      margin: 0;
    }
    .quick-input-list .quick-input-list-rows {
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      margin-left: 5px;
    }
    .quick-input-widget.show-checkboxes .quick-input-list .quick-input-list-rows {
      margin-left: 10px;
    }
    .quick-input-widget .quick-input-list .quick-input-list-checkbox {
      display: none;
    }
    .quick-input-widget.show-checkboxes .quick-input-list .quick-input-list-checkbox {
      display: inline;
    }
    .quick-input-list .quick-input-list-rows > .quick-input-list-row {
      display: flex;
      align-items: center;
    }
    .quick-input-list .quick-input-list-rows > .quick-input-list-row .monaco-icon-label,
    .quick-input-list .quick-input-list-rows > .quick-input-list-row .monaco-icon-label .monaco-icon-label-container > .monaco-icon-name-container {
      flex: 1;
    }
    .quick-input-list .quick-input-list-rows > .quick-input-list-row .codicon[class*=codicon-] {
      vertical-align: text-bottom;
    }
    .quick-input-list .quick-input-list-rows .monaco-highlighted-label span {
      opacity: 1;
    }
    .quick-input-list .quick-input-list-entry .quick-input-list-entry-keybinding {
      margin-right: 8px;
    }
    .quick-input-list .quick-input-list-label-meta {
      opacity: 0.7;
      line-height: normal;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .quick-input-list .monaco-highlighted-label .highlight {
      font-weight: bold;
    }
    .quick-input-list .quick-input-list-entry .quick-input-list-separator {
      margin-right: 8px;
    }
    .quick-input-list .quick-input-list-entry-action-bar {
      display: flex;
      flex: 0;
      overflow: visible;
    }
    .quick-input-list .quick-input-list-entry-action-bar .action-label {
      display: none;
    }
    .quick-input-list .quick-input-list-entry-action-bar .action-label.codicon {
      margin-right: 4px;
      padding: 0px 2px 2px 2px;
    }
    .quick-input-list .quick-input-list-entry-action-bar {
      margin-top: 1px;
    }
    .quick-input-list .quick-input-list-entry-action-bar {
      margin-right: 4px;
    }
    .quick-input-list .quick-input-list-entry .quick-input-list-entry-action-bar .action-label.always-visible,
    .quick-input-list .quick-input-list-entry:hover .quick-input-list-entry-action-bar .action-label,
    .quick-input-list .monaco-list-row.focused .quick-input-list-entry-action-bar .action-label {
      display: flex;
    }
    .quick-input-list .monaco-list-row.focused .monaco-keybinding-key,
    .quick-input-list .monaco-list-row.focused .quick-input-list-entry .quick-input-list-separator {
      color: inherit;
    }
    .quick-input-list .monaco-list-row.focused .monaco-keybinding-key {
      background: none;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/inputbox/inputBox.css */
    .monaco-inputbox {
      position: relative;
      display: block;
      padding: 0;
      box-sizing: border-box;
      font-size: inherit;
    }
    .monaco-inputbox.idle {
      border: 1px solid transparent;
    }
    .monaco-inputbox > .ibwrapper > .input,
    .monaco-inputbox > .ibwrapper > .mirror {
      padding: 4px;
    }
    .monaco-inputbox > .ibwrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .monaco-inputbox > .ibwrapper > .input {
      display: inline-block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      line-height: inherit;
      border: none;
      font-family: inherit;
      font-size: inherit;
      resize: none;
      color: inherit;
    }
    .monaco-inputbox > .ibwrapper > input {
      text-overflow: ellipsis;
    }
    .monaco-inputbox > .ibwrapper > textarea.input {
      display: block;
      -ms-overflow-style: none;
      scrollbar-width: none;
      outline: none;
    }
    .monaco-inputbox > .ibwrapper > textarea.input::-webkit-scrollbar {
      display: none;
    }
    .monaco-inputbox > .ibwrapper > textarea.input.empty {
      white-space: nowrap;
    }
    .monaco-inputbox > .ibwrapper > .mirror {
      position: absolute;
      display: inline-block;
      width: 100%;
      top: 0;
      left: 0;
      box-sizing: border-box;
      white-space: pre-wrap;
      visibility: hidden;
      word-wrap: break-word;
    }
    .monaco-inputbox-container {
      text-align: right;
    }
    .monaco-inputbox-container .monaco-inputbox-message {
      display: inline-block;
      overflow: hidden;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
      padding: 0.4em;
      font-size: 12px;
      line-height: 17px;
      margin-top: -1px;
      word-wrap: break-word;
    }
    .monaco-inputbox .monaco-action-bar {
      position: absolute;
      right: 2px;
      top: 4px;
    }
    .monaco-inputbox .monaco-action-bar .action-item {
      margin-left: 2px;
    }
    .monaco-inputbox .monaco-action-bar .action-item .codicon {
      background-repeat: no-repeat;
      width: 16px;
      height: 16px;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconlabel.css */
    .monaco-icon-label {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .monaco-icon-label::before {
      background-size: 16px;
      background-position: left center;
      background-repeat: no-repeat;
      padding-right: 6px;
      width: 16px;
      height: 22px;
      line-height: inherit !important;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      vertical-align: top;
      flex-shrink: 0;
    }
    .monaco-icon-label > .monaco-icon-label-container {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .monaco-icon-label > .monaco-icon-label-container > .monaco-icon-name-container > .label-name {
      color: inherit;
      white-space: pre;
    }
    .monaco-icon-label > .monaco-icon-label-container > .monaco-icon-name-container > .label-name > .label-separator {
      margin: 0 2px;
      opacity: 0.5;
    }
    .monaco-icon-label > .monaco-icon-label-container > .monaco-icon-description-container > .label-description {
      opacity: .7;
      margin-left: 0.5em;
      font-size: 0.9em;
      white-space: pre;
    }
    .monaco-icon-label.nowrap > .monaco-icon-label-container > .monaco-icon-description-container > .label-description {
      white-space: nowrap;
    }
    .vs .monaco-icon-label > .monaco-icon-label-container > .monaco-icon-description-container > .label-description {
      opacity: .95;
    }
    .monaco-icon-label.italic > .monaco-icon-label-container > .monaco-icon-name-container > .label-name,
    .monaco-icon-label.italic > .monaco-icon-label-container > .monaco-icon-description-container > .label-description {
      font-style: italic;
    }
    .monaco-icon-label.deprecated {
      text-decoration: line-through;
      opacity: 0.66;
    }
    .monaco-icon-label.italic::after {
      font-style: italic;
    }
    .monaco-icon-label.strikethrough > .monaco-icon-label-container > .monaco-icon-name-container > .label-name,
    .monaco-icon-label.strikethrough > .monaco-icon-label-container > .monaco-icon-description-container > .label-description {
      text-decoration: line-through;
    }
    .monaco-icon-label::after {
      opacity: 0.75;
      font-size: 90%;
      font-weight: 600;
      margin: auto 16px 0 5px;
      text-align: center;
    }
    .monaco-list:focus .selected .monaco-icon-label,
    .monaco-list:focus .selected .monaco-icon-label::after {
      color: inherit !important;
    }
    .monaco-list-row.focused.selected .label-description,
    .monaco-list-row.selected .label-description {
      opacity: .8;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/keybindingLabel/keybindingLabel.css */
    .monaco-keybinding {
      display: flex;
      align-items: center;
      line-height: 10px;
    }
    .monaco-keybinding > .monaco-keybinding-key {
      display: inline-block;
      border-style: solid;
      border-width: 1px;
      border-radius: 3px;
      vertical-align: middle;
      font-size: 11px;
      padding: 3px 5px;
      margin: 0 2px;
    }
    .monaco-keybinding > .monaco-keybinding-key:first-child {
      margin-left: 0;
    }
    .monaco-keybinding > .monaco-keybinding-key:last-child {
      margin-right: 0;
    }
    .monaco-keybinding > .monaco-keybinding-key-separator {
      display: inline-block;
    }
    .monaco-keybinding > .monaco-keybinding-key-chord-separator {
      width: 6px;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/list/list.css */
    .monaco-list {
      position: relative;
      height: 100%;
      width: 100%;
      white-space: nowrap;
    }
    .monaco-list.mouse-support {
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    .monaco-list > .monaco-scrollable-element {
      height: 100%;
    }
    .monaco-list-rows {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .monaco-list.horizontal-scrolling .monaco-list-rows {
      width: auto;
      min-width: 100%;
    }
    .monaco-list-row {
      position: absolute;
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
    }
    .monaco-list.mouse-support .monaco-list-row {
      cursor: pointer;
      touch-action: none;
    }
    .monaco-list-row.scrolling {
      display: none !important;
    }
    .monaco-list.element-focused,
    .monaco-list.selection-single,
    .monaco-list.selection-multiple {
      outline: 0 !important;
    }
    .monaco-drag-image {
      display: inline-block;
      padding: 1px 7px;
      border-radius: 10px;
      font-size: 12px;
      position: absolute;
      z-index: 1000;
    }
    .monaco-list-type-filter {
      display: flex;
      align-items: center;
      position: absolute;
      border-radius: 2px;
      padding: 0px 3px;
      max-width: calc(100% - 10px);
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: right;
      box-sizing: border-box;
      cursor: all-scroll;
      font-size: 13px;
      line-height: 18px;
      height: 20px;
      z-index: 1;
      top: 4px;
    }
    .monaco-list-type-filter.dragging {
      transition: top 0.2s, left 0.2s;
    }
    .monaco-list-type-filter.ne {
      right: 4px;
    }
    .monaco-list-type-filter.nw {
      left: 4px;
    }
    .monaco-list-type-filter > .controls {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      transition: width 0.2s;
      width: 0;
    }
    .monaco-list-type-filter.dragging > .controls,
    .monaco-list-type-filter:hover > .controls {
      width: 36px;
    }
    .monaco-list-type-filter > .controls > * {
      border: none;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: none;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .monaco-list-type-filter > .controls > .filter {
      margin-left: 4px;
    }
    .monaco-list-type-filter-message {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      padding: 40px 1em 1em 1em;
      text-align: center;
      white-space: normal;
      opacity: 0.7;
      pointer-events: none;
    }
    .monaco-list-type-filter-message:empty {
      display: none;
    }
    .monaco-list-type-filter {
      cursor: grab;
    }
    .monaco-list-type-filter.dragging {
      cursor: grabbing;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/splitview/splitview.css */
    .monaco-split-view2 {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .monaco-split-view2 > .sash-container {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .monaco-split-view2 > .sash-container > .monaco-sash {
      pointer-events: initial;
    }
    .monaco-split-view2 > .monaco-scrollable-element {
      width: 100%;
      height: 100%;
    }
    .monaco-split-view2 > .monaco-scrollable-element > .split-view-container {
      width: 100%;
      height: 100%;
      white-space: nowrap;
      position: relative;
    }
    .monaco-split-view2 > .monaco-scrollable-element > .split-view-container > .split-view-view {
      white-space: initial;
      position: absolute;
    }
    .monaco-split-view2 > .monaco-scrollable-element > .split-view-container > .split-view-view:not(.visible) {
      display: none;
    }
    .monaco-split-view2.vertical > .monaco-scrollable-element > .split-view-container > .split-view-view {
      width: 100%;
    }
    .monaco-split-view2.horizontal > .monaco-scrollable-element > .split-view-container > .split-view-view {
      height: 100%;
    }
    .monaco-split-view2.separator-border > .monaco-scrollable-element > .split-view-container > .split-view-view:not(:first-child)::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
      pointer-events: none;
      background-color: var(--separator-border);
    }
    .monaco-split-view2.separator-border.horizontal > .monaco-scrollable-element > .split-view-container > .split-view-view:not(:first-child)::before {
      height: 100%;
      width: 1px;
    }
    .monaco-split-view2.separator-border.vertical > .monaco-scrollable-element > .split-view-container > .split-view-view:not(:first-child)::before {
      height: 1px;
      width: 100%;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/table/table.css */
    .monaco-table {
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%;
      width: 100%;
      white-space: nowrap;
    }
    .monaco-table > .monaco-split-view2 {
      border-bottom: 1px solid transparent;
    }
    .monaco-table > .monaco-list {
      flex: 1;
    }
    .monaco-table-tr {
      display: flex;
      height: 100%;
    }
    .monaco-table-th {
      width: 100%;
      height: 100%;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .monaco-table-th,
    .monaco-table-td {
      box-sizing: border-box;
      flex-shrink: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .monaco-table > .monaco-split-view2 .monaco-sash.vertical::before {
      content: "";
      position: absolute;
      left: calc(var(--sash-size) / 2);
      width: 0;
      border-left: 1px solid transparent;
    }
    .monaco-table > .monaco-split-view2,
    .monaco-table > .monaco-split-view2 .monaco-sash.vertical::before {
      transition: border-color 0.2s ease-out;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/tree/media/tree.css */
    .monaco-tl-row {
      display: flex;
      height: 100%;
      align-items: center;
      position: relative;
    }
    .monaco-tl-indent {
      height: 100%;
      position: absolute;
      top: 0;
      left: 16px;
      pointer-events: none;
    }
    .hide-arrows .monaco-tl-indent {
      left: 12px;
    }
    .monaco-tl-indent > .indent-guide {
      display: inline-block;
      box-sizing: border-box;
      height: 100%;
      border-left: 1px solid transparent;
    }
    .monaco-tl-indent > .indent-guide {
      transition: border-color 0.1s linear;
    }
    .monaco-tl-twistie,
    .monaco-tl-contents {
      height: 100%;
    }
    .monaco-tl-twistie {
      font-size: 10px;
      text-align: right;
      padding-right: 6px;
      flex-shrink: 0;
      width: 16px;
      display: flex !important;
      align-items: center;
      justify-content: center;
      transform: translateX(3px);
    }
    .monaco-tl-contents {
      flex: 1;
      overflow: hidden;
    }
    .monaco-tl-twistie::before {
      border-radius: 20px;
    }
    .monaco-tl-twistie.collapsed::before {
      transform: rotate(-90deg);
    }
    .monaco-tl-twistie.codicon-tree-item-loading::before {
      animation: codicon-spin 1.25s steps(30) infinite;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/anchorSelect/browser/anchorSelect.css */
    .monaco-editor .selection-anchor {
      background-color: #007ACC;
      width: 2px !important;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/browser/bracketMatching.css */
    .monaco-editor .bracket-match {
      box-sizing: border-box;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/message/browser/messageController.css */
    .monaco-editor .monaco-editor-overlaymessage {
      padding-bottom: 8px;
      z-index: 10000;
    }
    .monaco-editor .monaco-editor-overlaymessage.below {
      padding-bottom: 0;
      padding-top: 8px;
      z-index: 10000;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .monaco-editor .monaco-editor-overlaymessage.fadeIn {
      animation: fadeIn 150ms ease-out;
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    .monaco-editor .monaco-editor-overlaymessage.fadeOut {
      animation: fadeOut 100ms ease-out;
    }
    .monaco-editor .monaco-editor-overlaymessage .message {
      padding: 1px 4px;
      color: var(--vscode-inputValidation-infoForeground);
      background-color: var(--vscode-inputValidation-infoBackground);
      border: 1px solid var(--vscode-inputValidation-infoBorder);
    }
    .monaco-editor.hc-black .monaco-editor-overlaymessage .message {
      border-width: 2px;
    }
    .monaco-editor .monaco-editor-overlaymessage .anchor {
      width: 0 !important;
      height: 0 !important;
      border-color: transparent;
      border-style: solid;
      z-index: 1000;
      border-width: 8px;
      position: absolute;
    }
    .monaco-editor .monaco-editor-overlaymessage .anchor.top {
      border-bottom-color: var(--vscode-inputValidation-infoBorder);
    }
    .monaco-editor .monaco-editor-overlaymessage .anchor.below {
      border-top-color: var(--vscode-inputValidation-infoBorder);
    }
    .monaco-editor .monaco-editor-overlaymessage:not(.below) .anchor.top,
    .monaco-editor .monaco-editor-overlaymessage.below .anchor.below {
      display: none;
    }
    .monaco-editor .monaco-editor-overlaymessage.below .anchor.top {
      display: inherit;
      top: -8px;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/codeAction/browser/lightBulbWidget.css */
    .monaco-editor .contentWidgets .codicon-light-bulb,
    .monaco-editor .contentWidgets .codicon-lightbulb-autofix {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .monaco-editor .contentWidgets .codicon-light-bulb:hover,
    .monaco-editor .contentWidgets .codicon-lightbulb-autofix:hover {
      cursor: pointer;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/codelens/browser/codelensWidget.css */
    .monaco-editor .codelens-decoration {
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--vscode-editorCodeLens-foreground);
    }
    .monaco-editor .codelens-decoration > span,
    .monaco-editor .codelens-decoration > a {
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      white-space: nowrap;
      vertical-align: sub;
    }
    .monaco-editor .codelens-decoration > a {
      text-decoration: none;
    }
    .monaco-editor .codelens-decoration > a:hover {
      cursor: pointer;
      color: var(--vscode-editorLink-activeForeground) !important;
    }
    .monaco-editor .codelens-decoration > a:hover .codicon {
      color: var(--vscode-editorLink-activeForeground) !important;
    }
    .monaco-editor .codelens-decoration .codicon {
      vertical-align: middle;
      color: currentColor !important;
      color: var(--vscode-editorCodeLens-foreground);
    }
    .monaco-editor .codelens-decoration > a:hover .codicon::before {
      cursor: pointer;
    }
    @keyframes fadein {
      0% {
        opacity: 0;
        visibility: visible;
      }
      100% {
        opacity: 1;
      }
    }
    .monaco-editor .codelens-decoration.fadein {
      animation: fadein 0.1s linear;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/colorPicker/browser/colorPicker.css */
    .colorpicker-widget {
      height: 190px;
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    .colorpicker-color-decoration {
      border: solid 0.1em #000;
      box-sizing: border-box;
      margin: 0.1em 0.2em 0 0.2em;
      width: 0.8em;
      height: 0.8em;
      line-height: 0.8em;
      display: inline-block;
      cursor: pointer;
    }
    .hc-black .colorpicker-color-decoration,
    .vs-dark .colorpicker-color-decoration {
      border: solid 0.1em #eee;
    }
    .colorpicker-header {
      display: flex;
      height: 24px;
      position: relative;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAHUlEQVQYV2PYvXu3JAi7uLiAMaYAjAGTQBPYLQkAa/0Zef3qRswAAAAASUVORK5CYII=);
      background-size: 9px 9px;
      image-rendering: pixelated;
    }
    .colorpicker-header .picked-color {
      width: 216px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 24px;
      cursor: pointer;
      color: white;
      flex: 1;
    }
    .colorpicker-header .picked-color .codicon {
      color: inherit;
      font-size: 14px;
      position: absolute;
      left: 8px;
    }
    .colorpicker-header .picked-color.light {
      color: black;
    }
    .colorpicker-header .original-color {
      width: 74px;
      z-index: inherit;
      cursor: pointer;
    }
    .colorpicker-body {
      display: flex;
      padding: 8px;
      position: relative;
    }
    .colorpicker-body .saturation-wrap {
      overflow: hidden;
      height: 150px;
      position: relative;
      min-width: 220px;
      flex: 1;
    }
    .colorpicker-body .saturation-box {
      height: 150px;
      position: absolute;
    }
    .colorpicker-body .saturation-selection {
      width: 9px;
      height: 9px;
      margin: -5px 0 0 -5px;
      border: 1px solid rgb(255, 255, 255);
      border-radius: 100%;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.8);
      position: absolute;
    }
    .colorpicker-body .strip {
      width: 25px;
      height: 150px;
    }
    .colorpicker-body .hue-strip {
      position: relative;
      margin-left: 8px;
      cursor: grab;
      background: linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
    }
    .colorpicker-body .opacity-strip {
      position: relative;
      margin-left: 8px;
      cursor: grab;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAHUlEQVQYV2PYvXu3JAi7uLiAMaYAjAGTQBPYLQkAa/0Zef3qRswAAAAASUVORK5CYII=);
      background-size: 9px 9px;
      image-rendering: pixelated;
    }
    .colorpicker-body .strip.grabbing {
      cursor: grabbing;
    }
    .colorpicker-body .slider {
      position: absolute;
      top: 0;
      left: -2px;
      width: calc(100% + 4px);
      height: 4px;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.71);
      box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.85);
    }
    .colorpicker-body .strip .overlay {
      height: 150px;
      pointer-events: none;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/gotoSymbol/browser/link/goToDefinitionAtPosition.css */
    .monaco-editor .goto-definition-link {
      text-decoration: underline;
      cursor: pointer;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/peekView/browser/media/peekViewWidget.css */
    .monaco-editor .peekview-widget .head {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
    }
    .monaco-editor .peekview-widget .head .peekview-title {
      display: flex;
      align-items: center;
      font-size: 13px;
      margin-left: 20px;
      min-width: 0;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .monaco-editor .peekview-widget .head .peekview-title.clickable {
      cursor: pointer;
    }
    .monaco-editor .peekview-widget .head .peekview-title .dirname:not(:empty) {
      font-size: 0.9em;
      margin-left: 0.5em;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .monaco-editor .peekview-widget .head .peekview-title .meta {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .monaco-editor .peekview-widget .head .peekview-title .dirname {
      white-space: nowrap;
    }
    .monaco-editor .peekview-widget .head .peekview-title .filename {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .monaco-editor .peekview-widget .head .peekview-title .meta:not(:empty)::before {
      content: "-";
      padding: 0 0.3em;
    }
    .monaco-editor .peekview-widget .head .peekview-actions {
      flex: 1;
      text-align: right;
      padding-right: 2px;
    }
    .monaco-editor .peekview-widget .head .peekview-actions > .monaco-action-bar {
      display: inline-block;
    }
    .monaco-editor .peekview-widget .head .peekview-actions > .monaco-action-bar,
    .monaco-editor .peekview-widget .head .peekview-actions > .monaco-action-bar > .actions-container {
      height: 100%;
    }
    .monaco-editor .peekview-widget > .body {
      border-top: 1px solid;
      position: relative;
    }
    .monaco-editor .peekview-widget .head .peekview-title .codicon {
      margin-right: 4px;
    }
    .monaco-editor .peekview-widget .monaco-list .monaco-list-row.focused .codicon {
      color: inherit !important;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/zoneWidget/browser/zoneWidget.css */
    .monaco-editor .zone-widget {
      position: absolute;
      z-index: 10;
    }
    .monaco-editor .zone-widget .zone-widget-container {
      border-top-style: solid;
      border-bottom-style: solid;
      border-top-width: 0;
      border-bottom-width: 0;
      position: relative;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/dropdown/dropdown.css */
    .monaco-dropdown {
      height: 100%;
      padding: 0;
    }
    .monaco-dropdown > .dropdown-label {
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .monaco-dropdown > .dropdown-label > .action-label.disabled {
      cursor: default;
    }
    .monaco-dropdown-with-primary {
      display: flex !important;
      flex-direction: row;
      border-radius: 5px;
    }
    .monaco-dropdown-with-primary > .action-container > .action-label {
      margin-right: 0;
    }
    .monaco-dropdown-with-primary > .dropdown-action-container > .monaco-dropdown > .dropdown-label .codicon[class*=codicon-] {
      font-size: 12px;
      padding-left: 0px;
      padding-right: 0px;
      line-height: 16px;
      margin-left: -3px;
    }
    .monaco-dropdown-with-primary > .dropdown-action-container > .monaco-dropdown > .dropdown-label > .action-label {
      display: block;
      background-size: 16px;
      background-position: center center;
      background-repeat: no-repeat;
    }
    
    /* node_modules/monaco-editor/esm/vs/platform/actions/browser/menuEntryActionViewItem.css */
    .monaco-action-bar .action-item.menu-entry .action-label.icon {
      width: 16px;
      height: 16px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 16px;
    }
    .monaco-action-bar .action-item.menu-entry .action-label {
      background-image: var(--menu-entry-icon-light);
    }
    .vs-dark .monaco-action-bar .action-item.menu-entry .action-label,
    .hc-black .monaco-action-bar .action-item.menu-entry .action-label {
      background-image: var(--menu-entry-icon-dark);
    }
    .monaco-dropdown-with-default {
      display: flex !important;
      flex-direction: row;
      border-radius: 5px;
    }
    .monaco-dropdown-with-default > .action-container > .action-label {
      margin-right: 0;
    }
    .monaco-dropdown-with-default > .action-container.menu-entry > .action-label.icon {
      width: 16px;
      height: 16px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 16px;
    }
    .monaco-dropdown-with-default > .action-container.menu-entry > .action-label {
      background-image: var(--menu-entry-icon-light);
    }
    .vs-dark .monaco-dropdown-with-default > .action-container.menu-entry > .action-label,
    .hc-black .monaco-dropdown-with-default > .action-container.menu-entry > .action-label {
      background-image: var(--menu-entry-icon-dark);
    }
    .monaco-dropdown-with-default > .dropdown-action-container > .monaco-dropdown > .dropdown-label .codicon[class*=codicon-] {
      font-size: 12px;
      padding-left: 0px;
      padding-right: 0px;
      line-height: 16px;
      margin-left: -3px;
    }
    .monaco-dropdown-with-default > .dropdown-action-container > .monaco-dropdown > .dropdown-label > .action-label {
      display: block;
      background-size: 16px;
      background-position: center center;
      background-repeat: no-repeat;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/gotoSymbol/browser/peek/referencesWidget.css */
    .monaco-editor .zone-widget .zone-widget-container.reference-zone-widget {
      border-top-width: 1px;
      border-bottom-width: 1px;
    }
    .monaco-editor .reference-zone-widget .inline {
      display: inline-block;
      vertical-align: top;
    }
    .monaco-editor .reference-zone-widget .messages {
      height: 100%;
      width: 100%;
      text-align: center;
      padding: 3em 0;
    }
    .monaco-editor .reference-zone-widget .ref-tree {
      line-height: 23px;
      background-color: var(--vscode-peekViewResult-background);
      color: var(--vscode-peekViewResult-lineForeground);
    }
    .monaco-editor .reference-zone-widget .ref-tree .reference {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .monaco-editor .reference-zone-widget .ref-tree .reference-file {
      display: inline-flex;
      width: 100%;
      height: 100%;
      color: var(--vscode-peekViewResult-fileForeground);
    }
    .monaco-editor .reference-zone-widget .ref-tree .monaco-list:focus .selected .reference-file {
      color: inherit !important;
    }
    .monaco-editor .reference-zone-widget .ref-tree .monaco-list:focus .monaco-list-rows > .monaco-list-row.selected:not(.highlighted) {
      background-color: var(--vscode-peekViewResult-selectionBackground);
      color: var(--vscode-peekViewResult-selectionForeground) !important;
    }
    .monaco-editor .reference-zone-widget .ref-tree .reference-file .count {
      margin-right: 12px;
      margin-left: auto;
    }
    .monaco-editor .reference-zone-widget .ref-tree .referenceMatch .highlight {
      background-color: var(--vscode-peekViewResult-matchHighlightBackground);
    }
    .monaco-editor .reference-zone-widget .preview .reference-decoration {
      background-color: var(--vscode-peekViewEditor-matchHighlightBackground);
      border: 2px solid var(--vscode-peekViewEditor-matchHighlightBorder);
      box-sizing: border-box;
    }
    .monaco-editor .reference-zone-widget .preview .monaco-editor .monaco-editor-background,
    .monaco-editor .reference-zone-widget .preview .monaco-editor .inputarea.ime-input {
      background-color: var(--vscode-peekViewEditor-background);
    }
    .monaco-editor .reference-zone-widget .preview .monaco-editor .margin {
      background-color: var(--vscode-peekViewEditorGutter-background);
    }
    .monaco-editor.hc-black .reference-zone-widget .ref-tree .reference-file {
      font-weight: bold;
    }
    .monaco-editor.hc-black .reference-zone-widget .ref-tree .referenceMatch .highlight {
      border: 1px dotted var(--vscode-contrastActiveBorder, transparent);
      box-sizing: border-box;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/hover/hover.css */
    .monaco-hover {
      cursor: default;
      position: absolute;
      overflow: hidden;
      z-index: 50;
      user-select: text;
      -webkit-user-select: text;
      -ms-user-select: text;
      box-sizing: initial;
      animation: fadein 100ms linear;
      line-height: 1.5em;
    }
    .monaco-hover.hidden {
      display: none;
    }
    .monaco-hover a:hover {
      cursor: pointer;
    }
    .monaco-hover .hover-contents:not(.html-hover-contents) {
      padding: 4px 8px;
    }
    .monaco-hover .markdown-hover > .hover-contents:not(.code-hover-contents) {
      max-width: 500px;
      word-wrap: break-word;
    }
    .monaco-hover .markdown-hover > .hover-contents:not(.code-hover-contents) hr {
      min-width: 100%;
    }
    .monaco-hover p,
    .monaco-hover .code,
    .monaco-hover ul {
      margin: 8px 0;
    }
    .monaco-hover code {
      font-family: var(--monaco-monospace-font);
    }
    .monaco-hover hr {
      box-sizing: border-box;
      border-left: 0px;
      border-right: 0px;
      margin-top: 4px;
      margin-bottom: -4px;
      margin-left: -8px;
      margin-right: -8px;
      height: 1px;
    }
    .monaco-hover p:first-child,
    .monaco-hover .code:first-child,
    .monaco-hover ul:first-child {
      margin-top: 0;
    }
    .monaco-hover p:last-child,
    .monaco-hover .code:last-child,
    .monaco-hover ul:last-child {
      margin-bottom: 0;
    }
    .monaco-hover ul {
      padding-left: 20px;
    }
    .monaco-hover ol {
      padding-left: 20px;
    }
    .monaco-hover li > p {
      margin-bottom: 0;
    }
    .monaco-hover li > ul {
      margin-top: 0;
    }
    .monaco-hover code {
      border-radius: 3px;
      padding: 0 0.4em;
    }
    .monaco-hover .monaco-tokenized-source {
      white-space: pre-wrap;
    }
    .monaco-hover .hover-row.status-bar {
      font-size: 12px;
      line-height: 22px;
    }
    .monaco-hover .hover-row.status-bar .actions {
      display: flex;
      padding: 0px 8px;
    }
    .monaco-hover .hover-row.status-bar .actions .action-container {
      margin-right: 16px;
      cursor: pointer;
    }
    .monaco-hover .hover-row.status-bar .actions .action-container .action .icon {
      padding-right: 4px;
    }
    .monaco-hover .markdown-hover .hover-contents .codicon {
      color: inherit;
      font-size: inherit;
      vertical-align: middle;
    }
    .monaco-hover .hover-contents a.code-link:hover,
    .monaco-hover .hover-contents a.code-link {
      color: inherit;
    }
    .monaco-hover .hover-contents a.code-link:before {
      content: "(";
    }
    .monaco-hover .hover-contents a.code-link:after {
      content: ")";
    }
    .monaco-hover .hover-contents a.code-link > span {
      text-decoration: underline;
      border-bottom: 1px solid transparent;
      text-underline-position: under;
    }
    .monaco-hover .markdown-hover .hover-contents:not(.code-hover-contents):not(.html-hover-contents) span {
      margin-bottom: 4px;
      display: inline-block;
    }
    .monaco-hover-content .action-container a {
      -webkit-user-select: none;
      user-select: none;
    }
    .monaco-hover-content .action-container.disabled {
      pointer-events: none;
      opacity: 0.4;
      cursor: default;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/checkbox/checkbox.css */
    .monaco-custom-checkbox {
      margin-left: 2px;
      float: left;
      cursor: pointer;
      overflow: hidden;
      width: 20px;
      height: 20px;
      border-radius: 3px;
      border: 1px solid transparent;
      padding: 1px;
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    .monaco-custom-checkbox:hover {
      background-color: var(--vscode-inputOption-hoverBackground);
    }
    .hc-black .monaco-custom-checkbox:hover {
      border: 1px dashed var(--vscode-focusBorder);
    }
    .hc-black .monaco-custom-checkbox {
      background: none;
    }
    .hc-black .monaco-custom-checkbox:hover {
      background: none;
    }
    .monaco-custom-checkbox.monaco-simple-checkbox {
      height: 18px;
      width: 18px;
      border: 1px solid transparent;
      border-radius: 3px;
      margin-right: 9px;
      margin-left: 0px;
      padding: 0px;
      opacity: 1;
      background-size: 16px !important;
    }
    .monaco-custom-checkbox.monaco-simple-checkbox:not(.checked)::before {
      visibility: hidden;
    }
    
    /* node_modules/monaco-editor/esm/vs/base/browser/ui/findinput/findInput.css */
    .monaco-findInput {
      position: relative;
    }
    .monaco-findInput .monaco-inputbox {
      font-size: 13px;
      width: 100%;
    }
    .monaco-findInput > .controls {
      position: absolute;
      top: 3px;
      right: 2px;
    }
    .vs .monaco-findInput.disabled {
      background-color: #E1E1E1;
    }
    .vs-dark .monaco-findInput.disabled {
      background-color: #333;
    }
    .monaco-findInput.highlight-0 .controls {
      animation: monaco-findInput-highlight-0 100ms linear 0s;
    }
    .monaco-findInput.highlight-1 .controls {
      animation: monaco-findInput-highlight-1 100ms linear 0s;
    }
    .hc-black .monaco-findInput.highlight-0 .controls,
    .vs-dark .monaco-findInput.highlight-0 .controls {
      animation: monaco-findInput-highlight-dark-0 100ms linear 0s;
    }
    .hc-black .monaco-findInput.highlight-1 .controls,
    .vs-dark .monaco-findInput.highlight-1 .controls {
      animation: monaco-findInput-highlight-dark-1 100ms linear 0s;
    }
    @keyframes monaco-findInput-highlight-0 {
      0% {
        background: rgba(253, 255, 0, 0.8);
      }
      100% {
        background: transparent;
      }
    }
    @keyframes monaco-findInput-highlight-1 {
      0% {
        background: rgba(253, 255, 0, 0.8);
      }
      99% {
        background: transparent;
      }
    }
    @keyframes monaco-findInput-highlight-dark-0 {
      0% {
        background: rgba(255, 255, 255, 0.44);
      }
      100% {
        background: transparent;
      }
    }
    @keyframes monaco-findInput-highlight-dark-1 {
      0% {
        background: rgba(255, 255, 255, 0.44);
      }
      99% {
        background: transparent;
      }
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/gotoError/browser/media/gotoErrorWidget.css */
    .monaco-editor .peekview-widget .head .peekview-title .severity-icon {
      display: inline-block;
      vertical-align: text-top;
      margin-right: 4px;
    }
    .monaco-editor .marker-widget {
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .monaco-editor .marker-widget > .stale {
      opacity: 0.6;
      font-style: italic;
    }
    .monaco-editor .marker-widget .title {
      display: inline-block;
      padding-right: 5px;
    }
    .monaco-editor .marker-widget .descriptioncontainer {
      position: absolute;
      white-space: pre;
      user-select: text;
      -webkit-user-select: text;
      -ms-user-select: text;
      padding: 8px 12px 0 20px;
    }
    .monaco-editor .marker-widget .descriptioncontainer .message {
      display: flex;
      flex-direction: column;
    }
    .monaco-editor .marker-widget .descriptioncontainer .message .details {
      padding-left: 6px;
    }
    .monaco-editor .marker-widget .descriptioncontainer .message .source,
    .monaco-editor .marker-widget .descriptioncontainer .message span.code {
      opacity: 0.6;
    }
    .monaco-editor .marker-widget .descriptioncontainer .message a.code-link {
      opacity: 0.6;
      color: inherit;
    }
    .monaco-editor .marker-widget .descriptioncontainer .message a.code-link:before {
      content: "(";
    }
    .monaco-editor .marker-widget .descriptioncontainer .message a.code-link:after {
      content: ")";
    }
    .monaco-editor .marker-widget .descriptioncontainer .message a.code-link > span {
      text-decoration: underline;
      border-bottom: 1px solid transparent;
      text-underline-position: under;
      color: var(--vscode-textLink-foreground);
    }
    .monaco-editor .marker-widget .descriptioncontainer .message a.code-link > span {
      color: var(--vscode-textLink-activeForeground);
    }
    .monaco-editor .marker-widget .descriptioncontainer .filename {
      cursor: pointer;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/dnd/browser/dnd.css */
    .monaco-editor.vs .dnd-target {
      border-right: 2px dotted black;
      color: white;
    }
    .monaco-editor.vs-dark .dnd-target {
      border-right: 2px dotted #AEAFAD;
      color: #51504f;
    }
    .monaco-editor.hc-black .dnd-target {
      border-right: 2px dotted #fff;
      color: #000;
    }
    .monaco-editor.mouse-default .view-lines,
    .monaco-editor.vs-dark.mac.mouse-default .view-lines,
    .monaco-editor.hc-black.mac.mouse-default .view-lines {
      cursor: default;
    }
    .monaco-editor.mouse-copy .view-lines,
    .monaco-editor.vs-dark.mac.mouse-copy .view-lines,
    .monaco-editor.hc-black.mac.mouse-copy .view-lines {
      cursor: copy;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/find/browser/findWidget.css */
    .monaco-editor .find-widget {
      position: absolute;
      z-index: 35;
      height: 33px;
      overflow: hidden;
      line-height: 19px;
      transition: transform 200ms linear;
      padding: 0 4px;
      box-sizing: border-box;
      transform: translateY(calc(-100% - 10px));
    }
    .monaco-editor .find-widget textarea {
      margin: 0px;
    }
    .monaco-editor .find-widget.hiddenEditor {
      display: none;
    }
    .monaco-editor .find-widget.replaceToggled > .replace-part {
      display: flex;
    }
    .monaco-editor .find-widget.visible {
      transform: translateY(0);
    }
    .monaco-editor .find-widget .monaco-inputbox.synthetic-focus {
      outline: 1px solid -webkit-focus-ring-color;
      outline-offset: -1px;
    }
    .monaco-editor .find-widget .monaco-inputbox .input {
      background-color: transparent;
      min-height: 0;
    }
    .monaco-editor .find-widget .monaco-findInput .input {
      font-size: 13px;
    }
    .monaco-editor .find-widget > .find-part,
    .monaco-editor .find-widget > .replace-part {
      margin: 4px 0 0 17px;
      font-size: 12px;
      display: flex;
    }
    .monaco-editor .find-widget > .find-part .monaco-inputbox,
    .monaco-editor .find-widget > .replace-part .monaco-inputbox {
      min-height: 25px;
    }
    .monaco-editor .find-widget > .replace-part .monaco-inputbox > .ibwrapper > .mirror {
      padding-right: 22px;
    }
    .monaco-editor .find-widget > .find-part .monaco-inputbox > .ibwrapper > .input,
    .monaco-editor .find-widget > .find-part .monaco-inputbox > .ibwrapper > .mirror,
    .monaco-editor .find-widget > .replace-part .monaco-inputbox > .ibwrapper > .input,
    .monaco-editor .find-widget > .replace-part .monaco-inputbox > .ibwrapper > .mirror {
      padding-top: 2px;
      padding-bottom: 2px;
    }
    .monaco-editor .find-widget > .find-part .find-actions {
      height: 25px;
      display: flex;
      align-items: center;
    }
    .monaco-editor .find-widget > .replace-part .replace-actions {
      height: 25px;
      display: flex;
      align-items: center;
    }
    .monaco-editor .find-widget .monaco-findInput {
      vertical-align: middle;
      display: flex;
      flex: 1;
    }
    .monaco-editor .find-widget .monaco-findInput .monaco-scrollable-element {
      width: 100%;
    }
    .monaco-editor .find-widget .monaco-findInput .monaco-scrollable-element .scrollbar.vertical {
      opacity: 0;
    }
    .monaco-editor .find-widget .matchesCount {
      display: flex;
      flex: initial;
      margin: 0 0 0 3px;
      padding: 2px 0 0 2px;
      height: 25px;
      vertical-align: middle;
      box-sizing: border-box;
      text-align: center;
      line-height: 23px;
    }
    .monaco-editor .find-widget .button {
      width: 16px;
      height: 16px;
      padding: 3px;
      border-radius: 5px;
      display: flex;
      flex: initial;
      margin-left: 3px;
      background-position: center center;
      background-repeat: no-repeat;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .monaco-editor .find-widget .codicon-find-selection {
      width: 22px;
      height: 22px;
      padding: 3px;
      border-radius: 5px;
    }
    .monaco-editor .find-widget .button.left {
      margin-left: 0;
      margin-right: 3px;
    }
    .monaco-editor .find-widget .button.wide {
      width: auto;
      padding: 1px 6px;
      top: -1px;
    }
    .monaco-editor .find-widget .button.toggle {
      position: absolute;
      top: 0;
      left: 3px;
      width: 18px;
      height: 100%;
      border-radius: 0;
      box-sizing: border-box;
    }
    .monaco-editor .find-widget .button.toggle.disabled {
      display: none;
    }
    .monaco-editor .find-widget .disabled {
      opacity: 0.3;
      cursor: default;
    }
    .monaco-editor .find-widget > .replace-part {
      display: none;
    }
    .monaco-editor .find-widget > .replace-part > .monaco-findInput {
      position: relative;
      display: flex;
      vertical-align: middle;
      flex: auto;
      flex-grow: 0;
      flex-shrink: 0;
    }
    .monaco-editor .find-widget > .replace-part > .monaco-findInput > .controls {
      position: absolute;
      top: 3px;
      right: 2px;
    }
    .monaco-editor .find-widget.reduced-find-widget .matchesCount {
      display: none;
    }
    .monaco-editor .find-widget.narrow-find-widget {
      max-width: 257px !important;
    }
    .monaco-editor .find-widget.collapsed-find-widget {
      max-width: 170px !important;
    }
    .monaco-editor .find-widget.collapsed-find-widget .button.previous,
    .monaco-editor .find-widget.collapsed-find-widget .button.next,
    .monaco-editor .find-widget.collapsed-find-widget .button.replace,
    .monaco-editor .find-widget.collapsed-find-widget .button.replace-all,
    .monaco-editor .find-widget.collapsed-find-widget > .find-part .monaco-findInput .controls {
      display: none;
    }
    .monaco-editor .findMatch {
      animation-duration: 0;
      animation-name: inherit !important;
    }
    .monaco-editor .find-widget .monaco-sash {
      left: 0 !important;
    }
    .monaco-editor.hc-black .find-widget .button:before {
      position: relative;
      top: 1px;
      left: 2px;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/folding/browser/folding.css */
    .monaco-editor .margin-view-overlays .codicon-folding-expanded,
    .monaco-editor .margin-view-overlays .codicon-folding-collapsed {
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.5s;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 140%;
      margin-left: 2px;
    }
    .monaco-editor .margin-view-overlays:hover .codicon,
    .monaco-editor .margin-view-overlays .codicon.codicon-folding-collapsed,
    .monaco-editor .margin-view-overlays .codicon.alwaysShowFoldIcons {
      opacity: 1;
    }
    .monaco-editor .inline-folded:after {
      color: grey;
      margin: 0.1em 0.2em 0 0.2em;
      content: "\u22ef";
      display: inline;
      line-height: 1em;
      cursor: pointer;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/snippet/browser/snippetSession.css */
    .monaco-editor .snippet-placeholder {
      min-width: 2px;
      outline-style: solid;
      outline-width: 1px;
      background-color: var(--vscode-editor-snippetTabstopHighlightBackground, transparent);
      outline-color: var(--vscode-editor-snippetTabstopHighlightBorder, transparent);
    }
    .monaco-editor .finish-snippet-placeholder {
      outline-style: solid;
      outline-width: 1px;
      background-color: var(--vscode-editor-snippetFinalTabstopHighlightBackground, transparent);
      outline-color: var(--vscode-editor-snippetFinalTabstopHighlightBorder, transparent);
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/suggest/browser/media/suggest.css */
    .monaco-editor .suggest-widget {
      width: 430px;
      z-index: 40;
      display: flex;
      flex-direction: column;
    }
    .monaco-editor .suggest-widget.message {
      flex-direction: row;
      align-items: center;
    }
    .monaco-editor .suggest-widget,
    .monaco-editor .suggest-details {
      flex: 0 1 auto;
      width: 100%;
      border-style: solid;
      border-width: 1px;
      border-color: var(--vscode-editorSuggestWidget-border);
      background-color: var(--vscode-editorSuggestWidget-background);
    }
    .monaco-editor.hc-black .suggest-widget,
    .monaco-editor.hc-black .suggest-details {
      border-width: 2px;
    }
    .monaco-editor .suggest-widget .suggest-status-bar {
      box-sizing: border-box;
      display: none;
      flex-flow: row nowrap;
      justify-content: space-between;
      width: 100%;
      font-size: 80%;
      padding: 0 4px 0 4px;
      border-top: 1px solid var(--vscode-editorSuggestWidget-border);
      overflow: hidden;
    }
    .monaco-editor .suggest-widget.with-status-bar .suggest-status-bar {
      display: flex;
    }
    .monaco-editor .suggest-widget .suggest-status-bar .left {
      padding-right: 8px;
    }
    .monaco-editor .suggest-widget.with-status-bar .suggest-status-bar .action-label {
      color: var(--vscode-editorSuggestWidgetStatus-foreground);
    }
    .monaco-editor .suggest-widget.with-status-bar .suggest-status-bar .action-item:not(:last-of-type) .action-label {
      margin-right: 0;
    }
    .monaco-editor .suggest-widget.with-status-bar .suggest-status-bar .action-item:not(:last-of-type) .action-label::after {
      content: ", ";
      margin-right: 0.3em;
    }
    .monaco-editor .suggest-widget.with-status-bar .monaco-list .monaco-list-row > .contents > .main > .right > .readMore,
    .monaco-editor .suggest-widget.with-status-bar .monaco-list .monaco-list-row.focused.string-label > .contents > .main > .right > .readMore {
      display: none;
    }
    .monaco-editor .suggest-widget.with-status-bar:not(.docs-side) .monaco-list .monaco-list-row:hover > .contents > .main > .right.can-expand-details > .details-label {
      width: 100%;
    }
    .monaco-editor .suggest-widget > .message {
      padding-left: 22px;
    }
    .monaco-editor .suggest-widget > .tree {
      height: 100%;
      width: 100%;
    }
    .monaco-editor .suggest-widget .monaco-list {
      user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row {
      display: flex;
      -mox-box-sizing: border-box;
      box-sizing: border-box;
      padding-right: 10px;
      background-repeat: no-repeat;
      background-position: 2px 2px;
      white-space: nowrap;
      cursor: pointer;
      touch-action: none;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused {
      color: var(--vscode-editorSuggestWidget-selectedForeground);
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused .codicon {
      color: var(--vscode-editorSuggestWidget-selectedIconForeground);
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents {
      flex: 1;
      height: 100%;
      overflow: hidden;
      padding-left: 2px;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main {
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre;
      justify-content: space-between;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left,
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right {
      display: flex;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row:not(.focused) > .contents > .main .monaco-icon-label {
      color: var(--vscode-editorSuggestWidget-foreground);
    }
    .monaco-editor .suggest-widget:not(.frozen) .monaco-highlighted-label .highlight {
      font-weight: bold;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main .monaco-highlighted-label .highlight {
      color: var(--vscode-editorSuggestWidget-highlightForeground);
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused > .contents > .main .monaco-highlighted-label .highlight {
      color: var(--vscode-editorSuggestWidget-focusHighlightForeground);
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .header > .codicon-close,
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .readMore::before {
      color: inherit;
      opacity: 1;
      font-size: 14px;
      cursor: pointer;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .header > .codicon-close {
      position: absolute;
      top: 6px;
      right: 2px;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .header > .codicon-close:hover,
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .readMore:hover {
      opacity: 1;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .details-label {
      opacity: 0.7;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left > .signature-label {
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 0.6;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left > .qualifier-label {
      margin-left: 12px;
      opacity: 0.4;
      font-size: 85%;
      line-height: initial;
      text-overflow: ellipsis;
      overflow: hidden;
      align-self: center;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .details-label {
      font-size: 85%;
      margin-left: 1.1em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .details-label > .monaco-tokenized-source {
      display: inline;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .details-label {
      display: none;
    }
    .monaco-editor .suggest-widget:not(.shows-details) .monaco-list .monaco-list-row.focused > .contents > .main > .right > .details-label {
      display: inline;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row:not(.string-label) > .contents > .main > .right > .details-label,
    .monaco-editor .suggest-widget.docs-side .monaco-list .monaco-list-row.focused:not(.string-label) > .contents > .main > .right > .details-label {
      display: inline;
    }
    .monaco-editor .suggest-widget:not(.docs-side) .monaco-list .monaco-list-row.focused:hover > .contents > .main > .right.can-expand-details > .details-label {
      width: calc(100% - 26px);
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left {
      flex-shrink: 1;
      flex-grow: 1;
      overflow: hidden;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left > .monaco-icon-label {
      flex-shrink: 0;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row:not(.string-label) > .contents > .main > .left > .monaco-icon-label {
      max-width: 100%;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row.string-label > .contents > .main > .left > .monaco-icon-label {
      flex-shrink: 1;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right {
      overflow: hidden;
      flex-shrink: 4;
      max-width: 70%;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .readMore {
      display: inline-block;
      position: absolute;
      right: 10px;
      width: 18px;
      height: 18px;
      visibility: hidden;
    }
    .monaco-editor .suggest-widget.docs-side .monaco-list .monaco-list-row > .contents > .main > .right > .readMore {
      display: none !important;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row.string-label > .contents > .main > .right > .readMore {
      display: none;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused.string-label > .contents > .main > .right > .readMore {
      display: inline-block;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused:hover > .contents > .main > .right > .readMore {
      visibility: visible;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row .monaco-icon-label.deprecated {
      opacity: 0.66;
      text-decoration: unset;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row .monaco-icon-label.deprecated > .monaco-icon-label-container > .monaco-icon-name-container {
      text-decoration: line-through;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row .monaco-icon-label::before {
      height: 100%;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row .icon {
      display: block;
      height: 16px;
      width: 16px;
      margin-left: 2px;
      background-repeat: no-repeat;
      background-size: 80%;
      background-position: center;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row .icon.hide {
      display: none;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row .suggest-icon {
      display: flex;
      align-items: center;
      margin-right: 4px;
    }
    .monaco-editor .suggest-widget.no-icons .monaco-list .monaco-list-row .icon,
    .monaco-editor .suggest-widget.no-icons .monaco-list .monaco-list-row .suggest-icon::before {
      display: none;
    }
    .monaco-editor .suggest-widget .monaco-list .monaco-list-row .icon.customcolor .colorspan {
      margin: 0 0 0 0.3em;
      border: 0.1em solid #000;
      width: 0.7em;
      height: 0.7em;
      display: inline-block;
    }
    .monaco-editor .suggest-details-container {
      z-index: 41;
    }
    .monaco-editor .suggest-details {
      display: flex;
      flex-direction: column;
      cursor: default;
      color: var(--vscode-editorSuggestWidget-foreground);
    }
    .monaco-editor .suggest-details.focused {
      border-color: var(--vscode-focusBorder);
    }
    .monaco-editor .suggest-details a {
      color: var(--vscode-textLink-foreground);
    }
    .monaco-editor .suggest-details a:hover {
      color: var(--vscode-textLink-activeForeground);
    }
    .monaco-editor .suggest-details code {
      background-color: var(--vscode-textCodeBlock-background);
    }
    .monaco-editor .suggest-details.no-docs {
      display: none;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element {
      flex: 1;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .header > .type {
      flex: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 0.7;
      white-space: pre;
      margin: 0 24px 0 0;
      padding: 4px 0 12px 5px;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .header > .type.auto-wrap {
      white-space: normal;
      word-break: break-all;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs {
      margin: 0;
      padding: 4px 5px;
      white-space: pre-wrap;
    }
    .monaco-editor .suggest-details.no-type > .monaco-scrollable-element > .body > .docs {
      margin-right: 24px;
      overflow: hidden;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs.markdown-docs {
      padding: 0;
      white-space: initial;
      min-height: calc(1rem + 8px);
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs.markdown-docs > div,
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs.markdown-docs > span:not(:empty) {
      padding: 4px 5px;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs.markdown-docs > div > p:first-child {
      margin-top: 0;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs.markdown-docs > div > p:last-child {
      margin-bottom: 0;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs.markdown-docs .monaco-tokenized-source {
      white-space: pre;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs .code {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > .docs.markdown-docs .codicon {
      vertical-align: sub;
    }
    .monaco-editor .suggest-details > .monaco-scrollable-element > .body > p:empty {
      display: none;
    }
    .monaco-editor .suggest-details code {
      border-radius: 3px;
      padding: 0 0.4em;
    }
    .monaco-editor .suggest-details ul {
      padding-left: 20px;
    }
    .monaco-editor .suggest-details ol {
      padding-left: 20px;
    }
    .monaco-editor .suggest-details p code {
      font-family: var(--monaco-monospace-font);
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/inlineCompletions/browser/ghostText.css */
    .monaco-editor .suggest-preview-additional-widget {
      white-space: nowrap;
    }
    .monaco-editor .suggest-preview-additional-widget .content-spacer {
      color: transparent;
      white-space: pre;
    }
    .monaco-editor .suggest-preview-additional-widget .button {
      display: inline-block;
      cursor: pointer;
      text-decoration: underline;
      text-underline-position: under;
    }
    .monaco-editor .ghost-text-hidden {
      opacity: 0;
      font-size: 0;
    }
    .monaco-editor .ghost-text-decoration {
      font-style: italic;
    }
    .monaco-editor .suggest-preview-text {
      font-style: italic;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/links/browser/links.css */
    .monaco-editor .detected-link,
    .monaco-editor .detected-link-active {
      text-decoration: underline;
      text-underline-position: under;
    }
    .monaco-editor .detected-link-active {
      cursor: pointer;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/browser/parameterHints.css */
    .monaco-editor .parameter-hints-widget {
      z-index: 39;
      display: flex;
      flex-direction: column;
      line-height: 1.5em;
    }
    .monaco-editor .parameter-hints-widget > .phwrapper {
      max-width: 440px;
      display: flex;
      flex-direction: row;
    }
    .monaco-editor .parameter-hints-widget.multiple {
      min-height: 3.3em;
      padding: 0;
    }
    .monaco-editor .parameter-hints-widget.visible {
      transition: left .05s ease-in-out;
    }
    .monaco-editor .parameter-hints-widget p,
    .monaco-editor .parameter-hints-widget ul {
      margin: 8px 0;
    }
    .monaco-editor .parameter-hints-widget .monaco-scrollable-element,
    .monaco-editor .parameter-hints-widget .body {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-height: 100%;
    }
    .monaco-editor .parameter-hints-widget .signature {
      padding: 4px 5px;
    }
    .monaco-editor .parameter-hints-widget .docs {
      padding: 0 10px 0 5px;
      white-space: pre-wrap;
    }
    .monaco-editor .parameter-hints-widget .docs.empty {
      display: none;
    }
    .monaco-editor .parameter-hints-widget .docs .markdown-docs {
      white-space: initial;
    }
    .monaco-editor .parameter-hints-widget .docs .markdown-docs code {
      font-family: var(--monaco-monospace-font);
    }
    .monaco-editor .parameter-hints-widget .docs .monaco-tokenized-source,
    .monaco-editor .parameter-hints-widget .docs .code {
      white-space: pre-wrap;
    }
    .monaco-editor .parameter-hints-widget .docs code {
      border-radius: 3px;
      padding: 0 0.4em;
    }
    .monaco-editor .parameter-hints-widget .controls {
      display: none;
      flex-direction: column;
      align-items: center;
      min-width: 22px;
      justify-content: flex-end;
    }
    .monaco-editor .parameter-hints-widget.multiple .controls {
      display: flex;
      padding: 0 2px;
    }
    .monaco-editor .parameter-hints-widget.multiple .button {
      width: 16px;
      height: 16px;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .monaco-editor .parameter-hints-widget .button.previous {
      bottom: 24px;
    }
    .monaco-editor .parameter-hints-widget .overloads {
      text-align: center;
      height: 12px;
      line-height: 12px;
      font-family: var(--monaco-monospace-font);
    }
    .monaco-editor .parameter-hints-widget .signature .parameter.active {
      font-weight: bold;
    }
    .monaco-editor .parameter-hints-widget .documentation-parameter > .parameter {
      font-weight: bold;
      margin-right: 0.5em;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/rename/browser/renameInputField.css */
    .monaco-editor .rename-box {
      z-index: 100;
      color: inherit;
    }
    .monaco-editor .rename-box.preview {
      padding: 3px 3px 0 3px;
    }
    .monaco-editor .rename-box .rename-input {
      padding: 3px;
      width: calc(100% - 6px);
    }
    .monaco-editor .rename-box .rename-label {
      display: none;
      opacity: .8;
    }
    .monaco-editor .rename-box.preview .rename-label {
      display: inherit;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/unicodeHighlighter/browser/unicodeHighlighter.css */
    .monaco-editor .unicode-highlight {
      border: 1px solid var(--vscode-editorUnicodeHighlight-border);
      box-sizing: border-box;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/contrib/unicodeHighlighter/browser/bannerController.css */
    .editor-banner {
      box-sizing: border-box;
      cursor: default;
      width: 100%;
      font-size: 12px;
      display: flex;
      overflow: visible;
      height: 26px;
      background: var(--vscode-banner-background);
    }
    .editor-banner .icon-container {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      padding: 0 6px 0 10px;
    }
    .editor-banner .icon-container.custom-icon {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 16px;
      width: 16px;
      padding: 0;
      margin: 0 6px 0 10px;
    }
    .editor-banner .message-container {
      display: flex;
      align-items: center;
      line-height: 26px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .editor-banner .message-container p {
      margin-block-start: 0;
      margin-block-end: 0;
    }
    .editor-banner .message-actions-container {
      flex-grow: 1;
      flex-shrink: 0;
      line-height: 26px;
      margin: 0 4px;
    }
    .editor-banner .message-actions-container a.monaco-button {
      width: inherit;
      margin: 2px 8px;
      padding: 0px 12px;
    }
    .editor-banner .message-actions-container a {
      padding: 3px;
      margin-left: 12px;
      text-decoration: underline;
    }
    .editor-banner .action-container {
      padding: 0 10px 0 6px;
    }
    .editor-banner {
      background-color: var(--vscode-banner-background);
    }
    .editor-banner,
    .editor-banner .action-container .codicon,
    .editor-banner .message-actions-container .monaco-link {
      color: var(--vscode-banner-foreground);
    }
    .editor-banner .icon-container .codicon {
      color: var(--vscode-banner-iconForeground);
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.css */
    .monaco-editor .accessibilityHelpWidget {
      padding: 10px;
      vertical-align: middle;
      overflow: scroll;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.css */
    .monaco-editor .iPadShowKeyboard {
      width: 58px;
      min-width: 0;
      height: 36px;
      min-height: 0;
      margin: 0;
      padding: 0;
      position: absolute;
      resize: none;
      overflow: hidden;
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjNDI0MjQyIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==) center center no-repeat;
      border: 4px solid #F6F6F6;
      border-radius: 4px;
    }
    .monaco-editor.vs-dark .iPadShowKeyboard {
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1MyAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDguMDM2NCA0LjAxMDQySDQuMDA3NzlMNC4wMDc3OSAzMi4wMjg2SDQ4LjAzNjRWNC4wMTA0MlpNNC4wMDc3OSAwLjAwNzgxMjVDMS43OTcyMSAwLjAwNzgxMjUgMC4wMDUxODc5OSAxLjc5OTg0IDAuMDA1MTg3OTkgNC4wMTA0MlYzMi4wMjg2QzAuMDA1MTg3OTkgMzQuMjM5MiAxLjc5NzIxIDM2LjAzMTIgNC4wMDc3OSAzNi4wMzEySDQ4LjAzNjRDNTAuMjQ3IDM2LjAzMTIgNTIuMDM5IDM0LjIzOTIgNTIuMDM5IDMyLjAyODZWNC4wMTA0MkM1Mi4wMzkgMS43OTk4NCA1MC4yNDcgMC4wMDc4MTI1IDQ4LjAzNjQgMC4wMDc4MTI1SDQuMDA3NzlaTTguMDEwNDIgOC4wMTMwMkgxMi4wMTNWMTIuMDE1Nkg4LjAxMDQyVjguMDEzMDJaTTIwLjAxODIgOC4wMTMwMkgxNi4wMTU2VjEyLjAxNTZIMjAuMDE4MlY4LjAxMzAyWk0yNC4wMjA4IDguMDEzMDJIMjguMDIzNFYxMi4wMTU2SDI0LjAyMDhWOC4wMTMwMlpNMzYuMDI4NiA4LjAxMzAySDMyLjAyNlYxMi4wMTU2SDM2LjAyODZWOC4wMTMwMlpNNDAuMDMxMiA4LjAxMzAySDQ0LjAzMzlWMTIuMDE1Nkg0MC4wMzEyVjguMDEzMDJaTTE2LjAxNTYgMTYuMDE4Mkg4LjAxMDQyVjIwLjAyMDhIMTYuMDE1NlYxNi4wMTgyWk0yMC4wMTgyIDE2LjAxODJIMjQuMDIwOFYyMC4wMjA4SDIwLjAxODJWMTYuMDE4MlpNMzIuMDI2IDE2LjAxODJIMjguMDIzNFYyMC4wMjA4SDMyLjAyNlYxNi4wMTgyWk00NC4wMzM5IDE2LjAxODJWMjAuMDIwOEgzNi4wMjg2VjE2LjAxODJINDQuMDMzOVpNMTIuMDEzIDI0LjAyMzRIOC4wMTA0MlYyOC4wMjZIMTIuMDEzVjI0LjAyMzRaTTE2LjAxNTYgMjQuMDIzNEgzNi4wMjg2VjI4LjAyNkgxNi4wMTU2VjI0LjAyMzRaTTQ0LjAzMzkgMjQuMDIzNEg0MC4wMzEyVjI4LjAyNkg0NC4wMzM5VjI0LjAyMzRaIiBmaWxsPSIjQzVDNUM1Ii8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNTMiIGhlaWdodD0iMzYiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==) center center no-repeat;
      border: 4px solid #252526;
    }
    
    /* node_modules/monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.css */
    .monaco-editor .tokens-inspect-widget {
      z-index: 50;
      user-select: text;
      -webkit-user-select: text;
      -ms-user-select: text;
      padding: 10px;
    }
    .tokens-inspect-separator {
      height: 1px;
      border: 0;
    }
    .monaco-editor .tokens-inspect-widget .tm-token {
      font-family: var(--monaco-monospace-font);
    }
    .monaco-editor .tokens-inspect-widget .tm-token-length {
      font-weight: normal;
      font-size: 60%;
      float: right;
    }
    .monaco-editor .tokens-inspect-widget .tm-metadata-table {
      width: 100%;
    }
    .monaco-editor .tokens-inspect-widget .tm-metadata-value {
      font-family: var(--monaco-monospace-font);
      text-align: right;
    }
    .monaco-editor .tokens-inspect-widget .tm-token-type {
      font-family: var(--monaco-monospace-font);
    }

    `;
  }
    
    static get properties() {
      return {
        value: {
          type: String,
          reflect: true,
        },
      };
    }

    div = document.createElement('div')
    monaco: any; 
    value: CodeEditorProps['value']
    onInput: CodeEditorProps['onInput']
    onSave: CodeEditorProps['onSave']
    onReset: CodeEditorProps['onReset']
    onClose: CodeEditorProps['onClose']

    textArea: HTMLTextAreaElement = document.createElement('textarea')


    constructor(props: CodeEditorProps = {}) {
      super();

      this.div.id = 'editorContainer'
      this.value = props.value ?? ''
      if (props.onInput) this.onInput = props.onInput
      if (props.onSave) this.onSave = props.onSave
      if (props.onReset) this.onReset = props.onReset
      if (props.onClose) this.onClose = props.onClose


    }
    
    willUpdate(changedProps:any) {

    }

    updated = () => {

        // Create new model
        if (!this.monaco) {
          this.monaco = monaco.editor.create(this.div, {
            language: 'javascript',
            automaticLayout: true   
          });
        }

        const model = this.monaco.getModel()
        model.setValue(this.value)
        model.onDidChangeContent((ev) => {
          if (this.onInput instanceof Function) this.onInput(model.getValue())
        })
    }
  
    render() {
      return this.div
    }
  }
  
  customElements.get('visualscript-code-editor') || customElements.define('visualscript-code-editor',  CodeEditor);