// Done By Samer Almasri
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'; //importing LitElement,html,css which is shared across all the components

class FactWidget extends LitElement {  //creating the class
  //styling it using css
  static styles= css` 
        :host {  
          display: block;
          width: 244px;
          height: 250px;
          background-color: #8adced;
          margin-bottom: 15px;
          border-radius: 10px;
          border: 3px solid white;
          margin-top: 15px;
          margin-left: 1em;
        }
        p { //paragraph alteration
          font-size: 15px;
          font-weight: bold;
          margin-top: 10px;
          padding-right:5px;
          padding-left:5px;
        }
        h1{
          font-size: 23px;
        }
      `
  static get properties() { //declaring all fact properties as a string type
    return {
      fact: { type: String },
    };
  }

  constructor() { //constructor value for the widget
    super();
    this.fact = '';
  }

  connectedCallback() { //creates a callback in order to get the current date using the apiurl
    super.connectedCallback();
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const apiUrl = `http://numbersapi.com/${month}/${day}/date?json`;

    fetch(apiUrl) //fetching the api url then getting the information
      .then(response => response.json())
      .then(data => {
        this.fact = data.text;
      })
  }

  render() { //using render in order to show the fact on the body as a paragraph
    return html`
      <h1>Random Fact</h1>
      <p>${this.fact}</p>
    `;
  }
}
customElements.define('fact-widget', FactWidget); //define the custom element for the type of fact widget
