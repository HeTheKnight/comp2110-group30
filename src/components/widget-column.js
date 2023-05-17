import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'; //importing LitElement,html,css which is shared across all the components

class WidgetColumn extends LitElement { //creating the class
  static properties = { //setting the properties of the header and declaring it as a string type in order to contain words
    header: { type: String },
  }
// not much of stylig to do in css as this is mainly used to split the widgets apart
  static styles = css`

  `;

  constructor() { //constructor value for the widget column creating a header called Widgets
    super();
    this.header = 'Widgets';
  }

  render() { //using render in order to show the header
    return html`
      <div>
        <h2>${this.header}</h2>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('widget-column', WidgetColumn); //define the custom element for the type of widget column