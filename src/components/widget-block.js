import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'; //importing LitElement,html,css which is shared across all the components

class WidgetBlock extends LitElement { //creating the class
  static properties = { //setting the properties of the header and declaring it as a string type in order to contain words
    header: { type: String },
  }
  //styling it using css
  static styles = css`
    :host {
      display: block;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    h2 {
      margin-top: 0;
      color: #1a2b42;
    }
  `;

  constructor() { //constructor value for the widget block
    super();
    this.header = 'Loading...';
  }

  render() {  //using render in order to show the header
    return html`
      <h2>${this.header}</h2>
      <slot></slot>
    `;
  }
}

customElements.define('widget-block', WidgetBlock); //define the custom element for the type of widget block